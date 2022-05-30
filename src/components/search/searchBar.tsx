import React from 'react';
import { Form, Input } from 'antd';

const SearchBar:React.FC = () => (
  <Form>
    <Input.Group />
    <Form.Item>
      <Input.Search />
    </Form.Item>
  </Form>
);

export default SearchBar;
