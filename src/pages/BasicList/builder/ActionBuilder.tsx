import { Button } from 'antd';
import { ButtonType } from 'antd/es/button/buttonHelpers';
import { BasicListApi } from '../data';
const ActionBuilder = (actions: BasicListApi.Action[] | undefined) => {
  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return <Button type={action.type as ButtonType}>{action.text}</Button>;
    }
  });
};

export default ActionBuilder;
