'use client';

import { Collapse, Layout, Drawer, Space, Typography, Divider, Table, Tag, Image, List, Tooltip, Card } from 'antd';
import { FC, useEffect, useState } from "react"
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
  owner: string;
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
  new_source: string;
  src: string;
  tags: string[];
}

interface DataType3 {
  key: number;
  href: string;
  title: string;
  typ: string;
  age: string;
  tags: string[];
}

interface DataType4 {
  key: string;
  title: string;
  age: string;
}

const filenames = [
  '加纳水单.png',
  '泰国水单.png',
  '新加坡水单.png',
  '澳大利亚水单.png',
  '沙特阿拉伯水单.png',
  '波兰水单.png',
  '墨西哥水单.png',
  '西班牙水单.png',
  '印度尼西亚水单.png',
  '吉尔吉斯斯坦水单.png',
];

// 随机选择两个不同文件名的函数
function getRandomTwoFilenames(): [string, string] {
  const length = filenames.length;
  let firstFilename: string;
  let secondFilename: string;

  // 确保两次随机选择的文件名不同
  do {
    firstFilename = filenames[Math.floor(Math.random() * length)];
    secondFilename = filenames[Math.floor(Math.random() * length)];
  } while (firstFilename === secondFilename);

  return [firstFilename, secondFilename];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'firmid',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '公司名称',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '负责人',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '认证状态',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <span>
        {tags.map((tag) => {
          let color = tag[0] == "认证成功" ? 'geekblue' : 'green';
          if (tag === '审核驳回') {
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

const columns4: ColumnsType<DataType4> = [
  {
    title: '简写',
    dataIndex: 'key',
    key: 'key',
    render: (text) => <Tag>{text}</Tag>,
  },
  {
    title: '全称',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '描述',
    dataIndex: 'age',
    key: 'age',
  }
];

const columns3: ColumnsType<DataType3> = [
  {
    title: '动态事件类型',
    dataIndex: 'typ',
    key: 'typ',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '公司名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '事件',
    dataIndex: 'age',
    key: 'age',
    ellipsis: true,
    render: (text) => <Tooltip placement="topLeft" title={text}>
    {text}
  </Tooltip>,
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
    title: '操作',
    dataIndex: 'href',
    key: 'href',
    render: (x) => <Typography.Link target="_blank" href={x}>查看详情</Typography.Link>,
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: 'firm id 1',
    age: 32,
    address: '天津*****设备股份有限公司',
    owner: '销售A',
    tags: ['审核驳回'],
  },
  {
    key: 2,
    name: 'firm id 2',
    age: 42,
    owner: '销售B',
    address: '**电子股份有限公司',
    tags: ['认证成功'],
  },
  {
    key: 3,
    name: 'firm id 3',
    owner: '销售C',
    age: 32,
    address: '深圳市****科技有限公司',
    tags: ['认证成功'],
  },
  {
    key: 4,
    name: 'firm id 4',
    age: 42,
    owner: '销售B',
    address: '**微电子科技有限公司',
    tags: ['认证成功'],
  },
  {
    key: 5,
    name: 'firm id 5',
    owner: '销售C',
    age: 32,
    address: '浙江东方**电子股份有限公司',
    tags: ['认证成功'],
  },
  {
    key: 6,
    name: 'firm id 6',
    age: 42,
    owner: '销售B',
    address: '湖南省***服饰有限公司',
    tags: ['认证成功'],
  },
  {
    key: 7,
    name: 'firm id 7',
    owner: '销售C',
    age: 32,
    address: '杭州**科技有限公司',
    tags: ['审核驳回'],
  },
  {
    key: 8,
    name: 'firm id 8',
    age: 42,
    owner: '销售B',
    address: '齐鲁**纺织集团',
    tags: ['认证成功'],
  },
  {
    key: 9,
    name: 'firm id 9',
    owner: '销售C',
    age: 32,
    address: '**科技股份有限公司',
    tags: ['认证成功'],
  },
  {
    key: 10,
    name: 'firm id 10',
    age: 42,
    owner: '销售B',
    address: '**科技股份有限公司',
    tags: ['认证成功'],
  }
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

const data4 = [
  {
    "key": "CIF",
    "title": "Cost, Insurance, and Freight",
    "age": "指卖方承担货物运至目的港的费用，包括运输和保险费用。"
  },
  {
    "key": "FOB",
    "title": "Free On Board",
    "age": "指卖方在装运港将货物装上船后，买方承担风险和费用。"
  },
  {
    "key": "L/C",
    "title": "Letter of Credit",
    "age": "信用证，是一种银行担保的付款方式，确保卖方在符合条件时能收到货款。"
  },
  {
    "key": "HS Code",
    "title": "Harmonized System Code",
    "age": "海关编码，用于商品分类和统计，确保国际贸易的一致性。"
  },
  {
    "key": "MOQ",
    "title": "Minimum Order Quantity",
    "age": "最小订购量，卖方规定的单次交易的最低数量要求。"
  },
  {
    "key": "ETA",
    "title": "Estimated Time of Arrival",
    "age": "预计到达时间，指货物预计到达目的地的时间。"
  },
  {
    "key": "B/L",
    "title": "Bill of Lading",
    "age": "提单，是货物运输的凭证，也是收货的依据。"
  },
  {
    "key": "EXW",
    "title": "Ex Works",
    "age": "工厂交货，指买方承担从卖方工厂提货后的所有费用和风险。"
  },
  {
    "key": "NAFTA",
    "title": "North American Free Trade Agreement",
    "age": "北美自由贸易协定，促进美国、加拿大和墨西哥之间的贸易。"
  },
  {
    "key": "RoHS",
    "title": "Restriction of Hazardous Substances",
    "age": "限制有害物质指令，规定产品中某些有害物质的使用限制，常用于确保产品符合环保标准。"
  }
]

const hangyezhengce = [
  {
    key: 1,
    title: '黎巴嫩通信设备爆炸影响',
    age: '黎巴嫩通信设备爆炸事件后，中东电子订单并未大规模转向中国大陆。传言称因安全原因订单转移，华强北对讲机询价增加，但实际订单未见显著变化。尽管如此，海能达股价因可能受益于订单转移大幅上涨。华强北和泉州的对讲机生产并未明显增加订单。中东电子工业薄弱，主要依赖进口，中国仍是主要的出口国，但市场影响有限。',
    date: "2024/10/12",
    new_source: "界面新闻",
    src: "https://baijiahao.baidu.com/s?id=1812667059831567368&wfr=spider&for=pc",
    tags: ["通讯电子产品"],
  },
  {
    key: 2,
    title: '消费电子行业外贸出口强劲反弹',
    age: '2024年上半年，我国消费电子行业外贸出口强劲反弹。手机和笔记本电脑是主要贡献者，其出口量较去年显著提升，尤其是在墨西哥、俄罗斯等发展中国家表现突出。政策支持和企业竞争力提升为出口增长奠定基础。中国企业继续在全球手机和PC市场中占据重要位置，并在新型终端和智能家用机器人领域加速发展。展望下半年，消费电子行业将继续受益于全球市场的稳健需求和技术创新。',
    date: "2024/10/12",
    new_source: "21世纪经济报道",
    src: "https://www.cnii.com.cn/gxxww/gy/202408/t20240816_593921.html",
    tags: ["消费电子"],
  },
  {
    key: 3,
    title: '广东外贸进出口趋势',
    age: '广东外贸出现积极信号，跨境电商成为新动能，前两个月广东外贸进出口同比增长24.9%。电子信息产业反弹明显，广东持续拓展海外市场。对主要贸易伙伴的出口量均实现增长，尤其对美国的进出口增幅显著。广州的SHEIN招商会表明跨境电商热度不减，企业持续扩展市场释放了乐观信号。',
    date: "2024/10/12",
    new_source: "21世纪经济报道",
    tags: ["电子信息产业"],
    src: "https://stock.10jqka.com.cn/20240313/c655898772.shtml",
  }
];

const gongsidongtai = [
  {
    key: 1,
    href: "http://tiankangybdl.net/display/467966.html",
    title: '天津*****设备股份有限公司',
    age: '安徽***与天津****设备股份有限公司合作签约仪式。该签约仪式于2021年12月10日举行，双方就合作项目发展前景以及当前行业发展形势进行了沟通交流，并在与会人员的共同见证下签署了合作协议。',
    typ: "签约仪式",
    tags: ["电子"],
  },
  {
    key: 2,
    href: "https://stock.10jqka.com.cn/20241018/c662545459.shtml",
    title: '**电子股份有限公司',
    age: '新能源发电智慧运营服务解决方案，包括新能源场站集中监控、无人值守、并网技术支持、电力市场化交易解决方案和源网荷储一体化管控系统。成功应用于大唐、国电投、华能、国电、中核汇能等多家能源集团的几百座风电/光伏电场。展示新能源(风光储)场站建设服务解决方案，包括新能源升压站二次设备整体解决方案、电化学储能解决方案、电能量采集和管理解决方案和大规模电磁暂态仿真平台。',
    typ: "公司展会",
    tags: ["电子"],
  },
  {
    key: 3,
    href: "https://app.myzaker.com/news/article.php?pk=67127cdfb15ec0202b49099b",
    title: '深圳市****科技有限公司',
    age: '展出产品：8.4英寸的掌玩 mini2 系列平板电脑，14、15、16英寸的笔记本电脑，即将上市的13英寸、11.45英寸、10.95英寸、10.1英寸等最新款平板电脑',
    typ: "公司展会",
    tags: ["电子"],
  }
];

const columnszhengce: ColumnsType<DataType2> = [
  {
    title: '新闻标题',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '新闻概要',
    dataIndex: 'age',
    key: 'age',
    ellipsis: true,
    render: (text) => <Tooltip placement="topLeft" title={text}>
    {text}
  </Tooltip>,
  },
  {
    title: '新闻来源',
    dataIndex: 'new_source',
    key: 'new_source',
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
  {
    title: '操作',
    dataIndex: 'src',
    key: 'src',
    render: (x) => <Typography.Link target="_blank" href={x}>查看详情</Typography.Link>,
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
                    columns={new_column}
                    dataSource={data}
                    bordered
                  />
            <Drawer width={"70% "} placement="right" closable={false} onClose={onClose} open={open}>
              <Divider></Divider>
              <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{ key: '1', label: '收款环比走势', 
                  children: 
                  <div className='tw-flex tw-justify-between' style={{width: "100%", }}>
                    <Card title="月度变化" style={{marginLeft: "20%", fontSize: 40, color: data1[firm-1] && data1[firm-1][0].startsWith("-") ? "green" : "red"}}> {data1[firm-1] ? data1[firm-1][0] : 0}
                    </Card>
                    <Card title="季度变化" style={{marginRight: "20%", fontSize: 40, color: data1[firm-1] && data1[firm-1][1].startsWith("-") ? "green" : "red"}}
                    >{data1[firm-1] ? data1[firm-1][1] : 0}
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
              
                    </> : <>
                    <Image
                      preview={false}
                      width={650}
                      height={300}
                      style={{padding: "0 10px"}}
                      src={`/statics/sales/firm6-2-1`}
                    />
                    <Image
                    preview={false}
                    width={650}
                    height={300}
                    style={{padding: "0 10px"}}
                    src={`/statics/sales/firm6-2-2`}
                  />
              
                    </> 
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
              
                    </> : <>
                    <Image
                      preview={false}
                      width={650}
                      height={300}
                      style={{padding: "0 10px"}}
                      src={`/statics/sales/firm6-2-3`}
                    />
                    <Image
                    preview={false}
                    width={650}
                    height={300}
                    style={{padding: "0 10px"}}
                    src={`/statics/sales/firm6-2-4`}
                  />
              
                    </> 
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
                    columns={columnszhengce}
                    dataSource={hangyezhengce}
                    bordered
                  />

              }]}
              />
            
            <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{ key: '1', label: '公司动态', children: 
                  <Table<DataType3>
                    pagination={false}
                    columns={columns3}
                    dataSource={gongsidongtai}
                    bordered
                  />

              }]}
              />

              <Divider>XT福利+动态</Divider>
              <List
                
                itemLayout="horizontal">
                  <List.Item.Meta
                    description={<div className='tw-flex tw-justify-between'><Typography.Link target="_blank" href="https://mp.weixin.qq.com/s/lqzXdAhPlL8Wu8V7t87vIQ">10月结汇大礼包，手续费降低10%</Typography.Link><span style={{ textAlign: "right"}}>2024.10.01 ~ 2024.10.30</span></div>}>
                  </List.Item.Meta>
                  <List.Item.Meta
                    description={<div className='tw-flex tw-justify-between'><Typography.Link target="_blank" href="https://mp.weixin.qq.com/s/lqzXdAhPlL8Wu8V7t87vIQ">安信融上线，随借随还最高100万</Typography.Link><span style={{textAlign: "right"}}>2024.10.30 ~ 2024.10.30</span></div>}
                  />
                  <List.Item.Meta
                    description={<div className='tw-flex tw-justify-between'><Typography.Link target="_blank" href='https://mp.weixin.qq.com/s/r_oSYtDrb2ZdZKnvjluRog'>XTransfer普惠季派送千万元福利</Typography.Link><span style={{textAlign: "right"}}>2024.09.01 ~ 2024.09.07</span></div>}
                  />
                  <List.Item.Meta
                    description={<div className='tw-flex tw-justify-between'><Typography.Link target="_blank" href='https://mp.weixin.qq.com/s/ttAtRJcIJEDGOyCQo9KdcA'>XT参展广交会推出12项福利！</Typography.Link><span style={{textAlign: "right"}}>2024.10.17 ~ 2024.10.19</span></div>}
                  />
                  <List.Item.Meta
                    description={<div className='tw-flex tw-justify-between'><Typography.Link target="_blank" href='https://mp.weixin.qq.com/s/ttAtRJcIJEDGOyCQo9KdcA'>2024香港金融科技周，XT将以银级赞助商身份参与！XT期待在此展会上与广大参会者深入交流，并展示我们的创新产品与服务</Typography.Link><span style={{textAlign: "right"}}>2024.10.25 ~ 2024.10.19</span></div>}
                  />
                </List>
                <Divider>XT技术革新</Divider>
                <List itemLayout="horizontal">
                  <List.Item.Meta
                    description={<div className='tw-flex tw-justify-between'><Typography.Link target="_blank" href='https://mp.weixin.qq.com/s/1uYyUVuXBoWHehUllaXcwA'>OCR识别全新升级！支持越南语等小语种，快来试试吧</Typography.Link><span style={{textAlign: "right"}}>2024.09.08</span></div>}>
                  </List.Item.Meta>
                  <List.Item.Meta
                    description={<div className='tw-flex tw-justify-between'><Typography.Link target="_blank" href='https://mp.weixin.qq.com/s/1uYyUVuXBoWHehUllaXcwA'>首个外贸金融领域大模型在XT落地（TradePilot）</Typography.Link><span style={{textAlign: "right"}}>2024.09.08</span></div>}
                  />
                  <List.Item.Meta
                    description={<div className='tw-flex tw-justify-between'><Typography.Link target="_blank" href='https://mp.weixin.qq.com/s/vSUP9dp3nnDzwqRbHpZ5eg'>GPI在途收款功能升级，可预测到账时间等信息</Typography.Link><span style={{textAlign: "right"}}>2024.08.17</span></div>}
                  />
                </List>
                <Divider></Divider>
  
              
              <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{ key: '1', label: '行业术语 ', children: 
                  <Table<DataType4>
                    pagination={false}
                    columns={columns4}
                    dataSource={data4}
                    bordered
                  />

              }]}
              />
            <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{ key: '1', label: '出口国家水单案例', children: 
                  <div className='tw-flex tw-justify-between'>
                    <Image
                      preview={false}
                      width={650}
                      height={300}
                      style={{padding: "0 10px"}}
                      src={`/statics/sales/statement/${getRandomTwoFilenames()[0]}`}
                    />
                    <Image
                    preview={false}
                    width={650}
                    height={300}
                    style={{padding: "0 10px"}}
                    src={`/statics/sales/statement/${getRandomTwoFilenames()[0]}`}
                  />
                  </div>
                  
              }]}/>  
            </Drawer>

          </Layout>
          <Layout style={{ padding: '5px 0', background: "#ffffff"}}>
            
        </Layout>
    </Layout>
  </>
};

export default SalesView
