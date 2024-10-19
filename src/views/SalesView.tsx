'use client';

import { Collapse, Layout, Row, Col, Card, Divider, Table, Tag, Image, List, Avatar } from 'antd';
import { FC, useEffect, useState } from "react"
import {ListHakkelaiApi} from "@/actions/template.action"
import type { TableProps } from 'antd';
interface IProps { }

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type ColumnsType<T extends object> = TableProps<T>['columns'];
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition<T extends object> = NonNullable<
  TablePagination<T>['position']
>[number];


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const data3 = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const SalesView: FC<IProps> = ({ }) => {
  useEffect(() => {
    const controller = new AbortController();
    // 假设 ListMetaApi 是一个返回 Promise 的函数
    ListHakkelaiApi("d").payload.then((r) => {
      console.log(r);
    });
    return () => {
      controller.abort();
    };
  }, []); // 空依赖数组确保这个 effect 只在组件挂载时运行一次

  return <>
    <Layout
          style={{ padding: '5px 0', width: "98%", height: "100%"}}
          hasSider={true}
        >
          <Layout className='tw-flex' style={{ padding: '5px 0', width: "100%"}}>
            <Row gutter={48}>
              <Col span={8}>
                <Card title="Card title" bordered={true}>
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
            </Row>
            <Divider></Divider>
            <Collapse
              defaultActiveKey={['1']}
              ghost
              items={[{ key: '1', label: '第一列', 
                children: 
                <Table<DataType>
                  pagination={false}
                  showHeader={false}
                  columns={columns}
                  dataSource={data}
                  bordered
                  title={() => 'Header'}
                /> }]}
              />
            <Divider></Divider>
            <Collapse
              defaultActiveKey={['1']}
              ghost
              items={[{ key: '1', label: '第二列', children: 
                <div className='tw-flex tw-justify-between'>
                <Image
                  preview={false}
                  width={650}
                  height={300}
                  style={{padding: "0 10px"}}
                  src="/statics/pic1.png"
                />
                <Image
                  preview={false}
                  width={650}
                  height={300}
                  style={{padding: "0 10px"}}
                  src="/statics/pic3.png"
                />
                <Image
                  preview={false}
                  width={650}
                  height={300}
                  style={{padding: "0 10px"}}
                  src="/statics/pic2.png"
                />
                <Image
                  preview={false}
                  width={650}
                  height={300}
                  style={{padding: "0 10px"}}
                  src="/statics/pic4.png"
                />
                </div>
            }]}
            />
            <Divider></Divider>
            <Collapse
              ghost
              items={[{ key: '1', label: '第三列', children: 
                <List
                  itemLayout="horizontal"
                  dataSource={data3}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                    </List.Item>
                  )}
                />
            
            }]}
            />

          </Layout>
          <Layout style={{ padding: '5px 0', background: "#ffffff"}}>
            
        </Layout>
    </Layout>
  </>
};

export default SalesView
