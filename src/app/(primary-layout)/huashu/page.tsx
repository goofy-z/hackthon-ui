import { Metadata } from 'next'
import { Flex } from "antd"
import HuaShuView from "@/views/huashufuzhu"

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
      <HuaShuView/>
    </Flex>
  </>
}
