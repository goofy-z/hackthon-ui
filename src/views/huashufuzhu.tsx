'use client'

import { useRouter } from "next/navigation"
import { Button, Avatar, Layout, List, Steps, Divider, Row, Col, Space} from "antd"
import { FC, useEffect, useState, useRef } from "react"
interface IProps { }

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface MessageInterface {
  id: any,
  content: any,
  isCustom: any,
  isEnd: any,
  fuzhu: any
}

// 预设的对话内容
const FixMessages = [
  {
    id: 1,
    content: '哎，您好，哎，打扰您一下。呃，我们呢是帮外贸公司啊免费开通香港离岸账户的啊，可以无限额结汇到个人卡。',
    isCustom: false,
    isEnd: false,
    fuzhu: ""
  },
  {
    id: 2,
    content: '你好。',
    isCustom: true,
    isEnd: false,
    fuzhu: ""
  },
  {
    id: 3,
    content: '你哪家公司啊？',
    isCustom: true,
    isEnd: false,
    fuzhu: `销冠话术：

我们公司叫 Xtransfer，简称 XT，您听过不？老板，我们用户很多的，好多都是外贸老板转介绍过来的；

我们是一家由央企招商局创投领投的企业，总部在上海。主要为中小微外贸企业提供金融风控服务，协助外贸老板收汇、结汇，合作的都是摩根大通、星展、中国银行等世界知名银行

我们在全国多个城市都有分公司的，像浙江、广东这边很多外贸老板，都是使用我们账户的，我稍后可以把她们采访的视频直接发给您，包括前段时间在深圳举办的未来外贸大会，深圳市商务局服务贸易处，中国银行深圳市副行长，中国对外贸易中心大湾区进出口商业总会等单位，全都过去参加的

而且政府网也有我们新闻，我们已经成立第8年了，目前累计服务55W加外贸企业，是toB外贸收款的第一大平台，客户服务口碑和账户功能都很好的，我加您微信，发资料给您看一下。

回答要点：

1. Xtransfer，简称 XT（反问老板没有听过吗？）
2. 央企招商局创投领投，合作知名银行
3. 多个城市分公司，人物、活动案例
4. 政府报道，业内排名
`
  },
  {
    id: 4,
    content: '我们是那个x transfer，专注为外贸企业提供收汇、结汇服务的，就是说可以帮企业免费开一个香港的离岸账户。',
    isCustom: false,
    isEnd: false,
    fuzhu: ''
  },
  {
    id: 5,
    content: '我们本身就有我们本身就有离岸账户啊。',
    isCustom: true,
    isEnd: false,
    fuzhu: `销冠话术：

哦，我们这个香港账户和您开的还是有些差别，我们是免费开户，呃，没有年费管理费这些。我们有很多客户跟我们合作开户的，他们也是有汇丰、恒生，还有大兴这些香港的传统香港账户的。另外的话除了转账功能以外，像您如果有自己的香港账户的话，我们可以支持您进行一个同名充值，帮助您把留存在海外的那个美金，可以合法合规的结结汇人民币到国内的个人银行卡的。

回答要点:
同名充值
`
  },
  {
    id: 6,
    content: '嗯，好的。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 7,
    content: '但是哦您是离岸账户和公账一起搭配使用吧。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 8,
    content: '因为离岸账户的话是没有结汇通道的，就是说不能把人民币结汇到国内这种。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 9,
    content: '我为什么开你们的香港账户？我国内一直很好用啊。',
    isCustom: true,
    isEnd: false,
    fuzhu: `销冠话术: 
其实香港账户对于您的业务开展有很大好处的。 它能够收取实物贸易的货款，可以接收全球多币种支付，支持全球转账和结汇，。您完全可以通过我们的服务免费开通香港账户，只需要提供大陆公司的营业执照，不需要亲自去香港开户的。我们与多家国际银行如摩根大通合作，提供全球收款服务。国家最新的结汇政策允许您将国际贸易货款无需限额地结汇到您的国内个人账户，同时不占用每人5万美元的额度。我要不微信给您提供详细的账户使用介绍和支持资料，你同意一下我的微信请求好吧？

回答要点: 
香港账户优势 
结汇便利 
节省成本 
政策支持 
离岸账户优势 
安全性和监管 
`
  },
  {
    id: 10,
    content: '是这样的，香港账户对于您的业务开展有很大好处的。它能够收取实物贸易的货款，可以接收全球多币种支付，支持全球转账和结汇。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 11,
    content: '呃，那您不管是国内公司还是香港公司，或者说有境外公司，都可以在线来做审核。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 12,
    content: '就是您收款之后，它可以把这个钱直接提到您国内的个人银行卡，或者说转到公户退税都可以的。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 13,
    content: '那你们那些怎么交那些手续费呀，啥都很贵呀。',
    isCustom: true,
    isEnd: false,
    fuzhu: `销冠话术: 
我们的开户是免费的，且没有任何年费或管理费。手续费的话，我们在使用过程中只有两种费用：1种结汇到个人账户时收取手续费，手续费在千分之一到千分之四之间，具体费率将依据您的结汇流水量而定；另外就是转账手续费，转账到国内每笔收费十美金，转账到国外每笔收费二十美金，不限金额。

回答要点: 
开户免费 
结汇手续费低 
转账不限制金额收费 
`
  },
  {
    id: 12,
    content: '对，我们的话呢，给您开的香港账户是绝对安全的哈，因为的话是这样子的。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 13,
    content: '就是我们给您开的香港账户的话，是通过叉t的方式去新开，是新开户的嘛。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 14,
    content: '像叉t的话呢，也是就是招商局创投，就是央央行就央企招商局创投去进行投资的一个企业。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 15,
    content: '然后我们其实做这个b two b的一个呃就是收收收款和付款的一个情况的话呢，也做了将近七年了。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 16,
    content: '从二零从二零一七年就开始做了，做到现在了，也就将近有四十五万的客户也是在用我们这个账户，所以你您这边尽管放心使用就行。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 17,
    content: '能多问一下，咱们是做什么产品出口的呀？',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 18,
    content: '皮革，包括说这个羽毛制品，还有这个鞋业。',
    isCustom: true,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 19,
    content: '主要出口到哪个国家呀？',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 20,
    content: '嗯，欧洲、德国啊那些比较多了。',
    isCustom: true,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 21,
    content: '欧洲、德国啊，那咱们这边走走公账的话，会不会就是说比较麻烦那些？',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 22,
    content: '还好吧',
    isCustom: true,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 23,
    content: '因为是是这样的，就是我们x transfer的话也是做作为一个帮外贸就是呃收款的嘛，',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 233,
    content: '而且我们这边就是相对来说会比较便捷，然后也是可以帮企业规避风险这一块的。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 24,
    content: '也看一下您这边看有没有说兴趣去多了解一个平台嘛。',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 25,
    content: 'okok可以,我先了解一下。',
    isCustom: true,
    isEnd: false,
    fuzhu: `销冠话术： 
啊，好，那我可以先加您微信，把详细资料发给您嘛。`
  },
  {
    id: 26,
    content: '嗯，行，我我加您个微信，您先忙，我给您发点资料。是这个手机号吗？',
    isCustom: false,
    isEnd: false,
    fuzhu: ``
  },
  {
    id: 27,
    content: '对',
    isCustom: true,
    isEnd: true,
    fuzhu: ``
  },
  // {
  //   id: 4,
  //   content: '很高兴为你服务，请问有什么可以帮助你的？4',
  //   isCustom: true,
  //   isEnd: false,
  //   fuzhu: "别说话"
  // },
  // {
  //   id: 5,
  //   content: '很高兴为你服务，请问有什么可以帮助你的？5',
  //   isCustom: false,
  //   isEnd: false,
  //   fuzhu: ""
  // },
  // {
  //   id: 6,
  //   content: '很高兴为你服务，请问有什么可以帮助你的？6',
  //   isCustom: true,
  //   isEnd: false,
  //   fuzhu: "别说话"
  // },
  // {
  //   id: 7,
  //   content: '很高兴为你服务，请问有什么可以帮助你的？7',
  //   isCustom: false,
  //   isEnd: false,
  //   fuzhu: ""
  // },
  // {
  //   id: 8,
  //   content: '很高兴为你服务，请问有什么可以帮助你的？8',
  //   isCustom: true,
  //   isEnd: true,
  //   fuzhu: "别说话"
  // }
  // ... 更多预设对话内容
];

