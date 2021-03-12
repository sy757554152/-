import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';

class Welcome extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return <PageContainer content="欢迎进入麦琪视觉后台管理系统" />;
  }
}

export default connect(({ login, loading }) => ({
  userLogin: login,
  loading,
}))(Welcome);
