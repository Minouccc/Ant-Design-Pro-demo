import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Pagination, Row, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import './index.less';

const Index = () => {
  const [page, setPage] = useState(1);
  const [perPage, setperPage] = useState(10);
  const init = useRequest<{ data: BasicListApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${perPage}`,
  );
  useEffect(() => {
    init.run();
  }, [page, perPage]);
  const paginationChangeHandler = (_page, _perPage) => {
    setPage(_page);
    setperPage(_perPage);
  };
  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className="tableToolbar">
          <Space>
            <Button type="primary">add</Button>
            <Button type="primary">add2</Button>
          </Space>
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
  const batchToolbar = () => {};
  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          dataSource={init?.data?.dataSource}
          columns={init?.data?.layout?.tableColumn.filter((item) => {
            return item.hideInColumn !== true;
          })}
          pagination={false}
        />
        {afterTableLayout()}
      </Card>
      {batchToolbar()}
    </PageContainer>
  );
};

export default Index;
