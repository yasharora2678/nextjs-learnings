import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteSnippet } from "@/actions";
import { Snippet } from "@prisma/client";

const SnippetDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);
  const deleteSnippetAction = deleteSnippet.bind(null, id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) notFound();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Title - {snippet.title}</h1>
        <div className="flex items-center gap-2">
          <Link href={`/snippet/${id}/edit`}>
            <Button variant={"black"}>Edit</Button>
          </Link>
          <form action={deleteSnippetAction}>
            <Button variant={"black"} type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
      <pre className="border-2 p-3 bg-gray-200 rounded-sm">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;

export async function generateStaticParams() {
  const snippets: Snippet[] | [] = await prisma.snippet.findMany();

  return snippets.map((snippet) => {
    return { id: snippet.id.toString() };
  });
}
