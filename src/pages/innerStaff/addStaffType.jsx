import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Button } from 'antd';
import moment from 'moment';

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
    const staffTypeId = moment().format('YYYYMMDDHHmmss');
    dispatch({
      type: 'staff/addStaffType',
      payload: { ...values, staffTypeId },
    });
  };

  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="staffTypeName"
        label="员工类型名称"
        rules={[
          {
            required: true,
            message: '请输入员工类型',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

class AddStaffType extends Component {
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

export default connect(({ login, loading }) => ({
  userLogin: login,
  loading,
}))(AddStaffType);
