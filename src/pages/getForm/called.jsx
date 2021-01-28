import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import FormTable from './table';

const { Option } = Select;

const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const { dispatch } = props;
  const onFinish = (values) => {
    dispatch({
      type: 'form/searchForm',
      payload: { ...values, type: true },
    });
  };
  const onReset = () => {
    dispatch({
      type: 'form/getForm',
      payload: {
        type: true,
      },
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        searchType: 'customerName',
      }}
      scrollToFirstError
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="value"
            label="查询内容"
            rules={[
              {
                required: true,
                message: '请输入查询内容',
              },
            ]}
          >
            <Input placeholder="请输入查询内容" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="searchType"
            label="查询类型"
            rules={[{ required: true, message: '请选择查询类型' }]}
          >
            <Select>
              <Option value="customerName">用户姓名</Option>
              <Option value="customerPhone">联系方式</Option>
              <Option value="typeName">预约类型</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
class AlreadyCall extends Component {
  constructor(...args) {
    super(...args);
    this.getForm = this.getForm.bind(this);
    this.columns = [
      {
        title: '表单序号',
        key: 'key',
        dataIndex: 'key',
      },
      {
        title: '用户姓名',
        key: 'customerName',
        dataIndex: 'customerName',
      },
      {
        title: '用户性别',
        key: 'sex',
        dataIndex: 'sex',
      },
      {
        title: '联系方式',
        key: 'customerPhone',
        dataIndex: 'customerPhone',
      },
      {
        title: '预约类型',
        key: 'typeName',
        dataIndex: 'typeName',
      },
    ];

    this.state = {};
  }

  componentDidMount() {
    this.getForm();
  }

  getForm() {
    const { dispatch } = this.props;
    dispatch({
      type: 'form/getForm',
      payload: {
        type: true,
      },
    });
  }

  render() {
    const { form = {} } = this.props;
    const { alreadyList = [] } = form;
    return (
      <PageContainer>
        <RegistrationForm {...this.props} />
        <FormTable columns={this.columns} dataSource={alreadyList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, user, form }) => ({
  userLogin: login,
  loading,
  user,
  form,
}))(AlreadyCall);
