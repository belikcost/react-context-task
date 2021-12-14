import { Dispatch, SetStateAction } from "react";

interface TodoInterface {
    name: string,
    desc: string,
    isActive: boolean,
    createdAt: string
}

interface AppContextInterface {
    todos: TodoInterface[];
    setTodos?: Dispatch<SetStateAction<TodoInterface[]>>;
    moveUp?: (name: string) => void;
    moveDown?: (name: string) => void;
}

export type { TodoInterface, AppContextInterface }