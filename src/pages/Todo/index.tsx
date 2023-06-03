import { add, deleteItem, edit } from '@/services/ant-design-pro/todo';
import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from '@umijs/max';
import { Alert, Button, message, Modal } from 'antd';
import { useEffect, useState } from 'react';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todoList, getTodoList } = useModel('todo', (model) => ({
    todoList: model.todoList,
    getTodoList: model.getTodoList,
  }));
  useEffect(() => {
    getTodoList();
  }, []);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePorm = async (value: any) => {
    const res = await add(value);
    if (res.status === '200') {
      getTodoList();
      setIsModalOpen(false);
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };
  const changeStatus = async (id, status) => {
    const res = await edit({ id, status });
    if (res.status === '200') {
      getTodoList();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };
  const handleDelete = async (id) => {
    const res = await deleteItem({ id });
    if (res.status === '200') {
      getTodoList();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };
  const status = [
    <Alert key="0" message="代办" type="info" showIcon />,
    <Alert key="1" message="已完成" type="success" showIcon />,
    <Alert key="2" message="已取消" type="error" showIcon />,
  ];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        return status[record.status];
      },
    },
    {
      title: '修改状态',
      render: (_, record) => {
        let editOpenation = [];
        if (record.status !== '0') {
          editOpenation.push(
            <a
              key="0"
              onClick={() => {
                changeStatus(record.id, 0);
              }}
            >
              {' '}
              代办
            </a>,
          );
        }
        if (record.status !== '1') {
          editOpenation.push(
            <a
              key="1"
              onClick={() => {
                changeStatus(record.id, 1);
              }}
            >
              {' '}
              完成
            </a>,
          );
        }
        if (record.status !== '2') {
          editOpenation.push(
            <a
              key="2"
              onClick={() => {
                changeStatus(record.id, 2);
              }}
            >
              {' '}
              取消
            </a>,
          );
        }
        return editOpenation;
      },
    },
    {
      title: '删除',
      dataIndex: 'delete',
      render: (_, record) => {
        return (
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            删除
          </Button>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        columns={columns}
        search={false}
        dataSource={todoList}
        // request={async () => ({ data: await getTodoLists() })}
        dateFormatter="string"
        headerTitle="代办事项列表"
        toolBarRender={() => [
          <Button
            key="show"
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <ProForm
          onFinish={(value) => {
            handlePorm(value);
          }}
        >
          <ProFormText name="todo" label="代办事项" rules={[{ required: true }]} />
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default Index;
