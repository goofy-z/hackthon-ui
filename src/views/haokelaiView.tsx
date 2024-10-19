'use client'

import { useStore } from "@/store"
import { Button, Avatar, Layout, List, Steps, Divider, Row, Col, Space} from "antd"
import { FC, useEffect, useState } from "react"
import { ProChat } from '@ant-design/pro-chat';
import { ListHakkelaiApi } from "@/actions/template.action";
interface IProps { }

interface ApiResponse {
  value: any; // 根据实际情况调整类型
}

interface ApiValueResponse {
  answer_text: any; // 根据实际情况调整类型
  rec_reasons_A: Array<Object>; // 根据实际情况调整类型
  rec_reasons_B: Array<Object>; // 根据实际情况调整类型
}
const HaokelaiView: FC<IProps> = ({ }) => {
  const [timeCounter, setTimeCounter] = useState<number>(-999999)
  const [apidata, setData] = useState<ApiValueResponse>()
  useEffect(() => {
    function tick() {
      setTimeCounter((v) => v + 1)
    }
    const intervalTick = setInterval(tick, 1000)
    return () => {
      clearInterval(intervalTick)
    }
  }, [])
   
  const description = <>
    <>
    <Row>
      <Col span={24}>col</Col>
    </Row>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
  </>
  </>
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
  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return <>
    <Layout className="tw-flex"
          style={{ padding: '5px 0', width: "100%", height: "100%"}}
          hasSider={true}
        >
          <Layout style={{ padding: '5px 0', background: "#ffffff"}}>


            {/* <List
              style={{overflowY: "auto", height: "100%"}}
              split={false}
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item) => (
                !item.isEnd ?
                  item.isAI ? 
                  <List.Item style={{ display: 'flex', justifyContent: item.isAI ? 'flex-start' : 'flex-end' }}>
                    <Avatar style={{marginLeft: 20}} size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                    <Space style={{ alignItems: 'left', marginLeft: 20}}>{item.content}
                    <Button
                      
                      size="small"
                      loading={loadings[item.id]}
                      onClick={() => enterLoading(item.id)}
                    >
                      实时辅助
                    </Button>

                    </Space>
                    
                  </List.Item>
                  :
                  <List.Item style={{ display: 'flex', justifyContent: item.isAI ? 'flex-start' : 'flex-end' }}>
                    <Space style={{ alignItems: 'right', marginRight: 20}}>{item.content}</Space>
                    <Avatar style={{marginRight: 20}} size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                  </List.Item>
                :
                <List.Item className="tw-text-center" style={{ }}>
                    <Space>
                    <Button type="primary">Button</Button>
                    
                  </Space>
                  </List.Item>
              )}
            /> */}

          <ProChat
              style={{ height: "100%" }}
              helloMessage={
                '欢迎使用 好客来 ，我是你的专属机器人'
              }
              request={async (messages: string | any[]) => {
                setTimeCounter(-1)
                let mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
                setData(undefined)
                ListHakkelaiApi(messages).payload.then((r) => {
                  const d:ApiValueResponse = (r as ApiResponse).value
                  mockedData = d.answer_text
                  setData(d)
                });
                await sleep(12000);
                return new Response(mockedData);
              }}
            />
          </Layout>
          <Divider type="vertical" />
          <Layout.Sider width={450} style={{ padding: '5px 5px', background: "#ffffff"}}>
            {apidata && apidata.rec_reasons_A.length !== 0 ? <>
              <Space>
                <Divider style={{  borderColor: '#7cb305' }}>知识图谱推理</Divider>
              </Space>
              <Steps
                direction="vertical"
                size="small"
                current={timeCounter - 1}
                items={apidata.rec_reasons_A}
              />
            </> : null}
            {apidata && apidata.rec_reasons_B.length !== 0 ? <>
              <Space>
                <Divider style={{  borderColor: '#7cb305' }}>搜索排序</Divider>
              </Space>
            
              <Steps
                direction="vertical"
                size="small"
                current={timeCounter - 7}
                items={apidata.rec_reasons_B}
              /> 
            </>: null}
            

          </Layout.Sider>
    </Layout>
  </>
}

export default HaokelaiView
