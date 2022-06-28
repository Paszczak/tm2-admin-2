// Libs
import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// Hooks
import { useNavigateWithSlug } from '../hooks/useNavigateWithSlug';
import { useNavigate } from 'react-router-dom';

// Components
import { Header } from '../components/layout/header';
import { FeaturedList } from '../components/layout/featured-list';

// Types
import { NewsType } from '../models/news';
import { Card } from '../components/layout/card';
import { NewsItem } from '../components/news/news-item';
import { Button } from '../components/forms/button';

// Styles
import classes from '../styles/_pages.module.scss';
import { createSlug } from '../libs/helpers';

// Query
export const GET_NEWS = gql`
  query GetNews($published: Boolean, $order: Sort) {
    getNews(published: $published, order: $order) {
      id
      title
      lead
      publish
      created
    }
  }
`;

// Data is the main '/news' route rendering component
export default function News(): JSX.Element {
  const [published, publishedSet] = useState<boolean>(false);

  const navigate = useNavigate();
  const navigateWithSlug = useNavigateWithSlug();

  const { loading, error, data, refetch } = useQuery(GET_NEWS, {
    variables: {
      published: published,
      order: 'DESC',
    },
  });

  useEffect(() => {
    refetch({
      published: published,
      order: 'DESC',
    });
  }, [published, refetch]);

  if (loading)
    return (
      <>
        <Header>Wiadomości</Header>
        <div>Loading...</div>
      </>
    );

  if (error)
    return (
      <>
        <Header>Wiadomości</Header>
        <Button
          label='Dodaj nową wiadomość na stronę'
          onClick={() => navigate('/news/create')}
          light
        />
        <div>Błąd pobierania danych! Skontaktuj się z administratorem.</div>
      </>
    );

  return (
    <>
      <Header>Wiadomości</Header>
      <div className={classes.buttonsGroup}>
        <Button
          label={
            published ? 'Pokaż wszystkie' : 'Pokaż tylko aktualnie publikowane'
          }
          onClick={() => publishedSet(!published)}
          light
        />
        <Button
          label='Dodaj nową wiadomość na stronę'
          onClick={() => navigate('/news/create')}
          light
        />
      </div>

      {data ? (
        <FeaturedList
          items={data.getNews ?? []}
          render={(item: NewsType) => (
            <Card key={item.id} id={item.id} slug={createSlug(item.title)}>
              <NewsItem {...item} slug={createSlug(item.title)} />
            </Card>
          )}
          onElementClick={(id: string | null, slug?: string | null) =>
            navigateWithSlug(id, slug ? slug : '')
          }
        />
      ) : (
        'Nie ma żadnych wiadomości'
      )}
    </>
  );
}
