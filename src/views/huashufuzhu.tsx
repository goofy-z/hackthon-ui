'use client'

import { useStore } from "@/store"
import { Button, Avatar, Layout, List, Steps, Divider, Row, Col, Space} from "antd"
import { FC, useEffect, useState } from "react"
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
    content: '老板，你好',
    isCustom: false,
    isEnd: false,
    fuzhu: ""
  },
  {
    id: 2,
    content: '很高兴为你服务，请问有什么可以帮助你的？2',
    isCustom: true,
    isEnd: false,
    fuzhu: "别说话"
  },
  {
    id: 3,
    content: '很高兴为你服务，请问有什么可以帮助你的？3',
    isCustom: false,
    isEnd: false,
    fuzhu: ""
  },
  {
    id: 4,
    content: '很高兴为你服务，请问有什么可以帮助你的？4',
    isCustom: true,
    isEnd: false,
    fuzhu: "别说话"
  },
  {
    id: 5,
    content: '很高兴为你服务，请问有什么可以帮助你的？5',
    isCustom: false,
    isEnd: false,
    fuzhu: ""
  },
  {
    id: 6,
    content: '很高兴为你服务，请问有什么可以帮助你的？6',
    isCustom: true,
    isEnd: false,
    fuzhu: "别说话"
  },
  {
    id: 7,
    content: '很高兴为你服务，请问有什么可以帮助你的？7',
    isCustom: false,
    isEnd: false,
    fuzhu: ""
  },
  {
    id: 8,
    content: '很高兴为你服务，请问有什么可以帮助你的？8',
    isCustom: true,
    isEnd: true,
    fuzhu: "别说话"
  }
  // ... 更多预设对话内容
];

const HuaShuView: FC<IProps> = ({ }) => {
  const [message, setMessages] = useState<Array<MessageInterface>>([])
  const [aixiaojie, setAIxiaojie] = useState<Array<any>>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [fuzhu, setFuzhu] = useState<string>("")
  const [custom, setCustom] = useState<string>("")

  const [timeCounter, setTimeCounter] = useState<number>(-999999)
  useEffect(() => {
    function tick() {
      setTimeCounter((v) => {
        let tmp = []
        const min_index = FixMessages.length < v+1 ? FixMessages.length : v+1
        for (let i=0 ;i<min_index;i++){
          console.log(tmp, v)
          tmp.push(FixMessages[i])
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
              locale={{emptyText: "还未产生通话数据"}}
              itemLayout="horizontal"
              dataSource={message}
              renderItem={(item) => {
                let conver = <>{  
                  item.isCustom ? 
                  <List.Item style={{ display: 'flex', justifyContent: item.isCustom ? 'flex-start' : 'flex-end' }}>
                    <Avatar style={{marginLeft: 20}} size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                    <Space style={{ alignItems: 'left', marginLeft: 20}}>{item.content}

                    </Space>
                    
                  </List.Item>
                  :
                  <List.Item style={{ display: 'flex', justifyContent: item.isCustom ? 'flex-start' : 'flex-end' }}>
                    <Space style={{ alignItems: 'right', marginRight: 20}}>{item.content}</Space>
                    <Avatar style={{marginRight: 20}} size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
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
                        <Button style={{marginRight: 0}} type="primary" onClick={() => {setAIxiaojie(["AI小结", "这里是AI小结"])}}>生成AI小结</Button>
                      </div>
                      </List.Item> : null
              }</>
              }}
              // renderItem={(item) => (
          
              
            />
          </Layout>
          <Divider type="vertical" />
          <Layout.Sider width={450} style={{ padding: '5px 5px', background: "#ffffff"}}>
            <Divider style={{  borderColor: '#7cb305' }}>客户内容</Divider>
            <p>
            {custom}
            </p>
            <Divider style={{  borderColor: '#7cb305' }}>销售辅助</Divider>
            <p>
            {fuzhu}
            </p>
            {aixiaojie.length === 0 ? null : <>
              <Divider style={{  borderColor: '#7cb305' }}>{aixiaojie[0]}</Divider>
            <p>{aixiaojie[1]}</p>
            </>}
          </Layout.Sider>
    </Layout>
  </>
}

export default HuaShuView
