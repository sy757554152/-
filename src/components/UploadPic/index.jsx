import React, { Component } from 'react';
import { Upload, Spin } from 'antd';

class UploadPic extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const { value, uploading, beforeUpload } = this.props;
    return (
      <Spin spinning={uploading}>
        <Upload
          beforeUpload={beforeUpload}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
        >
          <img src={value} alt="摄影师图片" style={{ width: '100%' }} />
        </Upload>
      </Spin>
    );
  }
}

export default UploadPic;
