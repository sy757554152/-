import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Select, Button, Upload, message, Input } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

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

class UploadGuest extends Component {
  constructor(...args) {
    super(...args);

    this.getAllStaff = this.getAllStaff.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.getPicType = this.getPicType.bind(this);

    this.state = {
      fileList: [],
    };
  }

  componentDidMount() {
    this.getAllStaff();
    this.getPicType();
  }

  onFinish(values) {
    const { fileList } = this.state;
    const { dispatch } = this.props;
    const guestId = moment().format('YYYYMMDDHHmmss');
    const date = moment().format('YYYYMMDD');
    const { staffId, type, guestName } = values;
    const fs = new FormData();
    fileList.forEach((file, index) => {
      fs.append(`file${index}`, file);
    });
    fs.append('staffId', staffId);
    fs.append('type', type);
    fs.append('guestId', guestId);
    fs.append('guestName', guestName);
    fs.append('date', date);
    dispatch({
      type: 'guest/addGuest',
      payload: fs,
    });
  }

  getAllStaff() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/getStaff',
    });
  }

  getPicType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/getType',
      payload: {
        type: 'picture',
      },
    });
  }

  render() {
    const { fileList } = this.state;
    const { staff = {}, type = {} } = this.props;
    const { staffList = [] } = staff;
    const { pictureType = [] } = type;
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
        <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError>
          <Form.Item
            name="guestName"
            label="客户姓名"
            rules={[{ required: true, message: '请填写客户姓名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="staffId"
            label="摄影师姓名"
            rules={[{ required: true, message: '请选择对应摄影师姓名' }]}
          >
            <Select>
              {staffList.map((item, idx) => (
                <Option key={idx} value={item.staffId}>
                  {item.staffName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="图片类型"
            rules={[{ required: true, message: '请选择对应图片类型' }]}
          >
            <Select>
              {pictureType.map((item, idx) => (
                <Option key={idx} value={item.typeId}>
                  {item.typeName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="avatar"
            label="上传样片照片"
            rules={[{ required: true, message: '请选择上传照片' }]}
          >
            <Upload {...props} multiple>
              <Button icon={<UploadOutlined />}>上传样片照片</Button>
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={fileList.length <= 0}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, staff, type }) => ({
  userLogin: login,
  loading,
  staff,
  type,
}))(UploadGuest);
