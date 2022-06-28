// Node libs

// Components
import { Header } from '../components/layout/header';
import { SchoolClasses } from '../components/settings/school-classes';
import { SchoolYears } from '../components/settings/school-years';

// Data is the main '/settings' route rendering component
export default function Settings(): JSX.Element {
  return (
    <>
      <Header>Ustawienia</Header>
      <SchoolYears />
      <SchoolClasses />
    </>
  );
}
