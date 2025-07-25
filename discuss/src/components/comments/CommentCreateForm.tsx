"use client";

import React, { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/create-comment";

type CommentProps = {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
};

const CommentCreateForm: React.FC<CommentProps> = ({
  postId,
  parentId,
  startOpen,
}) => {
  const [formState, action] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );
  const [open, setOpen] = useState(startOpen);
  return (
    <div>
      <Button size="sm" variant="link" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && (
        <form action={action} className="space-y-2">
          <Textarea
            name="content"
            placeholder="write a comment.."
            className="bg-gray-100 focus-visible:ring-0"
          />
          {formState.errors.content && (
            <p className="text-red-600 text-sm">{formState.errors.content}</p>
          )}
          {formState.errors.formError && (
            <div className="bg-red-200 text-sm p-2 rounded-md">
              {formState.errors.formError}
            </div>
          )}
          <Button size={"sm"} variant={"secondary"}>
            Save
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentCreateForm;
