import React, { Component } from 'react';
import { Table } from 'antd';

class FormTable extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const { columns, dataSource } = this.props;
    return <Table columns={columns} dataSource={dataSource} />;
  }
}

export default FormTable;
