import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-submit-text",
  standalone: true,
  imports: [],
  template: `
    <div>
      <input
        #taskNameInput
        (keyup.enter)="
          submitText.emit(taskNameInput.value); taskNameInput.value = ''
        "
        class="border-b"
        type="text"
        placeholder="Add a new task"
      />
      <button
        (click)="submitText.emit(taskNameInput.value); taskNameInput.value = ''"
        class="border"
      >
        Add
      </button>
      <div></div>
    </div>
  `,
  styles: ``,
})
export class SubmitTextComponent {
  @Output() submitText = new EventEmitter<string>();
}
