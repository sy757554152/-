import React, { Component, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { Form, Input, Select, Space, Button, Modal, Row, Col, Table } from 'antd';
import moment from 'moment';

const { Option } = Select;

const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const { dispatch } = props;
  const onFinish = (values) => {
    dispatch({
      type: 'guest/searchUserList',
      payload: { ...values },
    });
  };
  const onReset = () => {
    dispatch({
      type: 'guest/getUser',
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        searchType: 'userName',
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
              <Option value="userName">用户姓名</Option>
              <Option value="phone">联系方式</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            danger
            onClick={() => {
              history.push('/guest/addUser');
            }}
          >
            添加客户
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const DeleModel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { dispatch, guest = {}, valueIndex } = props;
    const { userList = [] } = guest;
    const value = userList[valueIndex];
    dispatch({
      type: 'guest/deleUser',
      payload: { value },
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" shape="round" danger onClick={showModal}>
        删除
      </Button>
      <Modal title="删除提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>是否删除该客户？</p>
      </Modal>
    </>
  );
};

class UserList extends Component {
  constructor(...args) {
    super(...args);
    this.getUserList = this.getUserList.bind(this);

    this.columns = [
      {
        title: '序号',
        key: 'key',
        dataIndex: 'key',
      },
      {
        title: '用户姓名',
        key: 'userName',
        dataIndex: 'userName',
      },
      {
        title: '用户性别',
        key: 'sex',
        dataIndex: 'sex',
      },
      {
        title: '联系方式',
        key: 'phone',
        dataIndex: 'phone',
      },
      {
        title: '拍摄日期',
        key: 'date',
        dataIndex: 'date',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          const { guest = {} } = this.props;
          const { userList = [] } = guest;
          return (
            <Space size="middle">
              <Button
                type="primary"
                shape="round"
                onClick={() => {
                  userList[index].date =
                    userList[index].date === '' || userList[index].date === null
                      ? ''
                      : moment(userList[index].date, 'YYYY-MM-DD');
                  history.push({
                    pathname: '/guest/detail',
                    query: {
                      value: userList[index],
                    },
                  });
                }}
              >
                查看用户详情
              </Button>
              <Button
                type="primary"
                shape="round"
                onClick={() => {
                  history.push({
                    pathname: '/guest/manage',
                    query: {
                      value: userList[index],
                    },
                  });
                }}
              >
                查看客户图片
              </Button>
              <DeleModel valueIndex={index} {...this.props} />
            </Space>
          );
        },
      },
    ];
    this.state = {};
  }

  componentDidMount() {
    this.getUserList();
  }

  getUserList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'guest/getUser',
    });
  }

  render() {
    const { guest = {} } = this.props;
    const { userList = [] } = guest;
    return (
      <PageContainer>
        <RegistrationForm {...this.props} />
        <Table columns={this.columns} dataSource={userList} />;
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, user, guest }) => ({
  userLogin: login,
  loading,
  user,
  guest,
}))(UserList);
