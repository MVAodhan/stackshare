"use client";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRepoDepsAction } from "@/app/submit-repo";

export function CardWithForm() {
  const repoRef = useRef<HTMLInputElement | null>(null);

  const submitRepo = async () => {
    const repo = repoRef.current?.value as string;
    const res = await getRepoDepsAction({
      repo,
    });

    console.log(res);
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Submit a Repo</CardTitle>
        <CardDescription>
          Submit your repo, to share your stack your way{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="repo">Repo</Label>
            <Input
              id="repo"
              type="text"
              placeholder="e.g https://github.com/<username>/<repo> "
              ref={repoRef}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={submitRepo}>Submit Repo</Button>
      </CardFooter>
    </Card>
  );
}