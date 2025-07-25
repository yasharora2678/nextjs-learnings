import React from 'react'
import CommentShow from './CommentShow';
import { fetchCommentOfPost } from '@/lib/query/comment';

type CommentListProps = {
    postId: string;
}
const CommentList : React.FC<CommentListProps> = async ({postId}) => {
 const comments = await fetchCommentOfPost(postId);
 const topLevelComments = comments.filter((comment) => comment.parentId == null);
  return (
    <div>
      CommentList - {postId}
      <h1 className='font-bold text-lg'> All Comments </h1>
      {
        topLevelComments.map((comment) => (
            <CommentShow key={comment.id} postId={comment.postId} commentId={comment.id}/>
        ))
      }
    </div>
  )
}

export default CommentList
