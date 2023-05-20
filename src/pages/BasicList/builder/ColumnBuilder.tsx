import { Space, Tag } from 'antd';
import moment from 'moment';
import { BasicListApi } from '../data';
import ActionBuilder from './ActionBuilder';

const ColumnBuilder = (tableColumn: BasicListApi.TableColumn[] | undefined) => {
  const idArray = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
  ];
  const newColumns: BasicListApi.TableColumn[] = [];
  (tableColumn || []).forEach((column) => {
    if (column.hideInColumn !== true) {
      switch (column.type) {
        case 'datetime':
          column.render = (value: any) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
          };
          break;
        case 'switch':
          column.render = (value: any) => {
            const option = (column.data || []).find((item) => {
              return (item.value = value);
            });
            return <Tag color={value ? 'blue' : 'red'}>{option?.title}</Tag>;
          };
          break;
        case 'actions':
          column.render = () => {
            return <Space>{ActionBuilder(column.actions)}</Space>;
          };
          break;
        default:
          break;
      }
      newColumns.push(column);
    }
  });
  return idArray.concat(newColumns || []);
};
export default ColumnBuilder;
