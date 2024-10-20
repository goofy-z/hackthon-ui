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
    "id": 0,
    "title": "深圳市众航电子有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(半导体)",
    "tag2": "出口国家(日本)"
  },
  {
    "id": 1,
    "title": "广州优浦手机配件有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(手机)",
    "tag2": "出口国家(黎巴嫩)"
  },
  {
    "id": 2,
    "title": "大连光亚食品有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(食品)",
    "tag2": "出口国家(韩国)"
  },
  {
    "id": 3,
    "title": "深圳市众航电子有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(半导体)",
    "tag2": "出口国家(日本)"
  },
  {
    "id": 4,
    "title": "广州优浦手机配件有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(手机)",
    "tag2": "出口国家(黎巴嫩)"
  },
  {
    "id": 5,
    "title": "大连光亚食品有限公司",
    "desc": "行业和出口国家商机",
    "tag1": "行业(食品)",
    "tag2": "出口国家(韩国)"
  }
]

const fenxian = [
  {
    "id": 0,
    "title": "深圳市伊维尔科技有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "id": 1,
    "title": "义乌玩美装饰材料有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "id": 2,
    "title": "中山市方晟照明电器有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "id": 0,
    "title": "深圳市伊维尔科技有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "id": 1,
    "title": "义乌玩美装饰材料有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
  {
    "id": 1,
    "title": "中山市方晟照明电器有限公司",
    "desc": "客户存在留存率下降风险",
    "tag1": "买家数",
    "tag2": "收款驳回数",
    "tag3": "平均入账时效（小时）",
    "tag4": "跟进电话数",
    "tag5": "结汇手续费率"
  },
]

const shangjidesc = [
  `外贸咨询 / 日本 /

连续3个月出现贸易逆差

日本财务省17日公布的初步统计结果显示，由于出口减少和进口增加，日本9月出现贸易逆差2943亿日元（1美元约合144.27日元），连续3个月出现逆差。

数据显示，9月日本出口额为9.04万亿日元，同比下降1.7%。其中，汽车、矿物性燃料、建设用及矿山用机械出口额同比分别下降9.2%、49.8%和33.3%，而半导体等制造设备出口额同比增加26.3%。

当月，日本进口额为9.33万亿日元，同比增长2.1%，连续6个月同比增长。计算机、半导体等电子部件、医药品进口额同比分别增长35.6%、11.4%、9.1%，原油进口额则同比下降10.5%。从国家和地区来看，9月日本对美国、欧盟、中国的出口额同比均有所下降。`,

`将从中国进口手机等电子产品

黎巴嫩多地接连发生通信设备爆炸事件，造成大量人员伤亡。黎巴嫩中国商会主席在接受采访时表示，由于通信设备爆炸的影响，黎巴嫩和许多国家将减少从西方进口科技产品，增加从中国进口包括手机在内的电子产品。`,

`/ 韩国 /

大量进口中国大白菜

韩国大白菜供应紧缺持续，价格居高不下，不少韩国民众直呼“吃不起”。在韩国大量进口中国大白菜的同时，国产泡菜加工企业也积极扩大产能、加大出口规模。在全国重要泡菜出口基地山东青岛平度市，泡菜销售呈现出“产销两旺”的局面。据了解，今年前8个月青岛市泡菜出口17.3万吨，同比增长12.8%，预计今年将向韩国出口泡菜30万吨。`
  
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
  const [open2, setOpen2] = useState(false);
  const [shangjikey, setShangjikey] = useState(0);
  const onClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const showDrawer = () => {
    setOpen(true);
    
  };
  const showDrawer2 = (id: number) => {
    setOpen2(true);
    setShangjikey(id)
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
                  <Button onClick={()=>{showDrawer2(item.id)}}>查看商机</Button>
                }
              >
                <List.Item.Meta
                  avatar={<Avatar size={"large"} src='/statics/商机LOGO.png' />}
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
                  <div>
                    <Button type='primary' onClick={() => {showDrawer()}}>查看详情</Button> 
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={<Avatar size={"large"} src='/statics/fenxian_logo.png' />}
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
    <Drawer width={"45%"} placement="right" closable={false} onClose={onClose} open={open2}>
          <pre style={{wordWrap: "break-word", overflow: "auto", whiteSpace: "pre-wrap"}}>
            {shangjidesc[shangjikey]}
          </pre>
    </Drawer>
    <Drawer width={"55%"} placement="left" closable={false} onClose={onClose} open={open}>
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
          <p><Tag>描述</Tag>：客户每个月付款买家数-每月有多少个不一样的打款账户</p>
          <p><Tag>指标分析</Tag>：客户的收款体量下滑与买家, 数的趋势有强相关性，客户可能存在被竞对切量的风险。</p>
          <p><Tag>辅助</Tag>: 通过电话、微信与客户或团队成员沟通。沟通要点：跟谁比价格高了呢（参照物） 、优质客户可以申请 手续费率调整 。</p>
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
          <p><Tag>描述</Tag>：分月的入账时效-每月（每笔入账资金入账时间-客户发起入账订单关联时间）/ 入账笔数</p>
          <p><Tag>指标分析</Tag>：客户的收款体量下滑与买家, 数的趋势有强相关性，客户可能存在被竞对切量的风险。</p>
          <p><Tag>辅助</Tag>: 通过电话、微信与客户或团队成员沟通。沟通要点：跟谁比价格高了呢（参照物） 、优质客户可以申请 手续费率调整 。</p>
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
          <p><Tag>描述</Tag>：客户每月收款笔数中被风控驳回笔数</p>
          <p><Tag>指标分析</Tag>：客户的收款体量下滑与买家, 数的趋势有强相关性，客户可能存在被竞对切量的风险。</p>
          <p><Tag>辅助</Tag>: 通过电话、微信与客户或团队成员沟通。沟通要点：跟谁比价格高了呢（参照物） 、优质客户可以申请 手续费率调整 。</p>
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
          <p><Tag>描述</Tag>：当月客户被主动外呼次数</p>
          <p><Tag>指标分析</Tag>：客户的收款体量下滑与买家, 数的趋势有强相关性，客户可能存在被竞对切量的风险。</p>
          <p><Tag>辅助</Tag>: 通过电话、微信与客户或团队成员沟通。沟通要点：跟谁比价格高了呢（参照物） 、优质客户可以申请 手续费率调整 。</p>
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
          <p><Tag>描述</Tag>：每月结汇手续费费率（sum每笔结汇费率/sum笔数）</p>
          <p><Tag>指标分析</Tag>：客户的收款体量下滑与买家, 数的趋势有强相关性，客户可能存在被竞对切量的风险。</p>
          <p><Tag>辅助</Tag>: 通过电话、微信与客户或团队成员沟通。沟通要点：跟谁比价格高了呢（参照物） 、优质客户可以申请 手续费率调整 。</p>
        </Card>
      </Col>
    </Row>
    </Drawer>
    
  </>
};

export default YinGuoView
