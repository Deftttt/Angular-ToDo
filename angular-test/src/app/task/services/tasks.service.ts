import { Injectable } from "@angular/core";
import { ListFetchingError } from "../../utils/list-state.type";
import { Task } from "../model/Task";
import { wait } from "../../utils/wait";

export type TaskUpdatePayload = {
  completed?: boolean;
  title?: string;
};

@Injectable({ providedIn: "root" })
export class TaskService {
  private URL = "http://localhost:3000";

  async getAll() {
    await wait();

    return fetch(`${this.URL}/tasks`).then<Task[] | ListFetchingError>(
      (response) => {
        if (response.ok) {
          return response.json();
        } else {
          return { state: response.status, message: response.statusText };
        }
      }
    );
  }

  async add(title: string) {
    return fetch(`${this.URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        completed: false,
        createdAt: new Date(),
      } as Task),
    }).then<Task | Error>((response) => {
      if (response.ok) {
        return response.json();
      }
      return Error("Cannot add task");
    });
  }

  async remove(taskId: number) {
    console.log("taskId", taskId);
    return fetch(`${this.URL}/tasks/${taskId}`, {
      method: "DELETE",
    }).then<Task | Error>((response) => {
      if (response.ok) {
        return response.json();
      }
      return Error("Cannot delete task");
    });
  }

  async update(taskId: number, payload: TaskUpdatePayload) {
    return fetch(`${this.URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then<Task | Error>((response) => {
      if (response.ok) {
        return response.json();
      }
      return Error("Cannot update task");
    });
  }
}
