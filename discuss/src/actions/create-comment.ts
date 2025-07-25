"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(10),
});

type CreateCommentFormState = {
  errors: {
    title?: string[];
    content?: string[];
    formError?: string[];
  };
};
export const createComment = async (
  { postId, parentId }: { postId: string; parentId?: string },
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> => {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session?.user || !session.user.id) {
    return {
      errors: {
        formError: ["You are not login. Please login first"],
      },
    };
  }


  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id,
        postId: postId,
        parentId: parentId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["Someting went wrong"],
        },
      };
    }
  }
  const topic = await prisma.topic.findFirst({
    where: {
      posts: { some: { id: postId } },
    },
  });

  if (!topic) {
    return {
      errors: {
        formError: ["Failed to revaildate path"],
      },
    };
  }
  revalidatePath(`/topics/${topic.slug}/posts/${postId}`);
  return {
    errors: {},
  };
};
