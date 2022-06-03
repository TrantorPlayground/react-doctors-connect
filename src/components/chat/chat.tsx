import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import { iProfile } from '../../interfaces/global';
import Messages from './messages';
import { auth, fs } from '../../firebase';

interface iLocation {
  state: {
    doctor: iProfile;
  }
}

const Chat: React.FC<{receiver:string}> = ({ receiver }) => {
  const ChatWindow = styled.div`position: fixed;
    width: 250px;
    z-index: 11;
    bottom: 0;
    padding: 0;
    right: 15%;
    border: 1px solid #ccc;`;

  const ChatUI = styled.div`display: grid`;
  const MessagesUI = styled.div`height: 300px;`;
  const [form] = Form.useForm();

  return (
    <ChatWindow>
      <ChatUI>
        <MessagesUI><Messages messages={[]} /></MessagesUI>
        <div>
          <Form form={form}>
            <Form.Item
              name="message"
              style={{
                marginBlock: 0,
              }}
            >
              <Input.TextArea
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    fs.collection(`messages/${auth.currentUser?.uid}/${receiver}`).add({
                      message: form.getFieldValue('message'),
                      uid: auth.currentUser?.uid,
                      timestamp: Date.now(),
                      receivedId: receiver,
                      viewed: false,
                    }).then(() => {
                      form.setFieldsValue({ message: '' });
                      fs.collection(`profiles/${receiver}`);
                    })
                      .catch((error) => {
                      //
                      });
                  }
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </ChatUI>
    </ChatWindow>
  );
};

export default Chat;
