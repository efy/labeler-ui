"use client"

import { Task } from "@/common/types";
import TaskClient from "@/service/TaskClient";
import { Textarea, Button, Title, Container, Space, Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useState } from "react";
import { notifications } from "@mantine/notifications";

export default function Page() {
  const taskClient = new TaskClient("");

  const form = useForm<Task>({
    initialValues: {
      data: '',
      template: 'Default'
    },

    validate: {
      data: (d) => d.length < 10 ? "Must be longer than 10 characters": null,
    }
  });

  const [loading, setLoading] = useState(false);

  // Adds a new task and clears the 'data' element for quick input
  const handleSubmit = async (values: Task) => {
    const ok = await taskClient.save(values);
    if (!ok) {
      notifications.show({
        title: "Failed to create task",
        message: values.data.substr(0, values.data.length > 20 ? 20 : values.data.length),
        color: 'red'
      });
      return;
    }

    notifications.show({
      title: "Created task",
      message: values.data.substr(0, values.data.length > 20 ? 20 : values.data.length),
      color: 'green'
    });

    form.reset();
  }

  return (
    <>
      <Container maw={600}>
        <Title>New Labeling Task</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Space h="md" />
          <Textarea
            label="Data"
            required
            placeholder="Add text you'd like labeled"
            {...form.getInputProps('data')}
          />
          <Space h="md" />
          <Select
            label="Template"
            defaultValue="Default"
            data={["Default", "E-Commerce"]}
            {...form.getInputProps('template')}
          />
          <Space h="md" />
          <Button disabled={!form.isValid() || loading} type="submit">Add</Button>
        </form>
      </Container>
    </>
  )
}