'use client'

import type { TableProps } from 'antd';
import { Button, Avatar, Layout, List, Tag, Table, Divider, Col, Space} from "antd"
import { FC, useEffect, useState } from "react"
import { ProChat } from '@ant-design/pro-chat';

interface IProps { }
type ColumnsType<T extends object> = TableProps<T>['columns'];

const ZhaiyaoView: FC<IProps> = ({ }) => {
  const [timeCounter2, setTimeCounter2] = useState<number>(0)
  const [aixiaojie, setAIxiaojie] = useState<Array<any>>([])

  const [timeCounter, setTimeCounter] = useState<number>(0)
  useEffect(() => {
    function tick() {
      setTimeCounter((v) => v + 1)
    }
    const intervalTick = setInterval(tick, 1000)
    return () => {
      clearInterval(intervalTick)
    }
  }, [])
   
  
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

  // 预设的对话内容
  const messages = [
    {
      id: 1,
      content: '老板，你好',
      isAI: false,
    },
    {
      id: 2,
      content: '很高兴为你服务，请问有什么可以帮助你的？',
      isAI: true,
    },
    {
      id: 3,
      content: '很高兴为你服务，请问有什么可以帮助你的？',
      isAI: false,
    },
    {
      id: 4,
      content: '很高兴为你服务，请问有什么可以帮助你的？',
      isAI: true,
    },
    {
      id: 5,
      content: '很高兴为你服务，请问有什么可以帮助你的？',
      isAI: false,
    },
    {
      id: 6,
      content: '很高兴为你服务，请问有什么可以帮助你的？',
      isAI: true,
    },
    {
      id: 7,
      content: '很高兴为你服务，请问有什么可以帮助你的？',
      isAI: false,
    },
    {
      id: 8,
      content: '很高兴为你服务，请问有什么可以帮助你的？',
      isAI: false,
      isEnd: true
    }
    // ... 更多预设对话内容
  ];
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return <>
    <Layout className="tw-flex"
          style={{ padding: '5px 0', width: "100%", height: "100%", marginBottom: "10"}}
          hasSider={true}
        >
          <Layout style={{ padding: '5px 0', marginBottom: "10"}}>
            <Table<DataType>
                  rowSelection={{}}
                  pagination={false}
                  columns={columns}
                  dataSource={data}
                  bordered
                />
            <Divider></Divider>
            <ProChat
              style={{ height: "100%" }}
              helloMessage={
                '欢迎使用 ProChat ，我是你的专属机器人'
              }
              request={async (messages) => {
                const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
                return new Response(mockedData);
              }}
            />
          </Layout>
    </Layout>
  </>
}

export default ZhaiyaoView
