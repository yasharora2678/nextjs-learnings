"use client";

import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { createPost } from "@/actions/create-post";

type CreatePostFormProps = {
 slug: string
}

const PostCreateForm : React.FC<CreatePostFormProps> = ({slug}) => {
  const [formState, action] = useActionState(createPost.bind(null, slug), { errors: {} });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Create a Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Add Posts on which you want to discuss
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3 mt-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" />
              </div>
              {formState.errors.title && (
                <p className="text-sm text-red-600">{formState.errors.title}</p>
              )}
              <div className="grid gap-3">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" />
              </div>
              {formState.errors.content && (
                <p className="text-sm text-red-600">
                  {formState.errors.content}
                </p>
              )}
              {formState.errors.formError && (
                <div className="border border-red-600 bg-red-200 p-2 rounded">
                  {formState.errors.formError}
                </div>
              )}
            </div>
            <DialogFooter className="mt-3">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default PostCreateForm;
