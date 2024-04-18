import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
``;
import { TasksListPageComponent } from "./task/tasks-list.page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TasksListPageComponent, RouterOutlet],
  template: `
    <h1 class="text-violet-700 uppercase py-4 text-2xl text-center font-bold">
      ToDo list
    </h1>
    <main class="grid place-items-center pt-4">
      <app-tasks-list-page />
    </main>
    <router-outlet />
  `,
})
export class AppComponent {}
