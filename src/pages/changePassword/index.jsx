import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Button } from 'antd';

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
  const { dispatch, user = {} } = props;
  const { currentUser = {} } = user;
  const { userid } = currentUser;

  const onFinish = (values) => {
    dispatch({
      type: 'user/changePassword',
      payload: { ...values, userid },
    });
  };

  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="oldPassword"
        label="旧密码"
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
        name="newPassword"
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
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请在此输入密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入密码不一致!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

class Changepassword extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  render() {
    const { ...rest } = this.props;
    return (
      <PageContainer>
        <RegistrationForm {...rest} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, user }) => ({
  userLogin: login,
  loading,
  user,
}))(Changepassword);
