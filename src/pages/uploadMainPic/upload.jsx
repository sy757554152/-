import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Button, Upload, message, Spin } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

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

    this.state = {
      fileList: [],
      loading: false,
    };
  }

  onFinish(values) {
    const { fileList } = this.state;
    const { dispatch } = this.props;
    const graphId = moment().format('YYYYMMDDHHmmss');
    const { jumpUrl } = values;
    const fs = new FormData();
    const file = fileList[0];
    fs.append('file', file);
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

  render() {
    const { fileList, loading } = this.state;
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
              rules={[{ required: true, message: '请选择上传主页照片' }]}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传主页照片</Button>
              </Upload>
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
