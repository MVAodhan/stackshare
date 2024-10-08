"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { getOctokitInstance } from "@/lib/utils";

const getRepoSchema = z.object({
  repo: z.string().url().startsWith("https://github.com"),
});

export const getRepoDepsAction = actionClient
  .schema(getRepoSchema)
  .action(async ({ parsedInput: { repo } }) => {
    if (repo) {
      const segments = repo.split("/");

      const octokit = getOctokitInstance(process.env.GH_API_TOKEN!);

      const res = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: segments[3],
          repo: segments[4],
          path: "package.json",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const jsonString = atob(res.data.content);

      return { payload: jsonString };
    }

    return { payload: null };
  });
