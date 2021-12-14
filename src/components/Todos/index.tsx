import React, { useContext } from "react";
import { TableBody, Typography } from "@material-ui/core";

import Todo from "../Todo";
import { AppContext } from "../../App";
import { AppContextInterface } from "../../types";


const Todos = () => {
    const { removeTodo, changeTodo, todos, moveDownTodo, moveUpTodo } = useContext<AppContextInterface>(AppContext);

    if (removeTodo && changeTodo && moveDownTodo && moveUpTodo) {
        return (
            <TableBody>
                {todos.map((todo) => (
                    <Todo
                        changeTodo={changeTodo}
                        removeTodo={removeTodo}
                        moveDownTodo={moveDownTodo}
                        moveUpTodo={moveUpTodo}
                        todo={todo}
                        key={todo.name}
                    />
                ))}
            </TableBody>
        );
    } else {
        return (
            <Typography color="error" variant="body1">Ошибка!</Typography>
        );
    }
};

export default Todos;
