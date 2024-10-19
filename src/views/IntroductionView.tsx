'use client'

import { useStore } from "@/store"
import { Button, Avatar, Layout, List, Steps, Divider, Row, Col, Space} from "antd"
import { FC, useEffect, useState } from "react"
interface IProps { }

const IntroductionView: FC<IProps> = ({ }) => {
  const { counter, setCounter } = useStore()
  const [timeCounter, setTimeCounter] = useState<number>(0)
  useEffect(() => {
    function tick() {
      setTimeCounter((v) => v + 1)
    }
    console.log("qqqeqweq")
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
  return <>
    <Layout className="tw-flex"
          style={{ padding: '5px 0', width: "100%", height: "100%"}}
          hasSider={true}
        >
          <Layout style={{ padding: '5px 0', background: "#ffffff"}}>
          <List
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
          />
          </Layout>
          <Divider type="vertical" />
          <Layout.Sider width={350} style={{ padding: '5px 5px', background: "#ffffff"}}>
            <Steps
              direction="vertical"
              size="small"
              current={1}
              items={[
                { title: 'Finished', description },
                {
                  title: 'In Progress',
                  description,
                },
                {
                  title: 'Waiting',
                  description,
                },
              ]}
            />

          </Layout.Sider>
    </Layout>
  </>
}

export default IntroductionView
