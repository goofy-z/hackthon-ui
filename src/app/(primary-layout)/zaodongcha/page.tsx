import { Metadata } from 'next'
import { Flex } from "antd"
import YinGuoView from "@/views/yinguo"

export const metadata: Metadata = {
  title: 'Next.js - Home'
}

export default function HuaShuPage() {
  return <>
    <Flex
      vertical
      justify="center"
      align="center"
      className="tw-h-full tw-w-full">
      <YinGuoView/>
    </Flex>
  </>
}
