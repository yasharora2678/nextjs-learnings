import EditSnippetForm from "@/components/EditSnippetForm";
import { prisma } from "@/lib/prisma";
import { Snippet } from "@prisma/client";
import React from "react";


const SnippetEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const id = parseInt((await params).id);

  const snippet: Snippet | null = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  if (snippet) return <EditSnippetForm snippet={snippet} />;
};

export default SnippetEditPage;
