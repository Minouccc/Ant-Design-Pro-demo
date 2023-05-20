import { Form, Input } from 'antd';
const FormBuilder = (data: PageApi.Daum[] | undefined) => {
  return (data || []).map((field) => {
    return (
      <Form.Item key={field.key} label={field.title} name={field.title}>
        <Input />
      </Form.Item>
    );
  });
};

export default FormBuilder;
