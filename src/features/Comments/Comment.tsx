import React from 'react';
import { ButtonToolbar, Panel, Button } from 'rsuite';
import { isPropertyAccessExpression } from 'typescript';
import PropTypes from 'prop-types';

type Props = {
  name: string;
  email: string;
  body: string;
  id: number;
  onDelete: (id: number) => void;
};

const Comment: React.FC<Props> = (props) => {
  return (
    <Panel style={{ color: 'white' }}>
      <ButtonToolbar>
        <Button onClick={() => props.onDelete(props.id)}>ボタン</Button>
      </ButtonToolbar>
      <p>ID{props.id}</p>
      <p>送信{props.email}</p>
      <p>差出人{props.name}</p>
      <p>文章{props.body}</p>
    </Panel>
  );
};

Comment.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default Comment;
