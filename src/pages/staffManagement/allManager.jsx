import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';

class StaffManagemanet extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <PageContainer>
        <div>asd</div>
      </PageContainer>
    );
  }
}

// export default StaffManagemanet;

export default connect(({ login, loading }) => ({
  userLogin: login,
  loading,
}))(StaffManagemanet);
