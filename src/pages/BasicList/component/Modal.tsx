import { Form, Input, message, Modal as AntdModal } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import ActionBuilder from '../builder/ActionBuilder';
import FormBuilder from '../builder/FormBuilder';
import { setFieldsAdaptor, submitFieldsAdaptor } from '../helper';
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
  const init = useRequest<{ data: BasicListApi.PageData }>(
    `https://public-api-v2.aspirantzhang.com${modalUrl}?X-API-KEY=antd`,
    {
      manual: true,
    },
  );
  const request = useRequest(
    (values: any) => {
      const { uri, method, ...formValues } = values;
      message.loading({ content: 'Processing...', key: 'process', duration: 0 });
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...submitFieldsAdaptor(formValues),
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      manual: true,
      onError: (error) => {
        console.log(error);
        if (error.name === 'BizError') {
          message.error({
            content: 'Business Error, please try again.',
            key: 'process',
            duration: 20,
          });
        }
      },
      onSuccess: (data) => {
        message.success({
          content: data.message,
          key: 'process',
        });
        hideMoal();
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values: any) => {
    request.run(values);
    init.run();
  };
  const actionHandler = (action: BasicListApi.Action) => {
    switch (action.action) {
      case 'submit':
        form.setFieldsValue({ uri: action.uri, method: action.method });
        form.submit();
        break;
      default:
        break;
    }
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
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data, actionHandler, request.loading)}
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
          onFinish={onFinish}
        >
          {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
          <Form.Item name="uri" key="uri" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="method" key="method" hidden>
            <Input />
          </Form.Item>
        </Form>
      </AntdModal>
    </>
  );
};

export default Modal;
