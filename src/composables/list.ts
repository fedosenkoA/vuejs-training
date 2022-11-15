import { ref, Ref } from 'vue';

interface ListItems {
  id: number;
  name: string;
}

export interface List {
  id: number;
  name: string;
  records: ListItems[];
}

interface ToDoList {
  todoList: Ref<List[]>;
  addTodo: (name: string) => void;
  removeTodo: (id: number) => void;
  addListItem: (listId: number, name: string) => void;
  removeListItem: (listId: number, id: number) => void;
  saveLists: (list: List) => void;
  getLists: () => void;
  deleteTodos: (list: List) => void;
}

const globalTodoList = ref<List[]>([]);

export const useToDoList = (): ToDoList => {
  const todoList = globalTodoList;
  const addTodo = (name: string) => {
    if (name.length > 0) {
      todoList.value.push({
        id: todoList.value.length ? todoList.value.length : 0,
        name,
        records: [],
      });
    }
  };
  const removeTodo = (id: number) => {
    todoList.value = todoList.value.filter((list) => list.id !== id);
    todoList.value.map((list, id) => {
      list.id = id;
    });
  };
  const addListItem = (listId: number, name: string) => {
    console.log(typeof listId, name);
    // todoList.value = todoList.value.map((list) => {
    //   if (list.id === listId) {
    //     list.records.push({
    //       id: 1,
    //       name,
    //     });
    //   }
    //   return list;
    // });
  };
  const removeListItem = (listId: number, id: number) => {
    todoList.value = todoList.value.map((list) => {
      if (list.id === listId) {
        list.records = list.records.filter((item) => item.id !== id);
      }
      return list;
    });
  };
  const saveLists = () => {
    localStorage.setItem('todos', JSON.stringify(todoList.value));
  };
  const getLists = () => {
    const todo = JSON.parse(localStorage.getItem('todos') || '[]');
    if (todo.length) {
      todoList.value.push(...todo);
    }
  };
  const deleteTodos = () => {
    localStorage.removeItem('todos');
  };
  return {
    todoList,
    addTodo,
    removeTodo,
    addListItem,
    removeListItem,
    saveLists,
    getLists,
    deleteTodos,
  };
};
