import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
``;
import { TasksListPageComponent } from "./task/tasks-list.page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TasksListPageComponent, RouterOutlet],
  template: `
    <h1 class="text-xl text-center">ToDo list</h1>
    <app-tasks-list-page />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
