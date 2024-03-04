import { openDb } from "@/db/db";
import TaskServer from "@/service/TaskServer"; 
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: {id: number }}) {
  const db = await openDb();
  const taskService = new TaskServer(db);

  try {
    const task = await taskService.fetchById(params.id);

    if (!task) {
      return Response.json({
        message: "Not found",
        status: 404
      });
    }

    return Response.json(task);
  } catch(err) {
    return Response.json({
      message: "Error",
      status: 500
    });
  }
}