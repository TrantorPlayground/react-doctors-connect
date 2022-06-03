import React from 'react';
import { Form, Input } from 'antd';

import { fs } from '../../firebase';
import { iProfile } from '../../interfaces/global';
import { useAppDispatch } from '../../hooks/app';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Form>
      <Input.Group />
      <Form.Item style={{ marginTop: 20 }}>
        <Input.Search
          size="large"
          onSearch={(value) => {
            fs.collection('profiles')
              .where('specialities', 'array-contains', value)
              .where('role', '==', 'doctor')
              .onSnapshot((snapshot) => {
                const tempDocs: iProfile[] = [];
                snapshot.docs.forEach((doc: any) => {
                  tempDocs.push({ ...doc.data(), id: doc.id });
                });
              });
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchBar;
