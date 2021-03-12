import React, { Component } from 'react';
import { Upload, message, Spin } from 'antd';

class UploadPic extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const { value, handleChange, uploading } = this.props;
    const UploadProps = {
      beforeUpload: (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
          return false;
        }
        return true;
      },
    };
    return (
      <Spin spinning={uploading}>
        <Upload
          {...UploadProps}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
        >
          <img src={value} alt="摄影师图片" style={{ width: '100%' }} />
        </Upload>
      </Spin>
    );
  }
}

export default UploadPic;
