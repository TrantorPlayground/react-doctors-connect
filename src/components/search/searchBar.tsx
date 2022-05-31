import React from 'react';
import { Form, Input } from 'antd';

const SearchBar:React.FC = () => (
  <Form>
    <Input.Group />
    <Form.Item style={{ marginTop: 20 }}>
      <Input.Search size="large" />
    </Form.Item>
  </Form>
);

export default SearchBar;
