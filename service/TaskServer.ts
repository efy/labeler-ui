import { Task, TaskService } from "@/common/types";
import { Database } from "sqlite";

// Convert Task object to database format
const taskToDbFormat = (task: Task) => {
  return {
    id: task.id || null,
    data: task.data,
    annotations: JSON.stringify(task.annotations),
    template: task.template
  };
};

// Convert database format to Task object
const dbFormatToTask = (dbTask: any): Task => {
  return {
    id: dbTask.id || null,
    data: dbTask.data,
    annotations: JSON.parse(dbTask.annotations) || [],
    template: dbTask.template
  };
};

class TaskServer implements TaskService {
  constructor(private readonly db: Database){}

  async fetchById(id: number): Promise<Task|undefined> {
    const dbTask = await this.db.get('SELECT * FROM Task WHERE id = ? LIMIT 1', [id]);
    if(!dbTask) return undefined;
    return dbFormatToTask(dbTask);
  }

  async navigate(currId: number, direction: string): Promise<Task|undefined> {
    let dbTask;

    if(direction === "next") {
      dbTask = await this.db.get('SELECT * FROM Task WHERE id > ? ORDER BY id ASC LIMIT 1;', [currId]);
    }

    if(direction === "prev") {
      dbTask = await this.db.get('SELECT * FROM Task WHERE id < ? ORDER BY id DESC LIMIT 1;', [currId]);
    }

    if(!dbTask) {
      return undefined;
    }

    return dbFormatToTask(dbTask);
  }

  async save(task: Task): Promise<Boolean> {
    const upsertTaskQuery = `
    INSERT INTO Task (id, data, annotations, template) 
    VALUES (?, ?, ?, ?) 
    ON conflict(id) DO UPDATE SET
      data = excluded.data,
      annotations = excluded.annotations,
      template = excluded.template;
    `

    const { id, data, annotations, template } = taskToDbFormat(task);

    try {
      const result = await this.db.run(
        upsertTaskQuery,
        [id, data, annotations, template]
      );

      return true;
    } catch (error) {
      console.error('Failed to save task:', error);
      return false;
    }
  }

  async count(): Promise<number> {
    const result = await this.db.get('SELECT COUNT(1) as count FROM Task;');
    return result?.count;
  }
}



export default TaskServer;