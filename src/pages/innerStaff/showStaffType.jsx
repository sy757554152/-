import React, { Component, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { Table, Space, Button, Modal } from 'antd';

const Delemodel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { dispatch, staff = {}, valueIndex } = props;
    const { typeList = [] } = staff;
    const value = typeList[valueIndex];
    dispatch({
      type: 'staff/deleStaffType',
      payload: { ...value },
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
        <p>是否删除该员工类型？</p>
      </Modal>
    </>
  );
};

class PhotoType extends Component {
  constructor(...args) {
    super(...args);
    this.getStaffType = this.getStaffType.bind(this);

    this.columns = [
      {
        title: '员工类型序号',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '类型名称',
        dataIndex: 'staffTypeName',
        key: 'staffTypeName',
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
    this.getStaffType();
  }

  getStaffType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/getStaffType',
    });
  }

  render() {
    const { staff = {} } = this.props;
    const { typeList = [] } = staff;
    return (
      <PageContainer>
        <Button
          type="primary"
          shape="round"
          style={{ marginBottom: 20 }}
          onClick={() => {
            history.push('/innerStaff/addStaffType');
          }}
        >
          添加员工类型
        </Button>
        <Table columns={this.columns} dataSource={typeList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, user, staff }) => ({
  userLogin: login,
  loading,
  user,
  staff,
}))(PhotoType);
