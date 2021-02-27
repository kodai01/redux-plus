import React from 'react';
import { ButtonToolbar, Panel, Button } from 'rsuite';

type Props = {
  name: string;
  email: string;
  body: string;
};

const Comment: React.FC<Props> = (props) => {
  return (
    <Panel style={{ color: 'white' }}>
      <ButtonToolbar>
        <Button size="lg">ボタン</Button>
      </ButtonToolbar>
      <p>送信{props.email}</p>
      <p>差出人{props.name}</p>
      <p>文章{props.body}</p>
    </Panel>
  );
};

export default Comment;
