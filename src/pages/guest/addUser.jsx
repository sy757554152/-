import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import moment from 'moment';

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

class AddUser extends Component {
  constructor(...args) {
    super(...args);

    this.onFinish = this.onFinish.bind(this);

    this.state = {};
  }

  onFinish(values) {
    const { dispatch } = this.props;
    const { date, sex, userName, phone } = values;
    const userId = moment().format('YYYYMMDDHHmmss');
    const dateValue = date ? moment(date).format('YYYY-MM-DD') : '';
    dispatch({
      type: 'guest/addUser',
      payload: {
        userId,
        date: dateValue,
        sex,
        userName,
        phone,
      },
    });
  }

  render() {
    return (
      <PageContainer>
        <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError>
          <Form.Item
            name="userName"
            label="客户姓名"
            rules={[{ required: true, message: '请输入姓名', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="sex"
            label="客户性别"
            rules={[{ required: true, message: '请选择性别', whitespace: true }]}
          >
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="date" label="拍摄日期">
            <DatePicker />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, guest }) => ({
  userLogin: login,
  loading,
  guest,
}))(AddUser);
