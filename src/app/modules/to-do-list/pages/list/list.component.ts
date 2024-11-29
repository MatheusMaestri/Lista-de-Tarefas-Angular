import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../component/input-add-item/input-add-item.component';
import { IListItens } from '../../interface/IListItens.interface';
import { InputListItensComponent } from '../../component/input-list-itens/input-list-itens.component';
import { ELocalStorage } from '../../enum/ELocalStorage.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  imports: [CommonModule, InputAddItemComponent, InputListItensComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  addItem = signal(true);

  #setListItens = signal<IListItens[]>(this.#parseItens());
  getListItens = this.#setListItens.asReadonly();

  #parseItens(){
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]')
  }

  #updateLocalStorage(){
    return localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.#setListItens()))
  }

  getInputAddItem(value: IListItens){
    localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify([...this.#setListItens(), value]))
    return this.#setListItens.set(this.#parseItens())
  }

  listItensStage(value: 'pendente' | 'completo'){
    return this.getListItens().filter((res: IListItens) => {
      if(value === 'pendente'){
        return !res.checked
      }
      if(value === 'completo'){
        return res.checked
      }

      return res
    })
  }

  updateItemCheckBox(novoItem: {id: string, checked: boolean}){
    this.#setListItens.update((oldValue: IListItens[]) =>{
      oldValue.filter(res =>{
        if(res.id === novoItem.id){
          res.checked = novoItem.checked;
          return res
        }

        return res
      })

      return oldValue
    })

    return this.#updateLocalStorage()
  }

  updateItemText(novoItem: {id: string, value:string}){
    this.#setListItens.update((oldValue: IListItens[]) =>{
      oldValue.filter(res =>{
        if(res.id === novoItem.id){
          res.value = novoItem.value;
          return res
        }

        return res
      })

      return oldValue
    })

    return this.#updateLocalStorage()
  }

  deleteItem(id: string){

    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar item."
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "Sua tarefa foi deletada",
          icon: "success"
        });
        this.#setListItens.update((oldValue: IListItens[]) => {
          return oldValue.filter((res) => res.id !== id)
        })
    
        return this.#updateLocalStorage()
      }
    });

  }

  deletarTodosItens(){

    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar tudo."
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "Suas tarefas foram deletadas",
          icon: "success"
        });
        localStorage.removeItem(ELocalStorage.MY_LIST)
        return this.#setListItens.set(this.#parseItens())
      }
    });
  }
}
