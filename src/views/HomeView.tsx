'use client'

import { useStore } from "@/store"
import { Button, Avatar, Layout, List, Steps, Divider, Row, Col, Space} from "antd"
import { FC, useEffect, useState } from "react"
import { ProChat } from '@ant-design/pro-chat';
interface IProps { }

const HomeView: FC<IProps> = ({ }) => {
  return <Layout
          style={{ padding: '5px 0', width: "100%", height: "100%"}}
        >
      <ProChat
        style={{ height: "100%" }}
        helloMessage={
          '欢迎使用 增长魔方 ，我是你的专属机器人'
        }
        assistantMeta={{ avatar: '/statics/客服机器人.png', title: '三体世界', backgroundColor: '#67dedd' }}
        request={async (messages) => {
          const mockedData: string = `我不太理解你的意思，我还在成长中，请多包涵～～`;
          return new Response(mockedData);
        }}
      />
  </Layout>
}

export default HomeView
