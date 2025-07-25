import { Comment } from "@prisma/client";
import { prisma } from "..";
import { cache } from "react";

export type CommentWithData = Comment & {
  user: { name: string | null };
};

export const fetchCommentOfPost = cache(
  (postId: string): Promise<CommentWithData[]> => {
    console.log("fetch comments by post id is called");
    return prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: { select: { name: true } },
      },
    });
  }
);
