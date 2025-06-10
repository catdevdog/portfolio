// app/api/notion/route.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  // const data = await notion.databases.retrieve({
  //   database_id: "20e40554512480069de0dadaf0848a60",
  // });

  const data = await notion.databases.query({
    database_id: "20e40554512480069de0dadaf0848a60",
  });

  return Response.json(data);
}
