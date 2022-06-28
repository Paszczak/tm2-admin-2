// Components
import { ReactComponent as ActiveIcon } from '../../assets/check_circle.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';

// Styles
import classes from './school-year.module.scss';

// SchoolYear props definition
type SchoolYearProps = {
  name: string;
  current: boolean;
};

export function SchoolYear({ name, current }: SchoolYearProps): JSX.Element {
  return (
    <div className={classes.row}>
      <span className={classes.infoContainer}>
        <span className={current ? classes.iconCurrent : classes.icon}>
          <ActiveIcon />
        </span>
        <span className={classes.label}>{name}</span>
      </span>
      <span className={classes.delete}>
        <DeleteIcon />
      </span>
    </div>
  );
}
