import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { Todo } from '../domain/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];
  showValidationErrors: boolean = false;

  constructor(private todoService: TodoService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos();
  }

  onFormsSubmit(form: NgForm){
    if(form.invalid) return this.showValidationErrors = true
    this.todoService.addTodo(new Todo(form.value.text))
    this.showValidationErrors = false;
    form.reset();
    return;
  }

  toggleCompleted(todo: Todo){
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
     const index = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoComponent, {
      width: '700px',
      data: todo
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.todoService.updateTodo(index, result);
      }
    })
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todoService.deleteTodo(index);
  }

}
