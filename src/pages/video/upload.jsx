import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Select, Button, Upload, Spin } from 'antd';
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

class UploadVideo extends Component {
  constructor(...args) {
    super(...args);

    this.getAllStaff = this.getAllStaff.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.getVideoType = this.getVideoType.bind(this);

    this.state = {
      fileList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getAllStaff();
    this.getVideoType();
  }

  onFinish(values) {
    const { fileList } = this.state;
    const { dispatch } = this.props;
    const videoId = moment().format('YYYYMMDDHHmmss');
    const date = moment().format('YYYYMMDD');
    const { staffId, type } = values;
    const fs = new FormData();
    fileList.forEach((file, index) => {
      fs.append(`file${index}`, file);
    });
    fs.append('staffId', staffId);
    fs.append('type', type);
    fs.append('videoId', videoId);
    fs.append('date', date);
    this.setState({ loading: true });
    dispatch({
      type: 'video/addVideo',
      payload: fs,
    });
  }

  getAllStaff() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/getStaff',
    });
  }

  getVideoType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/getType',
      payload: {
        type: 'video',
      },
    });
  }

  render() {
    const { fileList } = this.state;
    const { staff = {}, type = {} } = this.props;
    const { staffList = [] } = staff;
    const { videoType = [] } = type;
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
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <PageContainer>
        <Spin spinning={this.state.loading}>
          <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError>
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
              label="视频类型"
              rules={[{ required: true, message: '请选择对应视频类型' }]}
            >
              <Select>
                {videoType.map((item, idx) => (
                  <Option key={idx} value={item.typeId}>
                    {item.typeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="avatar"
              label="上传视频"
              rules={[{ required: true, message: '请选择上传视频' }]}
            >
              <Upload {...props} multiple>
                <Button icon={<UploadOutlined />}>上传视频</Button>
              </Upload>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" disabled={fileList.length <= 0}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, staff, type }) => ({
  userLogin: login,
  loading,
  staff,
  type,
}))(UploadVideo);
