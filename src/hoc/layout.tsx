// Node libs
import { Outlet } from 'react-router-dom';

// Hooks
import { useAuth } from '../hooks/use-auth';

// Styles
import classes from './layout.module.scss';
import { Navigation } from '../components/layout/navigation';

export function Layout(): JSX.Element {
  const { user } = useAuth();

  return (
    <div className={classes.layout}>
      {user && (
        <nav>
          <Navigation />
        </nav>
      )}
      <main className={user ? classes.content : classes.signIn}>
        <Outlet />
      </main>
    </div>
  );
}
