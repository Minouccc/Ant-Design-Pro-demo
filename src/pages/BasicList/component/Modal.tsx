import { Form, Modal as AntdModal } from 'antd';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import ActionBuilder from '../builder/ActionBuilder';
import FormBuilder from '../builder/FormBuilder';
const Modal = ({
  isModalOpen,
  hideMoal,
  modalUrl,
}: {
  isModalOpen: boolean;
  hideMoal: () => void;
  modalUrl: string;
}) => {
  const init = useRequest<{ data: PageApi.Data }>(`${modalUrl}`);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  useEffect(() => {
    if (isModalOpen) {
      init.run();
    }
  }, [isModalOpen]);
  return (
    <>
      <AntdModal
        title={init?.data?.page?.title}
        open={isModalOpen}
        onCancel={hideMoal}
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data)}
      >
        <Form {...layout}>{FormBuilder(init?.data?.layout?.tabs[0]?.data)}</Form>
      </AntdModal>
    </>
  );
};

export default Modal;
