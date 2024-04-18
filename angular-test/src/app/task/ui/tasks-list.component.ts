import { Component, Input, inject } from "@angular/core";
import { Task } from "../model/Task";
import { NgFor, NgIf } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherCalendar } from "@ng-icons/feather-icons";
import { RemoveItemButtonComponent } from "@ui/remove-item-button.component";
import { AutosizeTextareaComponent } from "@ui/autosize-textarea.component";
import { TaskService, TaskUpdatePayload } from "../services/tasks.service";
import { TaskCardComponent } from "./task-card.component";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  viewProviders: [provideIcons({ featherCalendar })],
  imports: [
    NgFor,
    NgIconComponent,
    NgIf,
    RemoveItemButtonComponent,
    AutosizeTextareaComponent,
    TaskCardComponent,
  ],
  template: `
    <ul>
      <li *ngFor="let task of tasks" class="mb-2">
        <app-task-card
          [task]="task"
          (delete)="deleteTask(task.id)"
          (update)="updateTask(task.id, $event)"
        ></app-task-card>
      </li>
    </ul>
  `,
  styles: [],
})
export class TasksListComponent {
  @Input({ required: true }) tasks: Task[] = [];

  private taskService = inject(TaskService);

  deleteTask(taskId: number) {
    this.taskService.remove(taskId).then((res) => {
      if (res instanceof Error) {
        alert(res.message);
      } else {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      }
    });
  }

  updateTask(taskId: number, updatedTask: TaskUpdatePayload) {
    this.taskService.update(taskId, updatedTask).then((res) => {
      if (res instanceof Error) {
        alert(res.message);
      } else {
        this.tasks = this.tasks.map((task) => {
          if (task.id === res.id) {
            return res;
          } else {
            return task;
          }
        });
      }
    });
  }
}
