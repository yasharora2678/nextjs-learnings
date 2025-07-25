import { fetchCommentOfPost } from "@/lib/query/comment";
import { Avatar } from "@radix-ui/react-avatar";
import { notFound } from "next/navigation";
import React from "react";
import CommentCreateForm from "./CommentCreateForm";

type CommentShowProps = {
  postId: string;
  commentId: string;
};
const CommentShow: React.FC<CommentShowProps> = async ({
  postId,
  commentId,
}) => {
  const comments = await fetchCommentOfPost(postId);

  const comment = comments.find((c) => c.id == commentId);
  if (!comment) notFound();
  const children = comments.filter((c) => c.parentId === commentId);
  return (
    <div className="m-4 p-4 border">
      <div className="flex gap-3">
        <div className="flex-1 space-y-3">
          <p className="text-gray-500 text-sm font-medium">
            {comment.user.name}
          </p>
          <p className="text-gray-800">{comment.content}</p>
          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      {children.map((comment) => (
        <CommentShow key={comment.id} postId={postId} commentId={comment.id} />
      ))}
    </div>
  );
};

export default CommentShow;
