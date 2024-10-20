import { ConfigProvider } from 'antd'
import { ZustandHydration } from '@/store'

import MainLayout from '@/components/MainLayout'
import { AiFillBook } from 'react-icons/ai'

export default function RootTemplate({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ZustandHydration>
      <ConfigProvider theme={{
        components: {
          Layout: {
            headerBg: '#fff',
            triggerBg: '#fff',
            triggerColor: '#000',
            zeroTriggerWidth: 0
          }
        }
      }}>
        <MainLayout
          title='XTransfer Boss'
          menuItems={[
            // {
            //   icon: <AiFillBook />,
            //   label: '增长魔方',
            //   route: '/home'
            // },
            {
              icon: <AiFillBook />,
              label: '好客来',
              route: '/haokelai'
            },
            {
              icon: <AiFillBook />,
              label: '销冠说',
              route: '/huashu'
            },
            {
              icon: <AiFillBook />,
              label: '快复盘',
              route: '/kuaifupan'
            },
            {
              icon: <AiFillBook />,
              label: '早洞察',
              route: '/zaodongcha'
            },
            {
              icon: <AiFillBook />,
              label: '销售物料',
              route: '/sales'
            }
          ]}>
          {children}
        </MainLayout>
      </ConfigProvider>
    </ZustandHydration>
  )
}
