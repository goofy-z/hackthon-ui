'use client';

import { Layout, Row, Col, Card, Divider, Drawer, Tag, Flex, List, Avatar, Button, Image } from 'antd';
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


const shangji = [
  {
    "title": "深圳市众航电子有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(半导体)",
    "tag2": "出口国家(日本)"
  },
  {
    "title": "广州优浦手机配件有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(手机)",
    "tag2": "出口国家(黎巴嫩)"
  },
  {
    "title": "大连光亚食品有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(食品)",
    "tag2": "出口国家(韩国)"
  },
  {
    "title": "深圳市众航电子有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(半导体)",
    "tag2": "出口国家(日本)"
  },
  {
    "title": "广州优浦手机配件有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(手机)",
    "tag2": "出口国家(黎巴嫩)"
  },
  {
    "title": "大连光亚食品有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(食品)",
    "tag2": "出口国家(韩国)"
  }
]

const fenxian = [
  {
    "title": "深圳市伊维尔科技有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "title": "义乌玩美装饰材料有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "title": "中山市方晟照明电器有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "title": "深圳市伊维尔科技有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "title": "义乌玩美装饰材料有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "title": "中山市方晟照明电器有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
]

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
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  return <>
    <Layout
          style={{ padding: '5px 0', width: "98%", height: "100%"}}
          hasSider={true}
        >
          <Layout className='tw-flex' style={{ padding: '5px 0', marginRight: "20px", width: "50%"}}>
          <div className='tw-text-center' style={{width: "100%", borderRadius: "10px", color:"#ffffff", marginBottom: "40px", background: "rgb(66, 144, 232)", textAlign: "center", fontSize: 30}}>商机发现</div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={shangji}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                style={{marginBottom: "20px", borderRadius: "10px", background: "#ffffff"}}
                extra={
                  <Button>查看商机</Button> 
                }
              >
                <List.Item.Meta
                  avatar={<Avatar size={"large"} src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' />}
                  title={<a href={item.title}>{item.title}</a>}
                  description={item.desc}
                />
                <Flex gap="4px 0" wrap>
                  <Tag color="green">{item.tag1}</Tag>
                  <Tag color="green">{item.tag2}</Tag>
                </Flex>
              </List.Item>
            )}
          />

          </Layout>
          <Layout style={{ padding: '5px 0', width: "50%"}}>
          <div className='tw-text-center' style={{width: "100%", borderRadius: "10px", color:"#ffffff", marginBottom: "40px", background: "rgb(224, 54, 153)", textAlign: "center", fontSize: 30}}>风险提示</div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={fenxian}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                style={{marginBottom: "20px", borderRadius: "10px", background: "#ffffff"}}
                extra={
                  <Button type='primary' onClick={() => {showDrawer()}}>添加待办</Button> 
                }
              >
                <List.Item.Meta
                  avatar={<Avatar size={"large"} src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' />}
                  title={<a href={item.title}>{item.title}</a>}
                  description={item.desc}
                />
                <Flex gap="4px 0" wrap>
                  <Tag color="red">{item.tag1}</Tag>
                  <Tag color="red">{item.tag2}</Tag>
                  <Tag color="red">{item.tag3}</Tag>
                  <Tag color="red">{item.tag4}</Tag>
                  <Tag color="red">{item.tag5}</Tag>
                </Flex>
              </List.Item>
            )}
          />
          
        </Layout>
    </Layout>
    <Drawer width={"55% "} placement="left" closable={false} onClose={onClose} open={open}>
    <Row gutter={16}>
      <Col span={12}>
        <Card
          actions={[
            <Button >忽略</Button>,
            <Button >跟进</Button> 
            
          ]}
          hoverable
          style={{ width: "100%" }}
          title="买家数"
          
        >
          <Image style={{width: "100%", height: "100%"}} src="/statics/fenxian/maijiashu.png" />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          actions={[
            <Button >忽略</Button>,
            <Button >跟进</Button> 
            
          ]}
          hoverable
          style={{ width: "100%" }}
          title="平均入账时效（小时）"
          
        >
          <Image style={{width: "100%"}} src="/statics/fenxian/ruzhang.png" />
        </Card>
      </Col>
    </Row>
      <Divider></Divider>
      <Row gutter={16}>
      <Col span={12}>
        <Card
          actions={[
            <Button >忽略</Button>,
            <Button >跟进</Button> 
            
          ]}
          hoverable
          style={{ width: "100%" }}
          title="收款驳回数"
          
        >
          <Image style={{width: "100%", height: "100%"}} src="/statics/fenxian/shoukuan.png" />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          actions={[
            <Button >忽略</Button>,
            <Button >跟进</Button> 
            
          ]}
          hoverable
          style={{ width: "100%" }}
          title="跟进电话数"
          
        >
          <Image style={{width: "100%"}} src="/statics/fenxian/dianhua.png" />
        </Card>
      </Col>
    </Row>
    <Divider></Divider>
      <Row gutter={16}>
      <Col span={12}>
        <Card
          actions={[
            <Button >忽略</Button>,
            <Button >跟进</Button> 
            
          ]}
          hoverable
          style={{ width: "100%" }}
          title="结汇手续费率"
          
        >
          <Image style={{width: "100%"}} src="/statics/fenxian/jiehui.png" />
        </Card>
      </Col>
    </Row>
    </Drawer>
  </>
};

export default YinGuoView
