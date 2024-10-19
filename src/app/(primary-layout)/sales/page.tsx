import { Metadata } from 'next'
import { Flex } from "antd"
import SalesView from "@/views/SalesView"

export const metadata: Metadata = {
  title: 'Next.js - Home'
}

export default function SalesPage() {
  return <>
    <Flex
      vertical
      justify="center"
      align="center"
      className="tw-h-full tw-w-full">
      <SalesView/>
    </Flex>
  </>
}
