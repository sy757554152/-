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
    const { dispatch, video = {}, valueIndex } = props;
    const { videoList = [] } = video;
    const value = videoList[valueIndex];
    dispatch({
      type: 'video/deleVideo',
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
        <p>是否删除该视频？</p>
      </Modal>
    </>
  );
};

class ManageVideo extends Component {
  constructor(...args) {
    super(...args);

    this.getAllVideoPic = this.getAllVideoPic.bind(this);

    this.columns = [
      {
        title: '视频序号',
        dataIndex: 'key',
      },
      {
        title: '视频类型',
        dataIndex: 'typeName',
      },
      {
        title: '员工姓名',
        dataIndex: 'staffName',
      },
      {
        title: '视频',
        dataIndex: 'videoUrl',
        render: (text, record) => {
          return (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video controls width={200} preload src={record.videoUrl} />
          );
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
    this.getAllVideoPic();
  }

  getAllVideoPic() {
    const { dispatch } = this.props;
    dispatch({
      type: 'video/getVideo',
    });
  }

  render() {
    const { video } = this.props;
    const { videoList } = video;
    return (
      <PageContainer>
        <Table columns={this.columns} dataSource={videoList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, video }) => ({
  userLogin: login,
  loading,
  video,
}))(ManageVideo);
