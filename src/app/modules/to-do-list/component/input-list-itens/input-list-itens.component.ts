import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItens } from '../../interface/IListItens.interface';

@Component({
  selector: 'app-input-list-itens',
  imports: [],
  templateUrl: './input-list-itens.component.html',
  styleUrl: './input-list-itens.component.css'
})
export class InputListItensComponent {
  @Input({required: true}) inputListItens: IListItens[] = []

  @Output() outputUpdateItemCheckBox = new EventEmitter<{ id: string, checked: boolean }>()
  updateItemCheckBox(id: string, checked: boolean){
    return this.outputUpdateItemCheckBox.emit({id, checked})
  }

  @Output() outputUpdateItemText = new EventEmitter<{ id: string, value: string }>()
  updateItemText(id: string, value: string){
    return this.outputUpdateItemText.emit({id, value})
  }

  @Output() outputDeleteItem = new EventEmitter<string>()
  deleteItem(id: string){
    return this.outputDeleteItem.emit(id)
  }
}
