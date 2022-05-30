import React from 'react'
import { Col, Layout, Row } from 'antd'
import Header from '../../layout/header'
import SearchBar from '../search/searchBar'

const Home: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout.Content>
            <Row>
                <Col span={24}>
                <SearchBar/>
                </Col>
            </Row>
      </Layout.Content>
    </Layout>
  )
}

export default Home