import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = [];
  constructor() {}

  ngDoCheck(){
    this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked))
  }

  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false});
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirm = window.confirm(
      'Deseja realmente excluir todas as tarefas?'
    );

    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number) {
    if(!event.length){
      const confirm = window.confirm('Task vazia, deseja realmente excluir?')

      if(confirm) {
        this.deleteItemTaskList(index)
      }
    }
  }
}
