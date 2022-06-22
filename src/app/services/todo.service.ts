import { Injectable } from '@angular/core';
import { Todo } from '../domain/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
    new Todo('this is a test'),
    new Todo('Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio officia porro accusamus. Iure error natus, voluptas quo sunt alias fugiat minus earum? Atque ipsum tenetur cupiditate magnam, nulla amet dolore.', true)
  ];

  constructor() { }


  getAllTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
