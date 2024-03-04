import { openDb } from "@/db/db";
import TaskServer from "@/service/TaskServer"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const db = await openDb();
  const taskService = new TaskServer(db);

  try {
    const taskCount = await taskService.count();

    if (!taskCount) {
      return NextResponse.json(0);
    }

    return NextResponse.json(taskCount);
  } catch(err) {
    return new NextResponse("Error", {status: 500})
  }
}