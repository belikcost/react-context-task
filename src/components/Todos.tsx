import React from "react";
import {TableBody} from "@material-ui/core";
import Todo from "./Todo";
import {AppContext} from "../App";

const Todos = () => {
    return (
        <>
            <TableBody>
                <AppContext.Consumer>
                    {value => {
                        const removeTodo = (name: string) => {
                            value.setTodos!(value.todos.filter(e => e.name !== name));
                        }
                        return value.todos.map((t) => (
                            <Todo
                                removeTodo={() => removeTodo(t.name)}
                                moveDown={() => value.moveDown!(t.name)}
                                moveUp={() => value.moveUp!(t.name)}
                                key={t.name}
                                todo={t}
                            />
                        ))
                    }}
                </AppContext.Consumer>
            </TableBody>
        </>

    );
}

export default Todos;
