'use client'

import type { TableProps } from 'antd';
import { Button, Tooltip, Layout, List, Tag, Table, Divider, Col, Space} from "antd"
import { FC, useEffect, useState } from "react"
import { ProChat, ChatMessage, useProChat, ProChatProvider } from '@ant-design/pro-chat';
import {CommentOutlined} from '@ant-design/icons';
import { ZhaiyaoApi } from '@/actions/template.action';

interface IProps { }
type ColumnsType<T extends object> = TableProps<T>['columns'];

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface ApiResponse {
  value: any; // 根据实际情况调整类型
}

interface ApiValueResponse {
  result: any; // 根据实际情况调整类型
}

const content1 = `s: 哎，您好，哎，打扰您一下。呃，我们呢是帮外贸公司啊免费开通香港离岸账户的啊，可以无限额结汇到个人卡。
c: 你好。
c: 你哪家公司啊？
s: 我们是那个x transfer，专注为外贸企业提供收汇、结汇服务的，就是说可以帮企业免费开一个香港的离岸账户。
c: 我们本身就有我们本身就有离岸账户啊。
s: 嗯，好的。
s: 但是哦您是离岸账户和公账一起搭配使用吧。
s: 因为离岸账户的话是没有结汇通道的，就是说不能把人民币结汇到国内这种。
c: 我为什么开你们的香港账户？我国内一直很好用啊。
s: 是这样的，香港账户对于您的业务开展有很大好处的。它能够收取实物贸易的货款，可以接收全球多币种支付，支持全球转账和结汇。
s: 呃，那您不管是国内公司还是香港公司，或者说有境外公司，都可以在线来做审核。
s: 就是您收款之后，它可以把这个钱直接提到您国内的个人银行卡，或者说转到公户退税都可以的。
c: 那你们那些怎么交那些手续费呀，啥都很贵呀。
s: 如果说你这个退税的话呢，我们这边是不收你任何费用的，因为退税到公户是不收你钱的那如果说你这边的话说呃，我这边是结汇到法人个人户，这样子的话呢，那这边最高的话是千四，最低是千一。
c: 一般千四是吧，结汇个人账户的安全性怎么保障啊。
s: 对，我们的话呢，给您开的香港账户是绝对安全的哈，因为的话是这样子的。
s: 就是我们给您开的香港账户的话，是通过叉t的方式去新开，是新开户的嘛。
s: 像叉t的话呢，也是就是招商局创投，就是央央行就央企招商局创投去进行投资的一个企业。
s: 然后我们其实做这个b two b的一个呃就是收收收款和付款的一个情况的话呢，也做了将近七年了。
s: 从二零从二零一七年就开始做了，做到现在了，也就将近有四十五万的客户也是在用我们这个账户，所以你您这边尽管放心使用就行。
s: 能多问一下，咱们是做什么产品出口的呀？
c: 皮革，包括说这个羽毛制品，还有这个鞋业。
s: 主要出口到哪个国家呀？
c: 嗯，欧洲、德国啊那些比较多了。
s: 欧洲、德国啊，那咱们这边走走公账的话，会不会就是说比较麻烦那些？
c: 还好吧。
s: 因为是是这样的，就是我们x transfer的话也是做作为一个帮外贸就是呃收款的嘛，而且我们这边就是相对来说会比较便捷，然后也是可以帮企业规避风险这一块的。
s: 也看一下您这边看有没有说兴趣去多了解一个平台嘛。
c: okok可以,我先了解一下。
s:嗯，行，我我加您个微信，您先忙，我给您发点资料。是这个手机号吗？
c: 对。
s: 好，行，那您通过一下吧，我们微信聊。
c: 可以可以，好的嗯。
s: 哎，好，拜拜哎。`

