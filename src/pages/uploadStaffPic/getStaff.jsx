import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { Table, Space, Button, Image } from 'antd';

class GetStaff extends Component {
  constructor(...args) {
    super(...args);

    this.getAllStaff = this.getAllStaff.bind(this);

    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
      },
      {
        title: '员工姓名',
        dataIndex: 'staffName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '员工简介',
        dataIndex: 'information',
      },
      {
        title: '头像',
        dataIndex: 'staffPicUrl',
        render: (text, record) => {
          return <Image width={200} src={record.staffPicUrl} />;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <Button
                type="primary"
                shape="round"
                onClick={() => {
                  history.push({
                    pathname: '/uploadStaffPic/manage',
                    query: {
                      valueIndex: index,
                      value: this.props.staff.staffList[index],
                    },
                  });
                }}
              >
                查看详情
              </Button>
            </Space>
          );
        },
      },
    ];

    this.state = {};
  }

  componentDidMount() {
    this.getAllStaff();
  }

  getAllStaff() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/getStaff',
    });
  }

  render() {
    const { staff } = this.props;
    const { staffList } = staff;
    return (
      <PageContainer>
        <Table columns={this.columns} dataSource={staffList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, staff }) => ({
  userLogin: login,
  loading,
  staff,
}))(GetStaff);
