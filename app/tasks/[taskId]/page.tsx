"use client"

import { useState, useEffect } from "react"
import { Task, TextAnnotation } from "@/common/types";
import TaskClient from "@/service/TaskClient";
import { Button, Divider, Skeleton, Space, Title, Group, Box, Text } from "@mantine/core";
import { EntityLabeler } from "@/components/EntityLabeler/EntityLabeler";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultLabels = [
  {label: 'City', color: "yellow"},
  {label: 'Organisation', color: "blue"}, 
  {label: 'Time', color: "orange"},
  {label: 'Misc', color: "green"},
]

const ecommLabels = [
  {label: 'Category', color: "yellow"},
  {label: 'Sub Category', color: "blue"}, 
  {label: 'Brand', color: "orange"},
  {label: 'Quantity', color: "green"},
]

export default function Page({ params }: { params: { taskId: number} }) {
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [nextTask, setNextTask] = useState<Task|undefined>();
  const [prevTask, setPrevTask] = useState<Task|undefined>()
  const [saving, setSaving] = useState(false);
  const [count, setCount] = useState(0);

  const router = useRouter();

  const taskClient = new TaskClient("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const count = await taskClient.count();
        setCount(count);

        const currTask = await taskClient.fetchById(params.taskId);
        setTask(currTask);

        const nextTask = await taskClient.navigate(currTask.id!, "next");
        setNextTask(nextTask);

        const prevTask = await taskClient.navigate(currTask.id!, "prev");
        setPrevTask(prevTask);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err);
      }
    }

    loadData()
  }, [])

  const handleSave = async (annotations: TextAnnotation[]) => {
    const newTask = {
      ...task!,
      annotations
    }

    setSaving(true)

    const ok = await taskClient.save(newTask);
    if(!ok) {
      // TODO handle this
    }
    setTask(newTask);
    setSaving(false);
  }

  return (
    <>
      <Group justify="space-between">
      <Title>Task {task?.id} of {count}</Title>
        <Link href="/tasks/create">
          <Button color="blue" size="xs">New</Button>
        </Link>
      </Group>
      <Space h="md" />
      <Skeleton visible={loading}>
        {error !== null && <>Error</>}
        {error === null && task &&
          <EntityLabeler 
            labels={task.template === "E-Commerce" ? ecommLabels : defaultLabels} 
            text={task.data} 
            annotations={task.annotations || []}
            onUpdate={handleSave}
          />
        }
      </Skeleton>
      <Space h="md" />
      <Divider />
      <Space h="md" />
      <Group justify="space-between">
        <Box>
          <Link href={`/tasks/${prevTask?.id}`}>
            <Button color="black" variant="outline" disabled={!prevTask?.id}>Previous</Button>
          </Link>
        </Box>
        <Link href={`/tasks/${nextTask?.id}`}>
          <Button color="black" variant="outline" disabled={!nextTask?.id} >Next</Button>
        </Link>
      </Group>
    </>
  )
}