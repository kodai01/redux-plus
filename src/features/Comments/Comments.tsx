import React, { useEffect } from 'react';
import 'rsuite/dist/styles/rsuite-dark.css';
import { fetchComments } from './commentsSlice';
import { useDispatch } from 'react-redux';

const Comments: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComments());
  }, []);
  return <div></div>;
};

export default Comments;
