// Node libs
import { NavLink } from 'react-router-dom';

// Icons
import { ReactComponent as DashboardIcon } from '../../assets/grid-outline.svg';
import { ReactComponent as SchoolIcon } from '../../assets/school-sharp.svg';
import { ReactComponent as NewsIcon } from '../../assets/newspaper-sharp.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settings-outline.svg';
import { ReactComponent as Logo } from '../../assets/tm-logo-new.svg';

// Components
import { NavItem } from './nav-item';

// Classes
import classes from './navigation.module.scss';
import { useAuth } from '../../hooks/use-auth';

export function Navigation(): JSX.Element {
  const { user, signOut } = useAuth();

  return (
    <>
      <div className={classes.logo}>
        <NavLink to='/'>
          <span className={classes.icon}>
            <Logo />
          </span>
          Teoria muzyki
        </NavLink>
      </div>
      <ul className={classes.navlist}>
        <NavItem to='/' icon={<DashboardIcon />}>
          Kokpit
        </NavItem>
        <NavItem to='/news' icon={<NewsIcon />}>
          Wiadomości
        </NavItem>
        <NavItem to='/school' icon={<SchoolIcon />}>
          Materiały
        </NavItem>
        <NavItem to='/settings' icon={<SettingsIcon />}>
          Ustawienia
        </NavItem>
      </ul>
      {user && (
        <div className={classes.signOut} onClick={() => signOut()}>
          <span className={classes.signOutIcon}></span>
          Wyloguj
        </div>
      )}
    </>
  );
}
