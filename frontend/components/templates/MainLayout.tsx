import { Layout } from 'antd'
import * as React from 'react'

import Footer from '@app/components/organisms/Footer'
import Header from '@app/components/organisms/Header'

const MainLayout: React.SFC = ({ children }) => (
  <Layout className="layout">
    <Layout.Header>
      <Header />
    </Layout.Header>
    <Layout>
      <Layout.Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Footer />
      </Layout.Footer>
    </Layout>
  </Layout>
)

export default MainLayout
