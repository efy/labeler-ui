import { openDb } from "@/db/db";
import TaskServer from "@/service/TaskServer"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const db = await openDb();
  const taskService = new TaskServer(db);

  const params = request.nextUrl.searchParams

  const currId = params.get('currId')
  const direction = params.get('direction')

  const currIdParsed = parseInt(currId!);

  try {
    const task = await taskService.navigate(currIdParsed, direction!);

    if (!task) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(task);
  } catch(err) {
    return new NextResponse("Error", {status: 500})
  }
}