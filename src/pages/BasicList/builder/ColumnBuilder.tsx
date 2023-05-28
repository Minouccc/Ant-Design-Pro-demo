import { Space, Tag } from 'antd';
import moment from 'moment';
import ActionBuilder from './ActionBuilder';

const ColumnBuilder = (
  tableColumn: BasicListApi.Field[] | undefined,
  actionHandler: BasicListApi.ActionHandler,
) => {
  const idArray: BasicListApi.Field[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    },
  ];
  const newColumns: BasicListApi.Field[] = [];
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
            const option = (column.data || []).find((item: any) => {
              return (item.value = value);
            });
            return <Tag color={value ? 'blue' : 'red'}>{option?.title}</Tag>;
          };
          break;
        case 'actions':
          column.render = () => {
            return <Space>{ActionBuilder(column.actions, actionHandler)}</Space>;
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
