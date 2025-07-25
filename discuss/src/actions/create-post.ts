"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(
      /^[a-z-]+$/,
      "Must be lowercase letters and hyphens only, without spaces"
    ),
  content: z.string().min(10),
});

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    formError?: string[];
  };
};
export const createPost = async (
  slug: string,
  prevState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> => {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
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

  let post : Post;
  const topic = await prisma.topic.findUnique({
    where:{slug}
  })

  if(!topic) {
        return {
      errors: {
        formError: ["Topic not found"],
      },
    };
  }
  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id
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
  revalidatePath(`/topics/${slug}`);
  redirect(`/topics/${slug}/posts/${post.id}`);
};
