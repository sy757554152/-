import React, { Component, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Table, Space, Button, Modal, Image } from 'antd';

const Delemodel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { dispatch, staff = {}, valueIndex } = props;
    const { staffPicList = [] } = staff;
    const value = staffPicList[valueIndex];
    dispatch({
      type: 'staff/deleStaffPic',
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
        <p>是否删除该图片？</p>
      </Modal>
    </>
  );
};

class ManageStaffPic extends Component {
  constructor(...args) {
    super(...args);

    this.getAllStaffPic = this.getAllStaffPic.bind(this);

    this.columns = [
      {
        title: '图片序号',
        dataIndex: 'key',
      },
      {
        title: '员工Id',
        dataIndex: 'staffId',
      },
      {
        title: '员工姓名',
        dataIndex: 'staffName',
      },
      {
        title: '图片',
        dataIndex: 'PicCompressUrl',
        render: (text, record) => {
          return <Image width={200} src={record.PicCompressUrl} />;
        },
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
    this.getAllStaffPic();
  }

  getAllStaffPic() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/getStaffPic',
    });
  }

  render() {
    const { staff } = this.props;
    const { staffPicList } = staff;
    return (
      <PageContainer>
        <Table columns={this.columns} dataSource={staffPicList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, staff }) => ({
  userLogin: login,
  loading,
  staff,
}))(ManageStaffPic);
