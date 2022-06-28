// Node libs
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

// Components
import { Header } from '../components/layout/header';
import { EditNewsForm } from '../components/news/edit-news-form';

// Types
type LocationStateType = {
  id: string;
};

// Query
export const GET_NEWS_DETAILS = gql`
  query GetNewsDetails($newsId: String) {
    getNewsDetails(id: $newsId) {
      id
      title
      lead
      body
      publish
      created
    }
  }
`;

// NewsDetails is the main '/news/:newsSlug' route rendering component
export default function NewsDetails(): JSX.Element {
  const location = useLocation();
  const state = location.state as LocationStateType;

  const { loading, error, data } = useQuery(GET_NEWS_DETAILS, {
    variables: { newsId: state.id },
  });

  if (loading)
    return (
      <>
        <Header shouldReturn>Wiadomość</Header>
        <div>Loading...</div>
      </>
    );

  if (error)
    return (
      <>
        <Header shouldReturn>Wiadomość</Header>
        <div>Błąd pobierania danych! Skontaktuj się z administratorem.</div>
      </>
    );

  return (
    <>
      <Header shouldReturn>{data && data.getNewsDetails.title}</Header>
      <EditNewsForm data={data.getNewsDetails} />
    </>
  );
}
