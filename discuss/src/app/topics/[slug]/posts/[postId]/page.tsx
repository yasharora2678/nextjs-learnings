import CommentCreateForm from "@/components/comments/CommentCreateForm";
import PostShow from "@/components/posts/PostShow";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import CommentList from "@/components/comments/CommentList";
type PostShowPageProps = {
  params: Promise<{
    slug: string;
    postId: string;
    parentId?: string;
  }>;
};

const PostShowPage: React.FC<PostShowPageProps> = async ({ params }) => {
  const { slug, postId, parentId } = await params;
  return (
    <div className="space-y-3">
      <Link href={`/topics/${slug}/posts`}>
        <Button variant={"link"}>
          <ChevronLeft />
          Back to {slug}
        </Button>
      </Link>
      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} parentId={parentId} startOpen />
      {/* <CommnetShowPage/> */}
      <CommentList postId = {postId}/>
    </div>
  );
};

export default PostShowPage;
