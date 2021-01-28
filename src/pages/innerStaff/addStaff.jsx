import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Select, Button, Upload, message, Spin } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

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

class InnerStaff extends Component {
  constructor(...args) {
    super(...args);

    this.onFinish = this.onFinish.bind(this);

    this.state = {
      fileList: [],
      uploading: false,
    };
  }

  onFinish(values) {
    const { fileList } = this.state;
    const { dispatch } = this.props;
    const staffId = moment().format('YYYYMMDDHHmmss');
    const { name, sex, information } = values;
    const [file] = fileList;
    const fs = new FormData();
    this.setState({
      uploading: true,
    });
    fs.append('staffId', staffId);
    fs.append('staffName', name);
    fs.append('sex', sex);
    fs.append('information', information);
    fs.append('file', file);
    dispatch({
      type: 'staff/addStaff',
      payload: fs,
    });
  }

  render() {
    const { fileList, uploading } = this.state;
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
          this.setState((state) => ({
            fileList: [...state.fileList, file],
          }));
        }
        return false;
      },
      fileList,
    };
    return (
      <PageContainer>
        <Spin spinning={uploading}>
          <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError>
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="sex" label="性别" rules={[{ required: true, message: '请选择性别' }]}>
              <Select>
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="information"
              label="个人简介"
              rules={[{ required: true, message: '请输入个人简介' }]}
            >
              <TextArea showCount maxLength={250} />
            </Form.Item>

            <Form.Item
              name="avatar"
              label="员工头像"
              rules={[{ required: true, message: '请上传员工头像' }]}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传头像</Button>
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

export default connect(({ login, loading, staff }) => ({
  userLogin: login,
  loading,
  staff,
}))(InnerStaff);
