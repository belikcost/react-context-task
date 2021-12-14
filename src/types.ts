interface TodoInterface {
    name: string,
    desc: string,
    isActive: boolean,
    createdAt: string
}

interface RemoveTodoInterface {
    (name: TodoInterface["name"]): void;
}

interface MoveTodoInterface {
    (name: string): void;
}

interface ChangeTodoInterface {
    (changedTodo: TodoInterface): void;
}

interface AppContextInterface {
    todos: TodoInterface[];
    changeTodo?: ChangeTodoInterface;
    removeTodo?: RemoveTodoInterface;
    moveUpTodo?: MoveTodoInterface;
    moveDownTodo?: MoveTodoInterface;
}

interface SortTodosInterface {
    (cell: keyof TodoInterface): void;
}

export type {
    TodoInterface,
    AppContextInterface,
    SortTodosInterface,
    ChangeTodoInterface,
    MoveTodoInterface,
    RemoveTodoInterface
}