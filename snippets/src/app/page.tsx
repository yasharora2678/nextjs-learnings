import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

//  export const dynamic = "force-dynamic"; // no caching i want fresh data everytime
// export const revalidate = 0; time based caching every 0 s i want fresh data

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

    return (
      <div>
        <div className="flex items-center justify-between border-2 solid font-bold p-2">
          <h1>Snippets</h1>
          <Link href={"/snippet/new"}>
            <Button variant={"black"}>New</Button>
          </Link>
        </div>
        {snippets.map((snippet: {id: number, title: string, code: string}) => {
          return (
            <div key={snippet.id} className="flex items-center justify-between my-2 bg-gray-200 rounded-md p-2">
              <h1>{snippet.title}</h1>
              <Link href={`/snippet/${snippet.id}`}>
                <Button variant={'link'}>View</Button>
              </Link>
            </div>
          );
        })}
      </div>
    );
}
