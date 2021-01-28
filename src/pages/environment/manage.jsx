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
    const { dispatch, environment = {}, valueIndex } = props;
    const { environmentList = [] } = environment;
    const value = environmentList[valueIndex];
    dispatch({
      type: 'environment/deleEnvironmentPic',
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

class ManageEnvironment extends Component {
  constructor(...args) {
    super(...args);

    this.getEnvironmentPic = this.getEnvironmentPic.bind(this);

    this.columns = [
      {
        title: '图片序号',
        dataIndex: 'key',
      },
      {
        title: '图片',
        dataIndex: 'graphUrl',
        render: (text, record) => {
          return <Image width={200} src={record.graphUrl} />;
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
    this.getEnvironmentPic();
  }

  getEnvironmentPic() {
    const { dispatch } = this.props;
    dispatch({
      type: 'environment/getEnvironmentPic',
    });
  }

  render() {
    const { environment } = this.props;
    const { environmentList } = environment;
    return (
      <PageContainer>
        <Table columns={this.columns} dataSource={environmentList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, environment }) => ({
  userLogin: login,
  loading,
  environment,
}))(ManageEnvironment);
