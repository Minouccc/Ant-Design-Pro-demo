import { Form, Modal as AntdModal } from 'antd';
import moment from 'moment';
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
  const [form] = Form.useForm();
  const init = useRequest<{ data: PageApi.Data }>(`${modalUrl}`);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const setFieldsAdaptor = (data: PageApi.Data) => {
    if (data?.layout?.tabs && data?.dataSource) {
      const result = {};
      data.layout.tabs.forEach((tab) => {
        tab.data.forEach((field) => {
          switch (field.type) {
            case 'datetime':
              result[field.key] = moment(data.dataSource[field.key]);
              break;

            default:
              result[field.key] = data.dataSource[field.key];
              break;
          }
        });
      });
      return result;
    }
    return {};
  };
  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      init.run();
    }
  }, [isModalOpen]);
  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsAdaptor(init.data));
    }
  }, [init.data]);
  return (
    <>
      <AntdModal
        title={init?.data?.page?.title}
        open={isModalOpen}
        onCancel={hideMoal}
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data)}
        maskClosable={false}
      >
        <Form
          form={form}
          {...layout}
          initialValues={{
            create_time: moment(),
            update_time: moment(),
            status: true,
          }}
        >
          {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
        </Form>
      </AntdModal>
    </>
  );
};

export default Modal;
