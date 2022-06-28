import { Header } from '../components/layout/header';
import { NewNewsForm } from '../components/news/new-news-form';

export default function CreateNews(): JSX.Element {
  return (
    <>
      <Header shouldReturn={true}>Utwórz wiadomośc na stronę</Header>
      <NewNewsForm />
    </>
  );
}
