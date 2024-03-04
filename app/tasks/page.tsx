"use client"

import { Task } from "@/common/types";
import TaskClient from "@/service/TaskClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const taskClient = new TaskClient("");
  const [firstTask, setFirstTask] = useState<Task|undefined>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const count = await taskClient.count();
      setCount(count);

      const task = await taskClient.navigate(0, "next");
      setFirstTask(task);
    }

    loadData()
  }, [])

  return (
    <>
      { firstTask?.id &&
        <Link href={`/tasks/${firstTask?.id}`}>Label</Link>
      }
      <Link href={`/tasks/create`}>Create Tasks</Link>
    </>
  )
}