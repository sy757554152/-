import React, { Component, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Space, Button, Modal } from 'antd';
import FormTable from './table';

const ChangeModel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { dispatch, form = {}, valueIndex } = props;
    const { callList = [] } = form;
    const value = callList[valueIndex];
    dispatch({
      type: 'form/deleForm',
      payload: { value },
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" shape="round" danger onClick={showModal}>
        删除
      </Button>
      <Modal title="删除提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>是否标记为已联系？</p>
      </Modal>
    </>
  );
};

class ShouldCalled extends Component {
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
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <ChangeModel valueIndex={index} {...this.props} />
            </Space>
          );
        },
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
        type: false,
      },
    });
  }

  render() {
    const { form = {} } = this.props;
    const { callList = [] } = form;
    return (
      <PageContainer>
        <FormTable columns={this.columns} dataSource={callList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, user, form }) => ({
  userLogin: login,
  loading,
  user,
  form,
}))(ShouldCalled);
