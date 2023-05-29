import { ExclamationCircleFilled } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Card, Col, message, Modal as AntdModal, Pagination, Row, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import ActionBuilder from './builder/ActionBuilder';
import ColumnBuilder from './builder/ColumnBuilder';
import Modal from './component/Modal';
import './index.less';

const Index = () => {
  const [page, setPage] = useState(1);
  const [perPage, setperPage] = useState(10);
  const [sortQuery, setSortQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setselectedRows] = useState([]);
  const [tableColumns, setTableColumns] = useState<BasicListApi.Field[]>([]);
  const init = useRequest<{ data: BasicListApi.ListData }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${perPage}${sortQuery}`,
  );
  const request = useRequest(
    (values: any) => {
      const { uri, method, ...formValues } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...formValues,
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success({
          content: data.message,
          key: 'process',
        });
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );
  const { confirm } = AntdModal;
  useEffect(() => {
    init.run();
  }, [page, perPage, sortQuery]);

  const paginationChangeHandler = (_page: any, _perPage: any) => {
    setPage(_page);
    setperPage(_perPage);
  };
  const tableChangeHandler = (_: any, __: any, sorter: any) => {
    if (sorter.order === undefined) {
      setSortQuery('');
    } else {
      const orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSortQuery(`&sort=${sorter.field}&order=${orderBy}`);
    }
  };
  const searchLayout = () => {
    return (
      <Col xs={24} sm={12}>
        ...
      </Col>
    );
  };
  const batchOverview = () => {
    return (
      <Table
        size="small"
        rowKey="id"
        columns={[tableColumns[0] || {}, tableColumns[1] || {}]}
        dataSource={selectedRows}
        pagination={false}
      />
    );
  };
  function actionHandler(action: BasicListApi.Action, record: any) {
    switch (action.action) {
      case 'modal':
        setModalUrl(
          action.uri?.replace(/:\w+/g, (field) => {
            return record[field.replace(':', '')];
          }) as string,
        );
        setIsModalOpen(true);
        break;
      case 'reload':
        init.run();
        break;
      case 'delete':
        confirm({
          title: 'Are you sure delete this task?',
          icon: <ExclamationCircleFilled />,
          content: batchOverview(),
          okText: 'Sure to delete !!!',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            return request.run({
              uri: action.uri,
              method: action.method,
              type: 'delete',
              ids: selectedRowKeys,
            });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      default:
        break;
    }
  }
  useEffect(() => {
    if (init?.data?.layout?.tableColumn) {
      setTableColumns(ColumnBuilder(init?.data?.layout?.tableColumn, actionHandler));
    }
  }, [init?.data?.layout?.tableColumn]);
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className="tableToolbar">
          <Space>{ActionBuilder(init.data?.layout.tableToolBar, actionHandler)}</Space>
        </Col>
      </Row>
    );
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>

        <Col xs={24} sm={12} className="tableToolbar">
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={20}
            defaultCurrent={1}
            onChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };
  const hideModal = (reload = false) => {
    setIsModalOpen(false);
    if (reload) {
      init.run();
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: any, _selectedRows: any) => {
      setSelectedRowKeys(_selectedRowKeys);
      setselectedRows(_selectedRows);
    },
  };
  const batchToolbar = () => {
    return (
      selectedRowKeys.length > 0 && (
        <Space>{ActionBuilder(init?.data?.layout?.batchToolBar, actionHandler)}</Space>
      )
    );
  };
  return (
    <>
      <PageContainer>
        {searchLayout()}
        <Card>
          {beforeTableLayout()}
          <Table
            rowKey="id"
            dataSource={init?.data?.dataSource}
            columns={tableColumns}
            pagination={false}
            onChange={tableChangeHandler}
            rowSelection={rowSelection}
          />
          {afterTableLayout()}
        </Card>
        <Modal isModalOpen={isModalOpen} modalUrl={modalUrl} hideMoal={hideModal} />
        <FooterToolbar extra={batchToolbar()} />
      </PageContainer>
    </>
  );
};

export default Index;
