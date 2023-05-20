import { Button } from 'antd';
import { ButtonType } from 'antd/es/button/buttonHelpers';
import { BasicListApi } from '../data';
const ActionBuilder = (
  actions: BasicListApi.Action[] | undefined,
  actionHandler: (action: BasicListApi.Action) => void,
) => {
  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return (
        <Button
          key={action.text}
          type={action.type as ButtonType}
          onClick={() => {
            actionHandler(action);
          }}
        >
          {action.text}
        </Button>
      );
    }
  });
};

export default ActionBuilder;