const content2 = `c: 喂。
s: 喂，哎你好你好，呃，我们这边啊是可以帮助国内的外贸企业免费开通离岸收款账户，可以合规的结汇到您国内个人卡，或者是结汇到公户正常退税的。
c: 今早上不是跟你说了吗？
c: 现在做。
s: 呃，您这边现在是用什么账户在收款啊？
c: 哦，不用不用，我这边有一些那个我想问一下，就是说我paper里面的钱能转出来吗？
s: 老板，那您现在啊。
s: 啊。
s: 可以呀可以呀。
s: 这是货款吧。
c: 个人的。
c: 嗯，不是，是物流款。
s: 哦，哦就是但是是您出口，就是您本身是做物流的还是做出口的？
c: 物流物流。
s: 哦，物流的话那那不行，因为我们这边主要是服务这种有真实实物出口贸易的这种款项进行提现结汇的。
c: 啊啊啊啊啊啊啊啊那好的，那我知道。
s: 对，那您您本身是做这种跨境物流的是吗？
c: 嗯。
s: 那我觉得我们可以那个合作一下呀。
s: 对，因为您看您像我这边的话，主要是服务这种出口企业嘛。
s: 那他们可能会有这样的一个物流的需求嘛，对不对？
s: 对吧？
s: 那包括说您服务的一些这种客户，可能也是做出口的嘛，对不对？
c: 嗯，嗯嗯。
s: 他们可能有一些收款结汇的需求嘛。
c: 他们好像说收款结汇一般没什么太大需求。
s: 呃。
c: 他们一般都会自己弄掉，也不会找我们物流去。
s: 呃。
s: 呃，明白明白，那其实那我可以给您推嘛，对不对？
s: 那您能不能给我推，他看情况嘛，对吧？
s: 而且对吧这个像您做生意，你肯定有很多不同的渠道嘛，对吧？
s: 像很多客户确实有自己的收款渠道，但是可能对吧有一些有的时候会遇到一些问题啊，对不对之类的，可能都多了解一些，总归是好的嘛。
c: 嗯，嗯嗯。
s: 就是做生意嘛，多个朋友肯定多条路嘛。
c: 嗯，可以，那你加我这个手机号吧，你加我这个微信吧。
s: 可以可以啊，那您这边做做那个运输的话，主要是做哪哪些线的呀？
c: 我们现我们主要是。
c: 做折扣，所以你说的那个线的话没有要求。
s: 哦。
s: 哦，明白明白，行，那您回头那个您可以发一个您贵司的一个介绍给我，我也可以把我们公司介绍发给您。
s: 如果您身边有朋友或者是有客户有需求，咱们互相互相交换一下嘛，好吧。
c: 嗯，嗯嗯，可以可以可以，没问题。
s: 嗯，好的，行，那也祝您生意兴隆，订单多多啊。
c: 嗯，好好好，谢谢啊。
s: 嗯，好，打扰您了。
s: 哎，拜拜哎。
c: 嗯，嗯嗯，拜拜。`

const content3 = `s: 喂，哎你好，呃，了解到您这边有在做外贸，我这边是免费帮国内出口企业开通香港账户的，呃，支持不限额结汇人民币到您国内的个人卡。
c: 喂，你好。
s: 呃，我这边加您个微信，把最新的这个结汇政策啊发您了解一下吧。
c: 结汇限额结到人民币是吗？
s: 是结汇到国内个人卡姐。
c: 结汇到国内个人卡。
s: 对对对，是人民币。
s: 是的，结汇到国内个人卡。
c: 公司的不行是吗？
s: 啊，公司肯定行啊，根据您的需求，如果说您是退税的，或者是您需要做账，那您就正常转到国内公户去。
s: 如果说您这个订单不退税，那进公户肯定不方便嘛。
s: 我们可以帮您结汇到国内个人卡，没有额度限制。
s: 前提是您只要这笔款是您的贸易货款就可以，做生意的钱就可以了。
c: 那俄罗斯那边的也可以吗？
s: 外贸。
s: 呃，姐，不好意思，这个我没我没有听清楚。
c: 我说俄罗斯那边的也可以吗？
s: 啊，也不好意思哈，这个对外贸易我们x transfer从二月一号开始呃，暂时不支持收取了。
s: 呃，其他的话目前是ok的。
c: 嗯，但是我们现在只做俄罗斯那边的。
s: 哎，好。
s: 姐，您除了俄罗斯业务，还有其他国家吗？
s: 没有了。
c: 没有了。
s: 了解，那这样我们公司的话这边不行，但是他这个政策的话，它也不是说是长期一定的。
s: 如果说后期有什么更新的话，我这边第一时间给您汇报，好吧？
s: 我留一个您微信，发点资料，您看一看。
c: 好的，你加我微信吧，就是这个手机号。
s: 啊，没问题没问题。
s: 姐，我方便问一下，您是做什么产品的吗？
s: 已经发到。
c: 纺织。
s: 纺织类是吧？
c: 对。
s: 啊，好的，那这个您现在有退税没有？
c: 有退税。
s: 有退税是吧？
s: 好的，因为现在也也有一些小的平台呀，包括这些银行。
s: 可以说这个俄罗斯的这个这个这个款项，但是他们就不是很稳定，有一些关于品类的限制。
s: 关于品质的限制，那后期如果说有什么消息的话，我到时候给您发微信吧。
c: 对。
c: 对。
s: 好吧，因为我们x tran是暂时不支持的。
c: 好的。
c: 好的好的。
s: 嗯，好的，那您注意通过一下微信，我给你发资料啊，保持联系。
c: 嗯，好，谢谢啊，再见。
s: 嗯，好的，姐，再见啊。
s: 嗯拜拜拜。`

