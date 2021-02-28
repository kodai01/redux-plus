import React, { useCallback, useEffect } from 'react';
import 'rsuite/dist/styles/rsuite-dark.css';
import {
  fetchComments,
  commentsSelectors,
  deleteComment,
} from './commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import { RootState } from '../../app/store';

const Comments: React.FC = () => {
  const dispatch = useDispatch();
  const total = useSelector(commentsSelectors.selectTotal);

  const onDelete = useCallback((id) => {
    console.log(id);
    dispatch(deleteComment(id));
  }, []);

  console.log('selectAllは', useSelector(commentsSelectors.selectAll));
  console.log(
    'selectEntitiesは',
    useSelector(commentsSelectors.selectEntities)
  );
  console.log('selectIdは', useSelector(commentsSelectors.selectIds));
  console.log('selectTptalは', useSelector(commentsSelectors.selectTotal));
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
        <Comment
          name={comment.name}
          email={comment.email}
          body={comment.body}
          key={comment.id}
          id={comment.id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Comments;
