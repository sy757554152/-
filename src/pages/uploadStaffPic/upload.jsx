import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Select, Button, Upload, message, Spin, Modal } from 'antd';
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

class UploadStaffPic extends Component {
  constructor(...args) {
    super(...args);

    this.getAllStaff = this.getAllStaff.bind(this);
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

  componentDidMount() {
    this.getAllStaff();
  }

  onFinish(values) {
    const { fileList } = this.state;
    const { dispatch } = this.props;
    const staffPicId = moment().format('YYYYMMDDHHmmss');
    const { staffId } = values;
    const staffPid = staffId;
    const fs = new FormData();
    fileList.forEach((file, index) => {
      const { originFileObj } = file;
      fs.append(`file${index}`, originFileObj);
    });
    fs.append('staffPicId', staffPicId);
    fs.append('staffPid', staffPid);
    this.setState({
      loading: true,
    });
    dispatch({
      type: 'staff/addStaffPic',
      payload: {
        fs,
        staffId,
      },
    });
  }

  getAllStaff() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/getStaff',
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
    const { staff = {}, history } = this.props;
    const { location = {} } = history;
    const { query = {} } = location;
    const { value } = query;
    const { staffList = [] } = staff;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传照片</div>
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
        <Spin spinning={loading}>
          <Form
            {...formItemLayout}
            initialValues={{ staffId: value }}
            name="register"
            onFinish={this.onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="staffId"
              label="员工姓名"
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
              name="avatar"
              label="员工上传照片"
              // rules={[{ required: true, message: '请选择上传照片' }]}
            >
              <Upload
                {...props}
                multiple
                name="avatar"
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

export default connect(({ login, loading, staff }) => ({
  userLogin: login,
  loading,
  staff,
}))(UploadStaffPic);
