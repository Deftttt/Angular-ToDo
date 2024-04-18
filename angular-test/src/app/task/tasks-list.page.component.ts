import { Component, inject } from "@angular/core";
import { Task } from "./model/Task";
import { SubmitTextComponent } from "../ui/submit-text.component";
import { TasksListComponent } from "./ui/tasks-list.component";
import { NgIf } from "@angular/common";
import { TaskService } from "./services/tasks.service";
import { ComponentState } from "../utils/list-state.type";

@Component({
  selector: "app-tasks-list-page",
  standalone: true,
  imports: [SubmitTextComponent, TasksListComponent, NgIf],
  template: `
    <app-submit-text
      *ngIf="listState.state === 'success'"
      (submitText)="addTask($event, listState.data)"
    >
    </app-submit-text>

    <app-tasks-list
      *ngIf="listState.state === 'success'"
      [tasks]="listState.data"
    >
    </app-tasks-list>

    <p *ngIf="listState.state === 'loading'">Loading...</p>
    <p *ngIf="listState.state === 'error'">
      Error: {{ listState.error.message }}
    </p>
  `,
  styles: ``,
})
export class TasksListPageComponent {
  listState: ComponentState<Task> = { state: "idle" };
  private taskService = inject(TaskService);

  ngOnInit() {
    this.listState = { state: "loading" };
    this.taskService.getAll().then((response) => {
      if (Array.isArray(response)) {
        this.listState = { state: "success", data: response };
        console.log("response", response);
      } else {
        this.listState = { state: "error", error: response };
      }
    });
  }

  addTask(title: string, tasks: Task[]) {
    this.taskService.add(title).then((response) => {
      if ("id" in response) {
        this.listState = { state: "success", data: tasks.concat(response) };
      } else {
        alert(response.message);
      }
    });
  }
}