const HuaShuView: FC<IProps> = ({ }) => {
  const [message, setMessages] = useState<Array<MessageInterface>>([])
  const [aixiaojie, setAIxiaojie] = useState<Array<any>>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [fuzhu, setFuzhu] = useState<string>("")
  const [custom, setCustom] = useState<string>("")
  const listRef = useRef<HTMLElement>(null);
  const [timeCounter, setTimeCounter] = useState<number>(-999999)
  useEffect(() => {
    function tick() {
      setTimeCounter((v) => {
        let tmp = []
        const min_index = FixMessages.length < v+1 ? FixMessages.length : v+1
        for (let i=0 ;i<min_index;i++){
          console.log(tmp, v)
          tmp.push(FixMessages[i])
          if (listRef !== null && listRef.current && v < 28){
            listRef.current.scrollTop = listRef.current.scrollHeight + 200;
          }
        }
        // if (FixMessages.length < v+1){
        //   clearInterval(intervalTick)
        // }
        
        setMessages(tmp)
        return v + 1
      })
    }
    const intervalTick = setInterval(tick, 2500)
    return () => {
      clearInterval(intervalTick)
    }
  }, [])
  const router = useRouter()
  return <>
    <Layout className="tw-flex"
          style={{ padding: '5px 0', width: "100%", height: "100%"}}
          hasSider={true}
        >
          <Layout style={{ padding: '5px 0', background: "#ffffff"}}>
          <List.Item className="tw-text-center tw-flex">
              <div style={{marginRight: 0, width: "100%"}}>
                <Button style={{marginRight: 0}} loading={loading} onClick={() => {setTimeCounter(-1); setLoading(true); if(!loading){setMessages([])}}}>{loading ? "电话接通中" : "拨打电话"}</Button>
              </div>
              </List.Item>
            <List
              style={{overflowY: "auto", height: "100%"}}
              split={false}
              ref={listRef}
              locale={{emptyText: "还未产生通话数据"}}
              itemLayout="horizontal"
              dataSource={message}
              renderItem={(item) => {
                let conver = <>{  
                  item.isCustom ? 
                  <List.Item style={{ display: 'flex', justifyContent: item.isCustom ? 'flex-start' : 'flex-end' }}>
                    <Avatar style={{marginLeft: 20}} size="large" src="/statics/客户头像.png" />
                    <Space style={{ alignItems: 'left', marginLeft: 20}}>{item.content}

                    </Space>
                    
                  </List.Item>
                  :
                  <List.Item style={{ display: 'flex',  justifyContent: item.isCustom ? 'flex-start' : 'flex-end'}}>
                    <Space style={{ alignItems: 'right', marginRight: 20}}>{item.content}</Space>
                    <Avatar style={{marginRight: 20}} size="large" src="/statics/客服头像.png" />
                  </List.Item>}</>
                setLoading(!item.isEnd)
                if (item.isCustom){
                  setFuzhu(item.fuzhu)
                  setCustom(item.content)
                }
                return <>
                  {conver}
                  {item.isEnd ? 
                    <List.Item className="tw-text-center tw-flex">
                      <div style={{marginRight: 0, width: "100%"}}>
                        <Button style={{marginRight: 0}} type="primary" onClick={() => {router.push('/kuaifupan')}}>生成AI小结</Button>
                        {/* <Button style={{marginRight: 0}} type="primary" onClick={() => {setAIxiaojie(["AI小结", "这里是AI小结"])}}>生成AI小结</Button> */}
                      </div>
                      </List.Item> : null
              }</>
              }}
              // renderItem={(item) => (
          
              
            />
          </Layout>
          <Divider type="vertical" />
          <Layout.Sider width={450} style={{ padding: '5px 5px', background: "#ffffff"}}>
            <Divider orientation="left">客户内容</Divider>
            <pre style={{wordWrap: "break-word", overflow: "auto", whiteSpace: "pre-wrap"}}>
            {custom}
            </pre>
            <Divider orientation="left">话术辅助</Divider>
            <pre style={{wordWrap: "break-word", overflow: "auto", whiteSpace: "pre-wrap"}}>
            {fuzhu}
            </pre>
            {aixiaojie.length === 0 ? null : <>
              <Divider orientation="left">{aixiaojie[0]}</Divider>
            <div>{aixiaojie[1]}</div>
            </>}
          </Layout.Sider>
    </Layout>
  </>
}

export default HuaShuView
