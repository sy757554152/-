import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Form, Input, Button, Space, Select, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

class Detail extends Component {
  constructor(...args) {
    super(...args);

    this.getStaff = this.getStaff.bind(this);
    this.onFinish = this.onFinish.bind(this);

    this.state = {};
  }

  componentDidMount() {
    this.getStaff();
  }

  onFinish(values) {
    const { dispatch, history } = this.props;
    const { location = {} } = history;
    const { query = {} } = location;
    const { value = {} } = query;
    const { userId } = value;
    const { date, phone, sex, userName, work } = values;
    const dateValue = moment(date).format('YYYY-MM-DD');
    dispatch({
      type: 'guest/changeUser',
      payload: {
        userId,
        phone,
        sex,
        userName,
        work,
        date: dateValue,
      },
    });
  }

  getStaff() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/getStaff',
    });
  }

  render() {
    const { staff = {}, history: historyValue } = this.props;
    const { staffList = [] } = staff;
    const { location = {} } = historyValue;
    const { query = {} } = location;
    const { value = {} } = query;
    return (
      <PageContainer>
        <Form
          name="user"
          initialValues={value}
          onFinish={this.onFinish}
          autoComplete="off"
          style={{ width: 700, margin: '0 auto' }}
        >
          <Form.Item
            name="userName"
            label="客户姓名"
            rules={[{ required: true, message: '请输入员工姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sex"
            label="客户性别"
            rules={[{ required: true, message: '请选择客户性别' }]}
          >
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入员工姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="拍摄日期"
            rules={[{ required: true, message: '请选择拍摄日期' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.List name="work">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      label="工作人员类型"
                      name={[field.name, 'title']}
                      fieldKey={[field.fieldKey, 'title']}
                      rules={[{ required: true, message: '请选择工作人员类型' }]}
                    >
                      <Select style={{ width: 150 }}>
                        <Option key={1} value="摄影师">
                          摄影师
                        </Option>
                        <Option key={2} value="化妆师">
                          化妆师
                        </Option>
                        <Option key={3} value="接待">
                          接待
                        </Option>
                        <Option key={4} value="选片师">
                          选片师
                        </Option>
                        <Option key={4} value="修片师">
                          修片师
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="工作人员姓名"
                      name={[field.name, 'staffId']}
                      fieldKey={[field.fieldKey, 'staffId']}
                      rules={[{ required: true, message: '请选择工作人员' }]}
                    >
                      <Select style={{ width: 150 }}>
                        {staffList.map((item, idx) => (
                          <Option key={idx} value={item.staffId}>
                            {item.staffName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加工作人员
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: 80 }}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, guest, staff }) => ({
  userLogin: login,
  loading,
  guest,
  staff,
}))(Detail);
