import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { IListItens } from '../../interface/IListItens.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-input-add-item',
  imports: [CommonModule],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.css'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef)

  @ViewChild("inputText") inputText!: ElementRef;

  @Input({required: true}) inputListItens: IListItens[] = []

  @Output() outputAddListItems = new EventEmitter<IListItens>()

  focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date()
      const timeTemp = currentDate.getTime();
      const id = `ID ${timeTemp}`

      this.outputAddListItems.emit({
        id,
        checked: false,
        value
      })
      
      return this.inputText.nativeElement.focus()
    }
  }
}
