import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RemoveItemButtonComponent } from "@ui/remove-item-button.component";
import { AutosizeTextareaComponent } from "@ui/autosize-textarea.component";
import { NgIconComponent } from "@ng-icons/core";
import { Task } from "../model/Task";
import { NgIf } from "@angular/common";
import { TaskUpdatePayload } from "../services/tasks.service";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [
    RemoveItemButtonComponent,
    AutosizeTextareaComponent,
    NgIconComponent,
    NgIf,
  ],
  template: `
    <div
      class="rounded-md shadow-md p-4 block"
      [class.bg-green-300]="task.completed"
    >
      <button
        class="w-full"
        (click)="!editMode && handleSingleClick()"
        (dblclick)="switchToEditMode()"
      >
        <header class="flex justify-end">
          <app-remove-item-button (remove)="delete.emit()" />
        </header>
        <section class="text-left">
          <app-autosize-textarea
            *ngIf="editMode; else previewModeTemplate"
            (keyup.escape)="editMode = false"
            (submitText)="taskTitleEdited($event)"
            [value]="task.title"
          />

          <ng-template #previewModeTemplate>
            <span [class.line-through]="task.completed">
              {{ task.title }}
              {{ task.id }}
            </span>
          </ng-template>
        </section>
        <footer class=" pt-2 flex items-center justify-end">
          <ng-icon name="featherCalendar" class="text-sm" />
        </footer>
      </button>
    </div>
  `,
  styles: ``,
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() delete = new EventEmitter<void>();
  @Output() update = new EventEmitter<TaskUpdatePayload>();

  editMode = false;
  isSingleClick = true;

  taskTitleEdited(title: string) {
    this.update.emit({ title: title });
    this.editMode = false;
  }

  handleSingleClick() {
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.update.emit({ completed: !this.task.completed });
      }
    }, 150);
  }

  switchToEditMode() {
    this.isSingleClick = false;
    this.editMode = true;
  }
}
