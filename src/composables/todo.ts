import { ref, Ref } from 'vue';
import { List } from './list';

export default class ToDoClass {
  name: string;
  lists: List[];

  constructor(name: string, lists: List[]) {
    this.name = name;
    this.lists = lists;
  }

  saveToDo() {
    localStorage.setItem('todo', JSON.stringify(this));
  }

  deleteToDo() {
    localStorage.removeItem('todo');
  }

  getToDo() {
    return JSON.parse(localStorage.getItem('todo') || '{}');
  }

  addListItems(list: List) {
    this.lists.push(list);
    this.saveToDo();
  }

  deleteListItems(list: List) {
    this.lists.splice(this.lists.indexOf(list), 1);
    this.saveToDo();
  }

  getListItem(list: List) {
    return this.lists[this.lists.indexOf(list)];
  }
}
