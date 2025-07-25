"use client"

import { createSnippet } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";

const CreateSnippetPage = () => {

  const [severActionData, action] = useActionState(createSnippet, {message : ""});


  return (
    <form action={action}>
      <div>
        <Label className="my-2">Title</Label>
        <Input type="text" name="title" id="title" />
      </div>
      <div>
        <Label className="my-2">Code</Label>
        <Textarea name="code" id="code"></Textarea>
      </div>
      { severActionData.message && <div className="p-2 bg-red-300 border-2 border-red-600 mt-2 rounded-md">{severActionData.message}</div>}
      <Button variant={"black"} type="submit" className="my-12">Create Snippet</Button>
    </form>
  );
};

export default CreateSnippetPage;
