import React, { Component, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Table, Space, Button, Modal, Input } from 'antd';
import moment from 'moment';

const Delemodel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { dispatch, type = {}, valueIndex } = props;
    const { pictureType = [] } = type;
    const value = pictureType[valueIndex];
    dispatch({
      type: 'type/deleType',
      payload: {
        type: 'picture',
        value,
      },
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
        <p>是否删除该图片类型？</p>
      </Modal>
    </>
  );
};

const Addmodel = (props) => {
  let inputValue = '';
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { dispatch } = props;
    const typeId = moment().format('YYYYMMDDHHmmss');
    dispatch({
      type: 'type/addType',
      payload: {
        type: 'picture',
        typeName: inputValue,
        typeId,
      },
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const valueChange = (e) => {
    const { target = {} } = e;
    const { value } = target;
    inputValue = value;
  };

  return (
    <>
      <Button type="primary" shape="round" onClick={showModal} style={{ marginBottom: 20 }}>
        添加照片类型
      </Button>
      <Modal title="添加照片类型" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="请输入照片类型" onChange={valueChange} />
      </Modal>
    </>
  );
};

class PhotoType extends Component {
  constructor(...args) {
    super(...args);
    this.getAllPhotoType = this.getAllPhotoType.bind(this);

    this.columns = [
      {
        title: '类型序号',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '类型名称',
        dataIndex: 'typeName',
        key: 'typeName',
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
    this.getAllPhotoType();
  }

  getAllPhotoType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/getType',
      payload: {
        type: 'picture',
      },
    });
  }

  render() {
    const { type = {} } = this.props;
    const { pictureType = [] } = type;
    return (
      <PageContainer>
        <Addmodel {...this.props} />
        <Table columns={this.columns} dataSource={pictureType} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, user, form, type }) => ({
  userLogin: login,
  loading,
  user,
  form,
  type,
}))(PhotoType);
