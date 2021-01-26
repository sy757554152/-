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
    const { dispatch, sample = {}, valueIndex } = props;
    const { sampleList = [] } = sample;
    const value = sampleList[valueIndex];
    dispatch({
      type: 'sample/deleSample',
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

class ManageSample extends Component {
  constructor(...args) {
    super(...args);

    this.getAllSamplePic = this.getAllSamplePic.bind(this);

    this.columns = [
      {
        title: '图片Id',
        dataIndex: 'sampleId',
      },
      {
        title: '图片类型',
        dataIndex: 'typeName',
      },
      {
        title: '员工姓名',
        dataIndex: 'staffName',
      },
      {
        title: '图片',
        dataIndex: 'picCompressUrl',
        render: (text, record) => {
          return <Image width={200} src={record.picCompressUrl} />;
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
    this.getAllSamplePic();
  }

  getAllSamplePic() {
    const { dispatch } = this.props;
    dispatch({
      type: 'sample/getSample',
    });
  }

  render() {
    const { sample } = this.props;
    const { sampleList } = sample;
    return (
      <PageContainer>
        <Table columns={this.columns} dataSource={sampleList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, sample }) => ({
  userLogin: login,
  loading,
  sample,
}))(ManageSample);
