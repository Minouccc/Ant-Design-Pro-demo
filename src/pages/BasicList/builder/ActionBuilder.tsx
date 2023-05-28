import { Button } from 'antd';
import { ButtonType } from 'antd/es/button/buttonHelpers';

const ActionBuilder = (
  actions: BasicListApi.Action[] | undefined,
  actionHandler: BasicListApi.ActionHandler,
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
    return null;
  });
};

export default ActionBuilder;
