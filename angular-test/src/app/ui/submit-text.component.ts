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
        class="border-b-2 border-violet-700 outline-none"
      />
      <button
        (click)="submitText.emit(taskNameInput.value); taskNameInput.value = ''"
        class="border-2 border-violet-700 ml-4 px-4 font-bold"
      >
        Add task
      </button>
      <div></div>
    </div>
  `,
  styles: ``,
})
export class SubmitTextComponent {
  @Output() submitText = new EventEmitter<string>();
}
