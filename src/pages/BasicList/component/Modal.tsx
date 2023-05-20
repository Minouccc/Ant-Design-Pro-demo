import { Form, Input, Modal as AntdModal } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import ActionBuilder from '../builder/ActionBuilder';
import FormBuilder from '../builder/FormBuilder';
import { BasicListApi } from '../data';
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
  const init = useRequest<{ data: PageApi.Data }>(`${modalUrl}`, {
    manual: true,
  });
  const request = useRequest(
    (values: any) => {
      const { uri, method, ...formValues } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...formValues,
          'X-API-KEY': 'antd',
          create_time: moment(formValues.create_time).format(),
          update_time: moment(formValues.update_time).format(),
        },
      };
    },
    {
      manual: true,
    },
  );
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
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data, actionHandler)}
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
