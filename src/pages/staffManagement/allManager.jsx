import React, { Component, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Table, Space, Button, Modal } from 'antd';

const Delemodel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { dispatch, user = {}, valueIndex } = props;
    const { managerList = [] } = user;
    const value = managerList[valueIndex];
    dispatch({
      type: 'user/deleManager',
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
        <p>是否删除该员工信息？</p>
      </Modal>
    </>
  );
};

class StaffManagemanet extends Component {
  constructor(...args) {
    super(...args);
    this.getAllManager = this.getAllManager.bind(this);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '姓名',
        dataIndex: 'managerName',
        key: 'managerName',
      },
      {
        title: '用户id',
        dataIndex: 'managerId',
        key: 'managerId',
      },
      {
        title: '联系电话',
        dataIndex: 'telephone',
        key: 'telephone',
      },
      {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '类型',
        key: 'typeName',
        dataIndex: 'typeName',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <Delemodel valueIndex={index} {...this.props} />
            </Space>
          );
        },
      },
    ];

    this.state = {};
  }

  componentDidMount() {
    this.getAllManager();
  }

  getAllManager() {
    const { dispatch, user } = this.props;
    dispatch({
      type: 'user/getAllUser',
      payload: { user },
    });
  }

  render() {
    const { user = {} } = this.props;
    const { managerList = [] } = user;
    return (
      <PageContainer>
        <Table columns={this.columns} dataSource={managerList} />
      </PageContainer>
    );
  }
}

// export default StaffManagemanet;

export default connect(({ login, loading, user }) => ({
  userLogin: login,
  loading,
  user,
}))(StaffManagemanet);
