'use client'

import { FC, ReactNode, useMemo, useState } from "react"
import { Layout as AntdLayout, Menu, theme, Image } from 'antd'
import { AiOutlineMenu } from 'react-icons/ai'
import { MenuItem } from "@/types/layout.type"
import { usePathname, useRouter } from "next/navigation"

interface IProps {
  title?: string,
  menuItems?: MenuItem[],
  children?: ReactNode
}

const MainLayout: FC<IProps> = ({
  title, children, menuItems = []
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const { token: { Layout } } = theme.useToken()
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const antdMenuItems = useMemo(() => {
    return menuItems.map((v) => ({
      key: `${v.route ?? 'default'}`,
      label: v.label,
      icon: v.icon,
      route: v.route
    }))
  }, [menuItems])

  function handleMenuClicked(key: string) {
    const menuItem = antdMenuItems.find(v => v.key === key)
    if (menuItem?.route) {
      router.push(menuItem.route)
    }
  }

  return <AntdLayout style={{ height: '100dvh', fontFamily: "Avenir,Helvetica,Arial,sans-serif"}}>
    <AntdLayout.Header className="
      tw-flex
      tw-gap-2
      tw-p-3
      tw-justify-between
      tw-items-center" style={{height: 56}}>
      {/* <AiOutlineMenu className="tw-cursor-pointer" size={24} onClick={() => setCollapsed(!collapsed)} /> */}
      <div className="
      tw-flex
      tw-gap-2
      tw-items-center
      tw-p-3" style={{height: 56}}>
        <Image src="/statics/logo-boss.png" alt="Ant Design" preview={false} width="60" height="100%"  />
        <div className="tw-text-xl" style={{ color: Layout?.triggerColor ?? '#000'}} >{title}</div>
      </div>

      <div className="
      tw-flex
      tw-gap-2
      tw-items-center
      tw-p-3" style={{height: 56}}>
        {/* <Image src="/statics/logo-boss.png" alt="Ant Design" preview={false} width="60" height="100%"  /> */}
        <div className="tw-text-xm" style={{ color: Layout?.triggerColor ?? '#000'}} >{"Hi! goofy"}</div>
      </div>
      
    </AntdLayout.Header>
    <AntdLayout hasSider >
      <AntdLayout.Sider
        width={200}
        style={{ padding: 0 }}
        collapsible
        breakpoint="md"
        collapsedWidth={0}
        collapsed={collapsed}
        zeroWidthTriggerStyle={{ overflow: 'hidden' }}
        onCollapse={setCollapsed}>
        <Menu
          selectedKeys={[pathname]}
          style={{
            height: '100%',
            background: Layout?.triggerBg ?? '#fff',
            color: Layout?.triggerColor ?? '#000'
          }}
          mode="inline"
          items={antdMenuItems}
          onClick={(e) => handleMenuClicked(e.key)}/>
      </AntdLayout.Sider>
      <AntdLayout.Content
        className="tw-overflow-auto tw-p-4"
        style={{ height: 'calc(100dvh - 64px)' }}>
        {children}
      </AntdLayout.Content>
    </AntdLayout>
  </AntdLayout>
}

export default MainLayout
