import { Button } from 'antd';
import { ButtonType } from 'antd/es/button/buttonHelpers';

const ActionBuilder = (
  actions: BasicListApi.Action[] | undefined,
  actionHandler: BasicListApi.ActionHandler,
  loading: boolean,
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
          loading={loading}
        >
          {action.text}
        </Button>
      );
    }
    return null;
  });
};

export default ActionBuilder;
