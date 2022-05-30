import React from 'react'
import { Form, Input } from 'antd'

const SearchBar:React.FC = () => {
  return (
    <Form>
      <Input.Group>

      </Input.Group>
      <Form.Item>
        <Input.Search></Input.Search>
      </Form.Item>
    </Form>
  )
}

export default SearchBar