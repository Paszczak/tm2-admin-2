// Node libs
import { gql, useQuery } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { Card } from '../components/layout/card';
import { FeaturedList } from '../components/layout/featured-list';
import { Header } from '../components/layout/header';
import { useNavigateWithSlug } from '../hooks/useNavigateWithSlug';
import { createSlug } from '../libs/helpers';
import { ClassType } from '../models/class';

// Query
export const GET_CLASSES = gql`
  query GetCurrentClasses($current: Boolean) {
    getYears(current: $current) {
      classes {
        id
        name
      }
    }
  }
`;

// Data is the main '/school' route rendering component
export default function School(): JSX.Element {
  const { loading, error, data } = useQuery(GET_CLASSES, {
    variables: {
      current: true,
    },
  });

  const navigateWithSlug = useNavigateWithSlug();

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
        {/* <Button
          label='Dodaj nową wiadomość na stronę'
          onClick={() => navigate('/news/create')}
          light
        /> */}
        <div>Błąd pobierania danych! Skontaktuj się z administratorem.</div>
      </>
    );

  return (
    <>
      <Header>Materiały</Header>
      {data ? (
        <FeaturedList
          items={data.getYears[0].classes ?? []}
          render={(item: ClassType) => (
            <Card key={item.id} id={item.id} slug={createSlug(item.name)}>
              <div data-id={item.id} data-slug={createSlug(item.name)}>
                {item.name}
              </div>
            </Card>
          )}
          onElementClick={(id: string | null, slug?: string | null) =>
            navigateWithSlug(id, slug ? slug : '')
          }
          columns={3}
        />
      ) : (
        <div>Brak klas :(</div>
      )}
      <Outlet />
    </>
  );
}
