import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import FormTable from './table';

class AlreadyCall extends Component {
  constructor(...args) {
    super(...args);
    this.getForm = this.getForm.bind(this);
    this.columns = [
      {
        title: '表单编号',
        key: 'formId',
        dataIndex: 'formId',
      },
      {
        title: '用户姓名',
        key: 'customerName',
        dataIndex: 'customerName',
      },
      {
        title: '用户性别',
        key: 'sex',
        dataIndex: 'sex',
      },
      {
        title: '联系方式',
        key: 'customerPhone',
        dataIndex: 'customerPhone',
      },
      {
        title: '预约类型',
        key: 'typeName',
        dataIndex: 'typeName',
      },
    ];

    this.state = {};
  }

  componentDidMount() {
    this.getForm();
  }

  getForm() {
    const { dispatch } = this.props;
    dispatch({
      type: 'form/getForm',
      payload: {
        type: true,
      },
    });
  }

  render() {
    const { form = {} } = this.props;
    const { alreadyList = [] } = form;
    return (
      <PageContainer>
        <FormTable columns={this.columns} dataSource={alreadyList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, user, form }) => ({
  userLogin: login,
  loading,
  user,
  form,
}))(AlreadyCall);
