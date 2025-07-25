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
import { createTopics } from "@/actions/create-topic";

const TopicCreateForm = () => {
  const [formState, action] = useActionState(createTopics, { errors: {} });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">New Topic</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create Topic</DialogTitle>
              <DialogDescription>
                Add topics on which you want to discuss
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3 mt-2">
                <Label htmlFor="name">Topic Name</Label>
                <Input id="name" name="name" />
              </div>
              {formState.errors.name && (
                <p className="text-sm text-red-600">{formState.errors.name}</p>
              )}
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>
              {formState.errors.description && (
                <p className="text-sm text-red-600">
                  {formState.errors.description}
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

export default TopicCreateForm;
