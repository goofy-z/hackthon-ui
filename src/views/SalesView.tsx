'use client';

import { Collapse, Layout, Drawer, Space, Typography, Divider, Table, Tag, Image, List, Avatar, Card } from 'antd';
import { FC, useEffect, useState } from "react"
import { Tiny } from '@ant-design/plots';
import Icon, { VerticalLeftOutlined } from '@ant-design/icons';
import {ListHakkelaiApi} from "@/actions/template.action"
import type { TableProps } from 'antd';
interface IProps { }
const { Meta } = Card;
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
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

interface DataType2 {
  key: number;
  title: string;
  date: string;
  age: string;
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
  }
];

const columns2: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'title',
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
  }
];

const data: DataType[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const data1 = [
  ["10.3%", "20.2%"],
  ["-14.3%", "17.3%"],
  ["-20.7%", "19.7%"],
  ["30.3%", "33.6%"],
  ["-1.4%", "-16.8%"],
  ["17.1%", "31.6%"],
  ["-6.8%", "39.7%"],
  ["20.6%", "-5.2%"],
  ["11.9%", "-6.1%"],
  ["40.2%", "12.8%"],
]

const hangyezhengce = [
  {
    key: 1,
    title: 'Ant Design Title 1',
    age: '黎巴嫩通信设备爆炸事件后，中东电子订单并未大规模转向中国大陆。传言称因安全原因订单转移，华强北对讲机询价增加，但实际订单未见显著变化。尽管如此，海能达股价因可能受益于订单转移大幅上涨。华强北和泉州的对讲机生产并未明显增加订单。中东电子工业薄弱，主要依赖进口，中国仍是主要的出口国，但市场影响有限。',
    date: "2024/10/12",
    new_source: "界面新闻",
    tags: ["通讯电子产品"],
  },
  {
    key: 2,
    title: 'Ant Design Title 1',
    age: '黎巴嫩通信设备爆炸事件后，中东电子订单并未大规模转向中国大陆。传言称因安全原因订单转移，华强北对讲机询价增加，但实际订单未见显著变化。尽管如此，海能达股价因可能受益于订单转移大幅上涨。华强北和泉州的对讲机生产并未明显增加订单。中东电子工业薄弱，主要依赖进口，中国仍是主要的出口国，但市场影响有限。',
    date: "2024/10/12",
    new_source: "界面新闻",
    tags: ["通讯电子产品"],
  },
  {
    key: 3,
    title: 'Ant Design Title 1',
    age: '黎巴嫩通信设备爆炸事件后，中东电子订单并未大规模转向中国大陆。传言称因安全原因订单转移，华强北对讲机询价增加，但实际订单未见显著变化。尽管如此，海能达股价因可能受益于订单转移大幅上涨。华强北和泉州的对讲机生产并未明显增加订单。中东电子工业薄弱，主要依赖进口，中国仍是主要的出口国，但市场影响有限。',
    date: "2024/10/12",
    new_source: "界面新闻",
    tags: ["通讯电子产品"],
  }
];

const columnszhengce: ColumnsType<DataType2> = [
  {
    title: '新闻标题',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '新闻概要',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '新闻来源',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '行业',
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
  {
    title: '新闻日期',
    dataIndex: 'date',
    key: 'date',
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
  const [open, setOpen] = useState(false);
  const [firm, setFirm] = useState(-1);
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = (k: number) => {
    setFirm(k)
    setOpen(true);
  };
  let new_column = [...columns]
  new_column.push(
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link onClick={() => {showDrawer(record.key)}} key={`a-${record.key}`}>
                  详情
                </Typography.Link>
        </Space>
      ),
    }
  )

  const config = {
    // percent: 0.7,
    width: 220,
    height: 220,
    color: ['#E8EFF5', '#66AFF4'],
    annotations: [
      {
        type: 'text',
        style: {
          // text: `${0.7 * 100}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return <>
    <Layout
          style={{ padding: '5px 0', width: "98%", height: "100%"}}
          hasSider={true}
        >
          <Layout className='tw-flex' style={{ padding: '5px 0', width: "100%"}}>
          <Table<DataType>
                    pagination={false}
                    showHeader={false}
                    columns={new_column}
                    dataSource={data}
                    bordered
                    title={() => 'Header'}
                  />
            <Drawer width={"70% "} placement="right" closable={false} onClose={onClose} open={open}>
              <Divider></Divider>
              <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{ key: '1', label: '收款环比走势', 
                  children: 
                  <div className='tw-flex tw-justify-between' style={{width: "100%", }}>
                    <Card title="月度变化" style={{marginLeft: "20%", fontSize: 40}}> {data1[firm-1] ? data1[firm-1][0] : 0}
                    </Card>
                    <Card title="季度变化" style={{marginRight: "20%", fontSize: 40}}
                    >{data1[firm-1] ? data1[firm-1][0] : 0}
                    </Card>
                  </div>
                }]}
                />
              <Divider></Divider>
              <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{ key: '1', label: '近期汇率走势', children: 
                  <div className='tw-flex tw-justify-between'>
                  <Image
                    preview={false}
                    width={650}
                    height={300}
                    style={{padding: "0 10px"}}
                    src={`/statics/sales/firm${firm}-1-1.png`}
                  />
                  {
                    firm < 5 ? <Image
                    preview={false}
                    width={650}
                    height={300}
                    style={{padding: "0 10px"}}
                    src={`/statics/sales/firm${firm}-1-2.png`}
                  /> : null
                  }
                  
                  </div>

              }]}
              />
              <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{ key: '1', label: '出口现状分析', children: 
                  <>
                  <div className='tw-flex tw-justify-between'>
                  {
                    firm < 5 ? <>
                    <Image
                      preview={false}
                      width={650}
                      height={300}
                      style={{padding: "0 10px"}}
                      src={`/statics/sales/firm1-2-1.png`}
                    />
                    <Image
                    preview={false}
                    width={650}
                    height={300}
                    style={{padding: "0 10px"}}
                    src={`/statics/sales/firm1-2-2.png`}
                  />
              
                    </> : null
                  }
                  </div>
                  <div className='tw-flex tw-justify-between'>
                  {
                    firm < 5 ? <>
                    <Image
                      preview={false}
                      width={650}
                      height={300}
                      style={{padding: "0 10px"}}
                      src={`/statics/sales/firm1-2-1.png`}
                    />
                    <Image
                    preview={false}
                    width={650}
                    height={300}
                    style={{padding: "0 10px"}}
                    src={`/statics/sales/firm1-2-2.png`}
                  />
              
                    </> : null
                  }
                  </div>
                  </>
                  
              }]}
              />
              
              
            <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{ key: '1', label: '行业政策+动向解读', children: 
                  <Table<DataType2>
                    pagination={false}
                    showHeader={false}
                    columns={columnszhengce}
                    dataSource={hangyezhengce}
                    bordered
                    title={() => 'Header'}
                  />

              }]}
              />

              <Divider>XT福利+动态</Divider>
              <List
                
                itemLayout="horizontal">
                  <List.Item.Meta
                    title={<><Typography.Link>10月大礼包来了！结汇手续费降低10%，速来结汇！</Typography.Link><span style={{marginLeft: "20px"}}> ——2024.10.01</span></>}>
                  </List.Item.Meta>
                  <List.Item.Meta
                    description={<><Typography.Link>仅此一天！开户大礼包来了~20240927开户礼包大放送，开户即享1个月结汇手续费全免</Typography.Link><span style={{marginLeft: "20px"}}> ——2024.10.30</span></>}
                  />
                  <List.Item.Meta
                    description={<><Typography.Link>9月黄金周，优惠多多！20240901-20240907，在此期间结汇享手续费6折，更有邀好友享豪礼，最高可享3400元权益包！</Typography.Link><span style={{marginLeft: "20px"}}> ——2024.09.01</span></>}
                  />
                  <List.Item.Meta
                    description={<><Typography.Link>XT参展136届广交会，12.5万名境外采购商预注册，XT带着全新升级的产品服务、新的重磅惊喜福利来了！</Typography.Link><span style={{marginLeft: "20px"}}> ——2024.10.17</span></>}
                  />
                  <List.Item.Meta
                    description={<><Typography.Link>2024香港金融科技周，XT将以银级赞助商身份参与！XT期待在此展会上与广大参会者深入交流，并展示我们的创新产品与服务</Typography.Link><span style={{marginLeft: "20px"}}> ——2024.10.01</span></>}
                  />
                </List>
                <Divider>XT技术革新</Divider>
                <List
                
                itemLayout="horizontal" className='tw-flex'>
                  <List.Item.Meta
                    title={<><Typography.Link>OCR识别全新升级！支持越南语等小语种，快来试试吧</Typography.Link><span style={{marginLeft: "20px"}}>—— 2024.09.08</span></>}>
                  </List.Item.Meta>
                  <List.Item.Meta
                    title={<><Typography.Link>大模型加持，风控审核提速！</Typography.Link><span style={{marginLeft: "20px"}}>—— 2024.09.08</span></>}
                  />
                  <List.Item.Meta
                    title={<><Typography.Link>你要的外贸百事通来了，XTransfer自研的外贸金融大模型TradePilot宣布成功落地</Typography.Link><span style={{marginLeft: "20px"}}>—— 2024.08.17</span></>}
                  />
                </List>
            </Drawer>

          </Layout>
          <Layout style={{ padding: '5px 0', background: "#ffffff"}}>
            
        </Layout>
    </Layout>
  </>
};

export default SalesView
