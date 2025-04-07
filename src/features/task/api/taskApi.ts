import axiosInstance from "../../../shared/api/axiosInstance";
import { Task } from "../../../entities/task/types";

export interface FetchTasksParams {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  date?: string;
  userTasksOnly?: boolean;
}

export interface TasksResponse {
  items: Task[];
  total: number;
}

export const fetchTasks = async (
  params?: FetchTasksParams
): Promise<TasksResponse> => {
  const response = await axiosInstance.get<TasksResponse>("/tasks", { params });
  return response.data;
};

export const fetchTask = async (id: string): Promise<Task> => {
  const response = await axiosInstance.get<Task>(`/tasks/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance.post<Task>("/tasks", taskData);
  return response.data;
};

// Update an existing task
export const updateTask = async (
  id: string,
  taskData: Partial<Task>
): Promise<Task> => {
  const response = await axiosInstance.put<Task>(`/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${id}`);
};
