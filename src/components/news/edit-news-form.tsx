// Node libs
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// Libs
import { onInputChangeHandler } from '../../libs/forms';

// Models
import { FormFieldType } from '../../models/forms';
import { NewsType } from '../../models/news';

// Components
import { Button } from '../forms/button';
import { FormField } from '../forms/form-field';
import { Modal } from '../layout/modal';
import { Backdrop } from '../layout/backdrop';

// Hooks
import { useAuth } from '../../hooks/use-auth';

// Styles
import classes from '../../styles/_pages.module.scss';
import { useMountTransitions } from '../../hooks/useMountTransitions';
import { DEFAULT_ANIMATION_TIMEOUT } from '../../libs/constants';

// NewsForm props definition
type NewsFormProps = {
  data: NewsType;
};

// Form types definitions
type NewsFormControlsType = {
  title: FormFieldType;
  lead: FormFieldType;
  body: FormFieldType;
  publish: FormFieldType;
};

// Mutations
export const UPDATE_NEWS = gql`
  mutation UpdateNews($id: ID!, $news: NewsInput, $token: String) {
    updateNews(id: $id, news: $news, token: $token) {
      code
      success
      message
      news {
        id
        title
        lead
        body
        created
        publish
      }
    }
  }
`;

export function EditNewsForm({
  data: { id, title, lead, body, publish },
}: NewsFormProps): JSX.Element {
  const [form, formSet] = useState<{
    controls: NewsFormControlsType;
    isFormTouched?: boolean;
  }>({
    controls: {
      title: {
        label: 'Tytuł',
        value: title,
        htmlProps: {
          type: 'text',
        },
        validation: { type: 'minLength', value: 3 },
        errorMessage: 'Tytuł musi zawierać co najmniej 3 znaki',
        touched: false,
      },
      lead: {
        label: 'Lead',
        value: lead,
        element: 'textarea',
        htmlProps: {
          type: 'text',
          // rows: 2,
        },
        validation: { type: 'minLength', value: 1 },
        errorMessage: 'Treść musi być niepusta',
        touched: false,
      },
      body: {
        label: 'Treść wiadomości',
        value: body,
        element: 'rich-textarea',
        htmlProps: {
          type: 'text',
          // rows: 5,
        },
        validation: { type: 'minLength', value: 1 },
        errorMessage: 'Treść musi być niepusta',
        touched: false,
      },
      publish: {
        label: 'Publikuj',
        value: '',
        htmlProps: {
          type: 'checkbox',
          checked: publish,
        },
        errorMessage: '',
        touched: false,
      },
    },
    isFormTouched: false,
  });
  const [preview, previewSet] = useState<boolean>(false);
  const hasTransitionedIn = useMountTransitions(
    preview,
    DEFAULT_ANIMATION_TIMEOUT
  );

  const { user } = useAuth();
  const navigate = useNavigate();

  // Mutations
  const [updateNews] = useMutation(UPDATE_NEWS);

  const onPreviewHandler = () => {
    previewSet(true);
  };

  const onSubmitFormHandler = async () => {
    const vars = {
      id,
      news: {
        title: form.controls.title.value,
        body: form.controls.body.value,
        publish: form.controls.publish.htmlProps?.checked
          ? form.controls.publish.htmlProps?.checked
          : false,
      },
      token: user?.token,
    };

    updateNews({
      variables: vars,
      onCompleted: (_) => {
        navigate('/news');
      },
    });
  };

  return (
    <>
      <form>
        {Object.keys(form.controls).map((key) => (
          <FormField
            key={key}
            id={key}
            label={form.controls[key as keyof NewsFormControlsType].label}
            value={form.controls[key as keyof NewsFormControlsType].value}
            element={form.controls[key as keyof NewsFormControlsType].element}
            htmlProps={
              form.controls[key as keyof NewsFormControlsType].htmlProps
            }
            onChange={(value: string, checked?: boolean) =>
              onInputChangeHandler<NewsFormControlsType>(
                key,
                value,
                form.controls,
                formSet,
                checked
              )
            }
            validation={
              form.controls[key as keyof NewsFormControlsType].validation
            }
            errorMessage={
              form.controls[key as keyof NewsFormControlsType].errorMessage
            }
            touched={form.controls[key as keyof NewsFormControlsType].touched}
          />
        ))}
      </form>
      <div className={classes.buttonsGroup}>
        <Button label='Podgląd' onClick={onPreviewHandler} />
        <Button
          label='Zapisz'
          onClick={onSubmitFormHandler}
          disabled={!form.isFormTouched}
        />
      </div>
      {(hasTransitionedIn || preview) && (
        <Backdrop onClick={() => previewSet(false)} />
      )}
      {(hasTransitionedIn || preview) && (
        <Modal
          title={form.controls.title.value}
          onClose={() => previewSet(false)}
          mounted={preview}>
          <ReactMarkdown>{form.controls.body.value}</ReactMarkdown>
        </Modal>
      )}
    </>
  );
}
