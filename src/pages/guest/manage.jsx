import React, { Component, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { Table, Space, Button, Modal, Image, Form, Select, Row, Col, message } from 'antd';
import UploadPic from '@/components/UploadPic/index';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const Delemodel = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { dispatch, guest = {}, valueIndex, history: historyValue } = props;
    const { location = {} } = historyValue;
    const { query = {} } = location;
    const { value: val = {} } = query;
    const { userId } = val;
    const { guestList = [] } = guest;
    const value = guestList[valueIndex];
    dispatch({
      type: 'guest/deleGuest',
      payload: { value, userId },
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
        <p>是否删除该图片？</p>
      </Modal>
    </>
  );
};

const { Option } = Select;

const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const { dispatch, history: historyValue, type = {} } = props;
  const { location = {} } = historyValue;
  const { query = {} } = location;
  const { value = {} } = query;
  const { userId } = value;
  const { pictureType = [] } = type;
  const onFinish = (values) => {
    dispatch({
      type: 'guest/searchGuest',
      payload: {
        ...values,
        userId,
      },
    });
  };
  const onReset = () => {
    dispatch({
      type: 'guest/getGuest',
      payload: {
        userId,
      },
    });
    form.resetFields();
  };

  return (
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Row gutter={24}>
        <Col span={10}>
          <Form.Item
            name="picType"
            label="图片类型"
            rules={[{ required: true, message: '请选择图片类型' }]}
          >
            <Select>
              {pictureType.map((item, idx) => (
                <Option key={idx} value={item.typeId}>
                  {item.typeName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button
            type="primary"
            shape="round"
            style={{ marginBottom: 15 }}
            danger
            onClick={() => {
              history.push({
                pathname: '/guest/upload',
                query: {
                  value: { userId },
                },
              });
            }}
          >
            添加客片
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

class ManageGuest extends Component {
  constructor(...args) {
    super(...args);
    const ChangePic = (props) => {
      const [isModalVisible, setIsModalVisible] = useState(false);

      const showModal = () => {
        const { guest, valueIndex } = props;
        const { guestList = [] } = guest;
        const information = guestList[valueIndex];
        const { picCompressUrl } = information;
        this.setState({
          imageUrl: picCompressUrl,
        });
        setIsModalVisible(true);
      };

      const handleOk = () => {
        const { fileList } = this.state;
        const { dispatch } = this.props;
        const { guest, valueIndex } = props;
        const { guestList = [] } = guest;
        const information = guestList[valueIndex];
        const { guestId, userId, picUrl, picCompressUrl } = information;
        let isPicChange = false;
        if (fileList.length !== 0) {
          isPicChange = true;
        }
        const fs = new FormData();
        this.setState({
          uploading: true,
        });
        fs.append('guestId', guestId);
        fs.append('userId', userId);
        fs.append('picUrl', picUrl);
        fs.append('picCompressUrl', picCompressUrl);
        fs.append('isPicChange', isPicChange);
        if (isPicChange) {
          const [file] = fileList;
          fs.append('file', file);
        }
        dispatch({
          type: 'guest/changeGuest',
          payload: {
            fs,
            userId,
          },
          callback: (res) => {
            if (res) {
              setIsModalVisible(false);
              this.setState({
                uploading: false,
              });
            } else {
              this.setState({
                uploading: false,
              });
            }
          },
        });
      };

      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
          return false;
        }
        getBase64(file, (imageUrl) => {
          this.setState({
            fileList: [file],
            imageUrl,
            uploading: false,
          });
        });
        return false;
      };

      const params = {
        value: this.state.imageUrl,
        uploading: this.state.uploading,
        beforeUpload,
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };

      return (
        <>
          <Button type="primary" shape="round" onClick={showModal}>
            替换图片
          </Button>
          <Modal
            title="替换图片提示"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <UploadPic {...params} />
          </Modal>
        </>
      );
    };

    this.getAllGuestPic = this.getAllGuestPic.bind(this);
    this.getPicType = this.getPicType.bind(this);

    this.columns = [
      {
        title: '图片序号',
        dataIndex: 'key',
      },
      {
        title: '图片类型',
        dataIndex: 'typeName',
      },
      {
        title: '摄影师',
        dataIndex: 'staffName',
      },
      {
        title: '客户姓名',
        dataIndex: 'userName',
      },
      {
        title: '图片',
        dataIndex: 'picCompressUrl',
        render: (text, record) => {
          return <Image width={200} src={record.picCompressUrl} />;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <ChangePic valueIndex={index} {...this.props} />
              <Delemodel valueIndex={index} {...this.props} />
            </Space>
          );
        },
      },
    ];

    this.state = {
      fileList: [],
      uploading: false,
    };
  }

  componentDidMount() {
    this.getAllGuestPic();
    this.getPicType();
  }

  getAllGuestPic() {
    const { dispatch, history: historyValue = {} } = this.props;
    const { location = {} } = historyValue;
    const { query = {} } = location;
    const { value = {} } = query;
    const { userId } = value;
    dispatch({
      type: 'guest/getGuest',
      payload: {
        userId,
      },
    });
  }

  getPicType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/getType',
      payload: {
        type: 'picture',
      },
    });
  }

  render() {
    const { guest } = this.props;
    const { guestList } = guest;
    return (
      <PageContainer>
        <RegistrationForm {...this.props} />
        <Table columns={this.columns} dataSource={guestList} />
      </PageContainer>
    );
  }
}

export default connect(({ login, loading, guest, type }) => ({
  userLogin: login,
  loading,
  guest,
  type,
}))(ManageGuest);
