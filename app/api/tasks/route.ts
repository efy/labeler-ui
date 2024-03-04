import { NextRequest } from "next/server";

import { openDb } from "@/db/db";
import TaskServer from "@/service/TaskServer"; 

// Task creation handler
export async function POST(request: NextRequest) {
  const db = await openDb();
  const taskService = new TaskServer(db);

  try {
    const taskPayload = await request.json();
    const ok = await taskService.save(taskPayload);


    if (!ok) {
      return new Response("Error", {status: 500});
    }

    return Response.json(ok);
  } catch(err) {
    return new Response("Error", {status: 500});
  }
}