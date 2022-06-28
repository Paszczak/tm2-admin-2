import { YearType } from '../../models/year';
import { Card } from '../layout/card';
import { List } from '../layout/list';
import { SchoolYear } from './school-year';

type SchoolYersListProps = {
  data: YearType[];
};

export function SchoolYearsList({ data }: SchoolYersListProps): JSX.Element {
  return (
    <List
      items={data ?? []}
      render={(item: YearType) => (
        <Card key={item.id} id={item.id}>
          <SchoolYear name={item.name} current={item.current} />
        </Card>
      )}
      onElementClick={() => {}}
    />
  );
}
