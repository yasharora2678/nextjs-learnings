import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostWithData } from "@/lib/query/post";
import Link from "next/link";

type PostListProps = {
  fetchData: () => Promise<PostWithData[]>;
};
const PostList: React.FC<PostListProps> = async ({ fetchData }) => {
  const posts = await fetchData();
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <h1>By {post.user?.name}</h1>
              <h1>{post._count.comments} comments</h1>
              <Link href={`/topics/${post.topic.slug}/posts/${post.id}`}>Go to Post</Link>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
