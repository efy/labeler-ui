import { Task, TaskService } from '@/common/types';

class TaskClient implements TaskService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchById(id: number): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/api/tasks/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return response.json();
  }

  async navigate(currId: number, direction: string): Promise<Task|undefined> {
    const response = await fetch(`${this.baseUrl}/api/tasks/navigate?currId=${currId}&direction=${direction}`);

    if(response.status === 404) {
      return undefined;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }

    return response.json();
  }

  async save(task: Task): Promise<Boolean> {
    const response = await fetch(`${this.baseUrl}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.ok;
  }

  async count(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/api/tasks/count`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return response.json();
  }
}

export default TaskClient;