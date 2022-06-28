// Components
import { ReactComponent as PublicIcon } from '../../assets/visibile.svg';

// Styles
import classes from './news-item.module.scss';

// NewsItemProps
type NewsItemProps = {
  id: string;
  title: string;
  slug: string;
  lead: string;
  body: string;
  publish: boolean;
  created: string;
};

export function NewsItem({
  id,
  title,
  slug,
  lead,
  publish,
  created,
}: NewsItemProps): JSX.Element {
  return (
    <article className={classes.news} data-id={id} data-slug={slug}>
      <h3 className={classes.newsTitle} data-id={id} data-slug={slug}>
        {title}
      </h3>
      <div
        className={publish ? classes.public : classes.private}
        data-id={id}
        data-slug={slug}>
        <PublicIcon data-id={id} data-slug={slug} />
      </div>
      <p role='paragraph' data-id={id} data-slug={slug}>
        {lead}
      </p>
      <div
        className={classes.newsFooter}
        role='contentinfo'
        data-id={id}
        data-slug={slug}>
        Utworzone:{' '}
        <time
          dateTime={new Date(+created).toISOString()}
          role='time'
          data-id={id}
          data-slug={slug}>
          {new Date(+created).toLocaleString('pl', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </time>
      </div>
    </article>
  );
}
