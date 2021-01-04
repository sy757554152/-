import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 6,
      offset: 6,
    },
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const { dispatch } = props;
  const onFinish = (values) => {
    dispatch({
      type: 'user/addUser',
      payload: { ...values },
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="id"
        label="用户id"
        rules={[
          {
            required: true,
            message: '请输入用户id',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        label="姓名"
        rules={[{ required: true, message: '请输入姓名', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请在此输入密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入密码不一致!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="email"
        label="电子邮箱"
        rules={[
          {
            type: 'email',
            message: '输入电子邮箱格式错误',
          },
          {
            required: true,
            message: '请输入电子邮箱',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="telephone"
        label="联系电话"
        rules={[{ required: true, message: '请输入联系电话' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="type"
        label="用户类型"
        rules={[{ required: true, message: '请选择账号类型' }]}
      >
        <Select>
          <Option value="admin">管理员</Option>
          <Option value="user">员工</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
