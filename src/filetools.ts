import * as glob from "@actions/glob";
import node_path from "node:path";

export async function getPITReportFiles(path: string) : Promise<Array<string>> {
   const files = await (await glob.create(path)).glob();

   if (files.length == 0) {
     throw new Error(`No matching files found for ${path}`);
   }

   return files.map((file) => node_path.relative(process.cwd(), file))
}