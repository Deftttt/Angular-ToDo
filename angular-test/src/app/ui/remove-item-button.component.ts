import { Component, EventEmitter, Output } from "@angular/core";
import { featherTrash2 } from "@ng-icons/feather-icons";
import { NgIconComponent, provideIcons } from "@ng-icons/core";

@Component({
  selector: "app-remove-item-button",
  standalone: true,
  imports: [NgIconComponent],
  template: `
    <button
      (click)="remove.emit()"
      class="flex hover:bg-white hover:rounded-full"
    >
      <ng-icon name="featherTrash2" class="icon--hover" />
    </button>
  `,
  viewProviders: [provideIcons({ featherTrash2 })],
})
export class RemoveItemButtonComponent {
  @Output() remove = new EventEmitter<void>();
}
