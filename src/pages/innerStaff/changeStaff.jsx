import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Select, Button, Upload, message, Spin } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

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

class ChangeStaff extends Component {
  constructor(...args) {
    super(...args);

    this.onFinish = this.onFinish.bind(this);
    this.getStaffType = this.getStaffType.bind(this);
    this.state = {
      fileList: [],
      uploading: false,
    };
  }

  componentDidMount() {
    this.getStaffType();
  }

  onFinish(values) {
    const { fileList } = this.state;

    const { history = {}, dispatch } = this.props;
    const { location = {} } = history;
    const { query = {} } = location;
    const { value = {} } = query;
    const { staffId, staffPicUrl } = value;

    const { staffName, sex, information, staffTid } = values;
    let isPicChange = false;
    if (fileList.length !== 0) {
      isPicChange = true;
    }
    const fs = new FormData();
    this.setState({
      uploading: true,
    });
    fs.append('staffId', staffId);
    fs.append('staffName', staffName);
    fs.append('sex', sex);
    fs.append('information', information);
    fs.append('staffPicUrl', staffPicUrl);
    fs.append('staffTid', staffTid);
    fs.append('isPicChange', isPicChange);
    if (isPicChange) {
      const [file] = fileList;
      fs.append('file', file);
    }
    dispatch({
      type: 'staff/changeStaff',
      payload: fs,
    });
  }

  getStaffType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/getStaffType',
    });
  }

  render() {
    const { history = {}, staff = {} } = this.props;
    const { typeList } = staff;
    const { location = {} } = history;
    const { query = {} } = location;
    const { value = {} } = query;
    const { staffPicUrl } = value;
    const { uploading, imageUrl } = this.state;
    const UploadProps = {
      beforeUpload: (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
          return false;
        }
        getBase64(file, (imgValue) =>
          this.setState({
            fileList: [file],
            imageUrl: imgValue,
            uploading: false,
          }),
        );
        return false;
      },
    };
    return (
      <PageContainer>
        <Spin spinning={uploading}>
          <Form
            {...formItemLayout}
            initialValues={value}
            name="register"
            onFinish={this.onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="staffName"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="staffTid"
              label="员工类型"
              rules={[{ required: true, message: '请选择员工类型' }]}
            >
              <Select>
                {typeList.map((item, idx) => (
                  <Option key={idx} value={item.staffTypeId}>
                    {item.staffTypeName}
                  </Option>
                ))}
              </Select>
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
              // rules={[{ required: true, message: '请上传员工头像' }]}
            >
              <Upload
                {...UploadProps}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="员工头像" style={{ width: '100%' }} />
                ) : (
                  <img src={staffPicUrl} alt="员工头像" style={{ width: '100%' }} />
                )}
              </Upload>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
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
}))(ChangeStaff);