const example = {
  chats: [
    {
      content: '欢迎使用 快复盘 ，选择上方对话摘要向我提问',
      createAt: 1697862247302,
      id: 'Sb5pAzLL',
      parentId: 'ZGxiX2p4',
      role: 'assistant',
      updateAt: 1697862249387,
      model: 'gpt-3.5-turbo',
    },
    {
      content: content1,
      createAt: 1697862242452,
      id: 'ZGxiX2p4',
      role: 'user',
      updateAt: 1697862243540,
      extra: {
        test: 'Test Extra',
      },
    },
    {
      content: '销售提到了为外贸公司免费开通香港离岸账户的服务，包括无限额结汇和全球多币种支付支持，以及转账和结汇。客户已有离岸账户且对当前账户满意，对新账户的优势表示怀疑。销售解释了新账户的结汇通道和安全性，强调账户的操作便捷性和风险规避能力。客户对结汇个人账户的安全性和手续费表现出关心，对进一步了解表示兴趣，并同意微信沟通。客户主要出口皮革和羽毛制品至欧洲和德国，询问公账使用的复杂性，表示当前操作还算便捷',
      createAt: 1697862247302,
      id: 'Sb5pAzL2',
      role: 'assistant',
      updateAt: 1697862249387,
      model: 'gpt-3.5-turbo',
    },
  ],
  config: {
    model: 'gpt-3.5-turbo',
    params: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 0.6,
      top_p: 1,
    },
    systemRole: '',
  },
};

const example2 = {
  chats: [
    {
      content: '欢迎使用 快复盘 ，选择上方对话摘要向我提问',
      createAt: 1697862247302,
      id: 'Sb5pAzLL',
      parentId: 'ZGxiX2p4',
      role: 'assistant',
      updateAt: 1697862249387,
      model: 'gpt-3.5-turbo',
    },
    {
      content: content2,
      createAt: 1697862242452,
      id: 'ZGxiX2p4',
      role: 'user',
      updateAt: 1697862243540,
      extra: {
        test: 'Test Extra',
      },
    },
    {
      content: `| 要点名称               | 描述                                                         |
|----------------------|--------------------------------------------------------------|
| 是否为目标客户       | 否                                                           |
| 客户出口类型         | 无相关信息                                                   |
| 客户的出口国家       | 无相关信息                                                   |
| 客户收款需求         | 客户需要将PayPal账户中的物流款项转出。                     |
| 客户加微意向         | 高                                                           |`,
      createAt: 1697862247302,
      id: 'Sb5pAzL2',
      role: 'assistant',
      updateAt: 1697862249387,
      model: 'gpt-3.5-turbo',
    },
  ],
  config: {
    model: 'gpt-3.5-turbo',
    params: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 0.6,
      top_p: 1,
    },
    systemRole: '',
  },
};

const example3 = {
  chats: [
    {
      content: '欢迎使用 快复盘 ，选择上方对话摘要向我提问',
      createAt: 1697862247302,
      id: 'Sb5pAzLL',
      parentId: 'ZGxiX2p4',
      role: 'assistant',
      updateAt: 1697862249387,
      model: 'gpt-3.5-turbo',
    },
    {
      content: content3,
      createAt: 1697862242452,
      id: 'ZGxiX2p4',
      role: 'user',
      updateAt: 1697862243540,
      extra: {
        test: 'Test Extra',
      },
    },
    {
      content: `最终等级： S 
| 项目 | 描述 | 得分 |
| ---- | ---- | ---- |
| 目标是否达成 | 客户同意添加微信，销售成功获取客户的微信联系方式 | 80分 |
| SOP执行情况 | - 表明身份：销售在对话中主动介绍了自己和公司 | 2分 |
|  | - 判断是否目标客户：销售通过询问客户的业务情况 | 3分 |
|  | - 进行挖需动作：<br>询问出口国家：销售询问了客户的主要出口国家 | 1分 |
|  | - 询问出口类型：未明确询问 | 0分 |
|  | - 询问收款币种：未明确询问 | 0分 |
|  | - 询问现有账户：虽然客户提到已有离岸账户，但销售未主动询问 | 0分 |
|  | - 询问流水量：未询问 | 0分 |
|  | - 提出解决方案：销售详细介绍了香港账户的优势和服务方案 | 5分 |
|  | - 申请加微：销售主动提出添加微信并获得客户同意 | 5分 |
| 总评分 | 目标达成：80分, SOP执行：16分 | 96分 |`,
      createAt: 1697862247302,
      id: 'Sb5pAzL2',
      role: 'assistant',
      updateAt: 1697862249387,
      model: 'gpt-3.5-turbo',
    },
  ],
  config: {
    model: 'gpt-3.5-turbo',
    params: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 0.6,
      top_p: 1,
    },
    systemRole: '',
  },
};

