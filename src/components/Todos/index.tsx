import React, { useContext } from "react";
import { TableBody } from "@material-ui/core";

import Todo from "../Todo";
import { AppContext } from "../../App";
import { AppContextInterface } from "../../types";


const Todos = () => {
    const { setTodos, todos, moveDown, moveUp } = useContext<AppContextInterface>(AppContext);

    const removeTodo = (name: string) => {
        setTodos!(todos!.filter(e => e.name !== name));
    };

    return (
        <TableBody>
            {todos!.map((todo) => (
                <Todo
                    removeTodo={() => removeTodo(todo.name)}
                    moveDown={() => moveDown!(todo.name)}
                    moveUp={() => moveUp!(todo.name)}
                    todo={todo}
                    key={todo.name}
                />
            ))}
        </TableBody>
    );
};

export default Todos;
