import { gql, useQuery } from '@apollo/client';
import { time } from 'console';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigateWithSlug } from '../../hooks/useNavigateWithSlug';
import { createSlug } from '../../libs/helpers';
import { ClassContentType } from '../../models/class';
import { Card } from '../layout/card';
import { FeaturedList } from '../layout/featured-list';

// Types
type LocationStateType = {
  id: string;
};

// Query
export const GET_CLASS_DATA = gql`
  query GetClassData($id: String) {
    getClassData(id: $id) {
      content {
        id
        title
        body
        files
        created
      }
    }
  }
`;

export function ClassContent(): JSX.Element {
  const params = useParams();
  const location = useLocation();
  const state = location.state as LocationStateType;
  const navigateWithSlug = useNavigateWithSlug();

  const { loading, error, data } = useQuery(GET_CLASS_DATA, {
    variables: {
      id: state.id,
    },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return data.getClassData.content.length > 0 ? (
    <FeaturedList
      items={data.getClassData.content}
      render={(item: ClassContentType) => (
        <Card key={item.id} id={item.id} slug={createSlug(item.title)}>
          {item.title}
        </Card>
      )}
      onElementClick={(id: string | null, slug?: string | null) =>
        navigateWithSlug(id, slug ? slug : '')
      }
    />
  ) : (
    <div>Brak materiałów dla tej klasy</div>
  );
}
