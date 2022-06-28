// Libs
import { gql, useQuery } from '@apollo/client';
import { CreateSchoolYear } from './create-school-year';

// Components
import { SchoolYearsList } from './school-years-list';

export const GET_YEARS = gql`
  query GetYears {
    getYears {
      id
      name
      current
    }
  }
`;

export function SchoolYears(): JSX.Element {
  const { loading, error, data } = useQuery(GET_YEARS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Coś poszło nie tak :(</div>;

  return (
    <>
      <SchoolYearsList data={data.getYears ?? []} />
      <CreateSchoolYear />
    </>
  );
}
