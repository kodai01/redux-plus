import React, { useEffect } from 'react';
import 'rsuite/dist/styles/rsuite-dark.css';
import { fetchComments, commentsSelectors } from './commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
// import Comment from './Comment';
import { RootState } from '../../app/store';

const Comments: React.FC = () => {
  const dispatch = useDispatch();
  const total = useSelector(commentsSelectors.selectTotal);
  type Item = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  };
  console.log(useSelector(commentsSelectors.selectAll));
  const allComments = useSelector((state: RootState) => {
    return commentsSelectors.selectAll(state);
  });

  useSelector(commentsSelectors.selectAll);

  console.log(allComments);
  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return (
    <div>
      {allComments.map((comment) => (
        <div key={comment.id}>
          メール：{comment.email} <br />
          本文：{comment.body}
        </div>
      ))}
    </div>
  );
};

export default Comments;
