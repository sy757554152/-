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
    const { dispatch, mainPic = {}, valueIndex } = props;
    const { mainPicList = [] } = mainPic;
    const value = mainPicList[valueIndex];
    dispatch({
      type: 'mainPic/deleMainPic',
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

class ManageMainPic extends Component {
  constructor(...args) {
    super(...args);

    this.getMainPic = this.getMainPic.bind(this);

    this.columns = [
      {
        title: '图片Id',
        dataIndex: 'graphId',
      },
      {
        title: '跳转链接',
        dataIndex: 'jumpUrl',
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
    this.getMainPic();
  }

  getMainPic() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mainPic/getMainPic',
    });
  }

  render() {
    const { mainPic } = this.props;
    const { mainPicList } = mainPic;
    return (
      <PageContainer>
        <Table columns={this.columns} dataSource={mainPicList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, mainPic }) => ({
  userLogin: login,
  loading,
  mainPic,
}))(ManageMainPic);
