"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { editSnippet } from "@/actions";
import { Snippet } from "@prisma/client";

const EditSnippetForm = ({ snippet }: {snippet: Snippet}) => {
  console.log(snippet, "SNippet------------------------->")
  const [code, setCode] = useState(snippet.code);

  const changeEventHandler = (value: string = "") => {
    setCode(value);
  }

  if (!snippet)
    return (
      <div>
        <Editor
          height="40vh"
          defaultLanguage="javascript"
          defaultValue="No Code To Display"
        />
      </div>
    );

  const saveSnippetAction = editSnippet.bind(null, snippet.id, code);
  return (
    <form action={saveSnippetAction}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">Your Code Editor</h1>
          <Button type="submit" variant={"black"}>
            Submit
          </Button>
        </div>
        <div>
          <Editor
            height="40vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue={code}
            onChange={changeEventHandler}
          />
        </div>
      </div>
    </form>
  );
};

export default EditSnippetForm;
