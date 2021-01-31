import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Button, Upload, message, Spin, Modal } from 'antd';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 6,
      offset: 6,
    },
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class UploadMainPic extends Component {
  constructor(...args) {
    super(...args);
    this.onFinish = this.onFinish.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      fileList: [],
      loading: false,
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
    };
  }

  onFinish(values) {
    const { fileList } = this.state;
    const { dispatch } = this.props;
    const graphId = moment().format('YYYYMMDDHHmmss');
    const { jumpUrl } = values;
    const fs = new FormData();
    const file = fileList[0];
    const { originFileObj } = file;
    fs.append('file', originFileObj);
    fs.append('graphId', graphId);
    fs.append('jumpUrl', jumpUrl);
    this.setState({
      loading: true,
    });
    dispatch({
      type: 'mainPic/addMainPic',
      payload: fs,
    });
  }

  handleCancel() {
    this.setState({
      previewVisible: false,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList });
  }

  async handlePreview(file) {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  }

  render() {
    const { fileList, loading, previewVisible, previewImage, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        } else {
          this.setState(() => ({
            fileList: [file],
          }));
        }
        return false;
      },
      fileList,
    };
    return (
      <PageContainer>
        <Spin spinning={loading}>
          <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError>
            <Form.Item
              name="jumpUrl"
              label="跳转地址"
              rules={[{ required: true, message: '请输入跳转地址', whitespace: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="avatar"
              label="上传主页照片"
              // rules={[{ required: true, message: '请选择上传主页照片' }]}
            >
              <Upload
                {...props}
                listType="picture-card"
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" disabled={fileList.length !== 1}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, mainPic }) => ({
  userLogin: login,
  loading,
  mainPic,
}))(UploadMainPic);
