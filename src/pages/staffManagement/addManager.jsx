import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import RegistrationForm from './form';

class StaffManagemanet extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const { ...rest } = this.props;
    return (
      <PageContainer>
        <RegistrationForm {...rest} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading }) => ({
  userLogin: login,
  loading,
}))(StaffManagemanet);