const ZhaiyaoView: FC<IProps> = ({ }) => {
  
interface DataType {
  key: string;
  name: string;
  age: string;
  address: string;
  person: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Leads ID',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '会话时长（s）',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '内容',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true
  },
  {
    title: '接通人',
    dataIndex: 'person',
    key: 'person',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (tags: string[]) => (
  //     <span>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </span>
  //   ),
  // },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>查看详情</a>
      </Space>
    ),
  },
];

  const data: DataType[] = [
    {
      key: '1',
      name: '0000001',
      age: "1m 32s",
      address: content1,
      person: "秦小丽",
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: '0000002',
      age: "5m 32s",
      person: "秦小丽",
      address: content2,
      tags: ['loser'],
    },
    {
      key: '3',
      name: '0000003',
      age: "4m 32s",
      person: "秦小丽",
      address: content3,
      tags: ['cool', 'teacher'],
    },
  ];

  const [select, setSelect] = useState<DataType[]>([]);

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelect(selectedRows);
    }
  };

  // 预设的对话内容

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
  const [chats, setChats] = useState<string>("");
  const Control = () => {
    const proChat = useProChat();
    return (<div><a
        style={{background: "rgb(243, 243, 243)", marginRight: "20px"}}
        key="user"
        onClick={() => {proChat.sendMessage(example.chats[1]["content"]), setChats(example.chats[2]?.content)}}
      ><CommentOutlined />
        <span>帮我生成一下会话摘要</span>
      </a>
      <a
        style={{background: "rgb(243, 243, 243)", marginRight: "20px"}}
        key="user"
        onClick={() => {proChat.sendMessage(example3.chats[1]["content"]), setChats(example3.chats[2]?.content)}}
      ><CommentOutlined />
        <span>帮我制定一个话术优化计划</span>
      </a>
      <a
        style={{background: "rgb(243, 243, 243)", marginRight: "20px"}}
        key="user"
        onClick={() => {proChat.sendMessage(example2.chats[1]["content"]), setChats(example2.chats[2]?.content)}}
      ><CommentOutlined />
        <span>帮我总结一下会话要点</span>
      </a>
      </div>)
  }
  
  return <ProChatProvider>
    <Layout className="tw-flex"
          style={{ padding: '5px 0', width: "100%", height: "100%", marginBottom: "10"}}
          hasSider={true}
        >
          <Layout style={{ padding: '5px 0', marginBottom: "10"}}>
            <Table<DataType>
              size={"small"}
                  rowSelection={{ ...rowSelection }}
                  pagination={false}
                  columns={columns}
                  dataSource={data}
                  bordered
                />
            <ProChat
              assistantMeta={{ avatar: '/statics/客服机器人.png', title: '三体世界', backgroundColor: '#67dedd' }}
              style={{ height: "100%" }}
              helloMessage={
                '欢迎使用 快复盘 ，选择上方对话摘要向我提问'
              }
              
              actions={{
                render: (defaultDoms) => {
                  return [
                    <span></span>,
                    <Control/>,
                    
                    ...defaultDoms,
                  ];
                },
                flexConfig: {
                  gap: 24,
                  direction: 'horizontal',
                  justify: 'space-between',
                },
              }}
              request={async (messages) => {
                let mockedData: string = chats
                if (mockedData !== "" && mockedData !== undefined){
                  await sleep(3000)
                  setChats("")
                  return new Response(mockedData);
                } else {
                  await ZhaiyaoApi(select[0].address, messages[messages.length - 1].content).payload.then((r) => {
                    const d:ApiValueResponse = (r as ApiResponse).value
                    console.log(d)
                    mockedData = d?.result
                  });
                }
                
                if (mockedData === undefined){
                  mockedData = "暂时不能理解你的意思，我在努力学习中～"
                }
                return new Response(mockedData);
              }}
            />
          </Layout>
    </Layout>
  </ProChatProvider>
}

export default ZhaiyaoView
