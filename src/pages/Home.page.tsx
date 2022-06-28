// Node libs
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/header';

// Contexts
import { useAuth } from '../hooks/use-auth';

// Home is the main '/' route rendering component
export default function Home(): JSX.Element {
  const { signOut } = useAuth();

  return (
    <>
      <Header>Kokpit</Header>
      <div>Sign out</div>
      <div>
        <Link to='/data'>Data</Link>
      </div>

      <button onClick={signOut}>Sign out</button>
    </>
  );
}
