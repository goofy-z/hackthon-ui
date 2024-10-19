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
          '欢迎使用 ProChat ，我是你的专属机器人'
        }
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
          return new Response(mockedData);
        }}
      />
  </Layout>
}

export default HomeView
