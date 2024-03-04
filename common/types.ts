
// Data format for text annotation
export interface TextAnnotation {
  start: number
  end: number
  tag: string
}

// Task represents a labeling task
export interface Task {
  id?: number,

  // Data contains the data to be labeled
  data: string,

  // Annotations are the currently applied label (currently supported text)
  annotations?: TextAnnotation[],

  // Labeling Template identifier (drives options in UI)
  template: string,
}

export interface TaskService {
  // Fetch retrieves a single task by it's ID
  fetchById: (id: number) => Promise<Task|undefined>

  // Fetch the next task
  navigate: (currId: number, direction: string) => Promise<Task|undefined>

  // Save persists a task
  save: (task: Task) => Promise<Boolean>

  // Count returns total count of tasks
  count: () => Promise<number>
}