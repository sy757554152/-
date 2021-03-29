import React, { Component, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { Table, Space, Button, Modal, Image, message } from 'antd';
import UploadPic from '@/components/UploadPic/index';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

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
    const ChangePic = (props) => {
      const [isModalVisible, setIsModalVisible] = useState(false);

      const showModal = () => {
        const { staff, valueIndex } = props;
        const { staffPicList = [] } = staff;
        const information = staffPicList[valueIndex];
        const { PicCompressUrl } = information;
        this.setState({
          imageUrl: PicCompressUrl,
        });
        setIsModalVisible(true);
      };

      const handleOk = () => {
        const { fileList } = this.state;
        const { dispatch, history: historyValue } = this.props;
        const { staff, valueIndex } = props;
        const { staffPicList = [] } = staff;
        const information = staffPicList[valueIndex];
        const { location = {} } = historyValue;
        const { query = {} } = location;
        const { value = {} } = query;
        const { staffId } = value;
        const { staffPicId, staffPid, PicUrl, PicCompressUrl } = information;
        let isPicChange = false;
        if (fileList.length !== 0) {
          isPicChange = true;
        }
        const fs = new FormData();
        this.setState({
          uploading: true,
        });
        fs.append('staffPicId', staffPicId);
        fs.append('staffPid', staffPid);
        fs.append('PicUrl', PicUrl);
        fs.append('PicCompressUrl', PicCompressUrl);
        fs.append('isPicChange', isPicChange);
        if (isPicChange) {
          const [file] = fileList;
          fs.append('file', file);
        }
        dispatch({
          type: 'staff/changeStaffPic',
          payload: {
            fs,
            staffId,
          },
          callback: (res) => {
            if (res) {
              setIsModalVisible(false);
              this.setState({
                uploading: false,
              });
            } else {
              this.setState({
                uploading: false,
              });
            }
          },
        });
      };

      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
          return false;
        }
        getBase64(file, (imageUrl) => {
          this.setState({
            fileList: [file],
            imageUrl,
            uploading: false,
          });
        });
        return false;
      };

      const params = {
        value: this.state.imageUrl,
        uploading: this.state.uploading,
        beforeUpload,
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };

      return (
        <>
          <Button type="primary" shape="round" onClick={showModal}>
            替换图片
          </Button>
          <Modal
            title="替换图片提示"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <UploadPic {...params} />
          </Modal>
        </>
      );
    };

    super(...args);

    this.getAllStaffPic = this.getAllStaffPic.bind(this);

    this.columns = [
      {
        title: '图片序号',
        dataIndex: 'key',
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
              <ChangePic valueIndex={index} {...this.props} />
              <Delemodel valueIndex={index} {...this.props} />
            </Space>
          );
        },
      },
    ];

    this.state = {
      fileList: [],
      uploading: false,
    };
  }

  componentDidMount() {
    this.getAllStaffPic();
  }

  getAllStaffPic() {
    const { dispatch, history: historyValue } = this.props;
    const { location = {} } = historyValue;
    const { query = {} } = location;
    const { value = {} } = query;
    const { staffId } = value;
    dispatch({
      type: 'staff/getStaffPic',
      payload: {
        staffId,
      },
    });
  }

  render() {
    const { staff, history: historyValue } = this.props;
    const { location = {} } = historyValue;
    const { query = {} } = location;
    const { value = {} } = query;
    const { staffId } = value;
    const { staffPicList } = staff;
    return (
      <PageContainer>
        <Button
          type="primary"
          shape="round"
          style={{ marginBottom: 15 }}
          danger
          onClick={() => {
            history.push({
              pathname: '/uploadStaffPic/upload',
              query: {
                value: staffId,
              },
            });
          }}
        >
          添加摄影师图片
        </Button>
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
