'use client';

import { Collapse, Layout, Space, Col, Card, Divider, Table, Tag, Image, List, Avatar } from 'antd';
import { FC, useEffect, useState } from "react"
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

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));


const YinGuoView: FC<IProps> = ({ }) => {

  return <>
    <Layout
          style={{ padding: '5px 0', width: "98%", height: "100%"}}
          hasSider={true}
        >
          <Layout className='tw-flex' style={{ padding: '5px 0', marginRight: "20px",  background: "#ffffff", width: "50%"}}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={data}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(item) => (
              <List.Item
                key={item.title}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />

          </Layout>
          <Layout style={{ padding: '5px 0', background: "#ffffff", width: "50%"}}>
            
        </Layout>
    </Layout>
  </>
};

export default YinGuoView
