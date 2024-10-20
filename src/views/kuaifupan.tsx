'use client'

import type { TableProps } from 'antd';
import { Button, Avatar, Layout, List, Tag, Table, Divider, Col, Space} from "antd"
import { FC, useEffect, useState } from "react"
import { ProChat, ChatMessage } from '@ant-design/pro-chat';
import {CommentOutlined} from '@ant-design/icons';

interface IProps { }
type ColumnsType<T extends object> = TableProps<T>['columns'];

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
      content: `帮我生成一下会话摘要，会话内容如下：\n
s: 哎，您好，哎，打扰您一下。呃，我们呢是帮外贸公司啊免费开通香港离岸账户的啊，可以无限额结汇到个人卡。
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
s: 哎，好，拜拜哎。`,
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
      content: `帮我制定一个话术优化计划，会话内容如下：\n
s: 哎，您好，哎，打扰您一下。呃，我们呢是帮外贸公司啊免费开通香港离岸账户的啊，可以无限额结汇到个人卡。
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
s: 哎，好，拜拜哎。`,
      createAt: 1697862242452,
      id: 'ZGxiX2p4',
      role: 'user',
      updateAt: 1697862243540,
      extra: {
        test: 'Test Extra',
      },
    },
    {
      content: `| 字段名称               | 描述                                                         |
|------------------------|--------------------------------------------------------------|
| 是否为目标客户         | 是                                                           |
| 客户出口类型           | 自营出口                                                     |
| 客户的出口国家         | 欧洲、德国                                                   |
| 客户收款需求           | 客户已有离岸账户，对现有账户满意，但对结汇到个人账户的安全性和手续费表示关心。 |
| 客户加微意向           | 高                                                           |`,
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
      content: `帮我总结一下会话要点，会话内容如下：\n
s: 哎，您好，哎，打扰您一下。呃，我们呢是帮外贸公司啊免费开通香港离岸账户的啊，可以无限额结汇到个人卡。
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
s: 哎，好，拜拜哎。`,
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
| 总评分 | 目标达成：80分, SOP执行：16分, 总分：96分 | - |`,
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
      address: '哎，您好，哎，打扰您一下。呃，我们呢是帮外贸公司啊免费开通香港离岸账户的 ......',
      person: "秦小丽",
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: '0000002',
      age: "5m 32s",
      person: "秦小丽",
      address: 'c: 喂。s: 喂，哎你好你好，呃，我们这边啊是可以帮助国内的外贸企业免费开通离岸收款账户，可以合规的结汇到您国内个人卡，或者是结汇到公户正常......',
      tags: ['loser'],
    },
    {
      key: '3',
      name: '0000003',
      age: "4m 32s",
      person: "秦小丽",
      address: 's: 喂，哎你好，呃，了解到您这边有在做外贸，我这边是免费帮国内出口企业开通香港账户的，呃，支持不限额结汇人民币到您国内的个人卡。c: 喂，......',
      tags: ['cool', 'teacher'],
    },
  ];

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
  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>();
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
                '欢迎使用 快复盘 ，选择上方对话摘要向我提问'
              }
              chats={chats}
              actions={{
                render: (defaultDoms) => {
                  return [
                    <span></span>,
                    <div><a
                    style={{background: "rgb(243, 243, 243)", marginRight: "20px"}}
                    key="user"
                    onClick={() => {setChats(example.chats)}}
                  ><CommentOutlined />
                    <span>帮我生成一下会话摘要</span>
                  </a>
                  <a
                    style={{background: "rgb(243, 243, 243)", marginRight: "20px"}}
                    key="user"
                    onClick={() => {setChats(example2.chats)}}
                  ><CommentOutlined />
                    <span>帮我制定一个话术优化计划</span>
                  </a>
                  <a
                    style={{background: "rgb(243, 243, 243)", marginRight: "20px"}}
                    key="user"
                    onClick={() => {setChats(example3.chats)}}
                  ><CommentOutlined />
                    <span>帮我总结一下会话要点</span>
                  </a>
                  </div>,
                    
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
                const mockedData: string = `你好，请选择上方推荐内容`;
                return new Response(mockedData);
              }}
            />
          </Layout>
    </Layout>
  </>
}

export default ZhaiyaoView
