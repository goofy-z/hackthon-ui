import { Metadata } from 'next'
import { Flex } from "antd"
import ZhaiyaoView from "@/views/zhaiyao"

export const metadata: Metadata = {
  title: 'Next.js - Home'
}

export default function ZhaiyaoPage() {
  return <>
    <Flex
      vertical
      justify="center"
      align="center"
      className="tw-h-full tw-w-full">
      <ZhaiyaoView/>
    </Flex>
  </>
}
