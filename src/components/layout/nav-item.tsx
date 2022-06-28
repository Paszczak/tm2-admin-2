import { NavLink } from 'react-router-dom';

// Styles
import classes from './nav-item.module.scss';

// NavItem props
type NavItemProps = {
  to: string;
  icon: JSX.Element;
  children: string;
};

export function NavItem({ to, icon, children }: NavItemProps): JSX.Element {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? classes.active : classes.inactive
        }>
        <span className={classes.icon}>{icon}</span>
        <span>{children}</span>
      </NavLink>
    </li>
  );
}
