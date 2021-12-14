import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Paper, Table, TableContainer, } from '@material-ui/core';

import {
    AppContextInterface,
    ChangeTodoInterface, MoveTodoInterface,
    RemoveTodoInterface,
    SortTodosInterface,
    TodoInterface
} from './types';

import Todos from "./components/Todos";
import TodosTableHeader from "./components/TodosTableHeader";

import { OrderEnums } from "./enums";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    loading: {
        margin: '0 auto',
        display: 'block'
    },
});

const INITIAL_TODOS = [
    {
        name: 'a',
        desc: 'testing test',
        isActive: true,
        createdAt: new Date('12.03.2020').toLocaleString('ru')
    },
    {
        name: 'b',
        desc: 'testing test',
        isActive: false,
        createdAt: new Date().toLocaleString('ru')
    },
    {
        name: 'c',
        desc: 'testing test',
        isActive: false,
        createdAt: new Date('01.01.2012').toLocaleString('ru')
    },
];

export const AppContext = React.createContext<AppContextInterface>({ todos: INITIAL_TODOS });

const App = () => {
    const [order, setOrder] = useState<OrderEnums>(OrderEnums.descending);
    const [todos, setTodos] = useState<TodoInterface[]>(INITIAL_TODOS);

    const [isLoading, setIsLoading] = useState(true);

    const classes = useStyles();

    useEffect(() => {
        sortTodos('createdAt');
        setIsLoading(false);
    }, []);

    const moveUpTodo: MoveTodoInterface = useCallback(
        (name) => setTodos((prevTodos) => {
            const target = prevTodos.find(e => e.name === name);

            if (!target) {
                return prevTodos;
            }

            const todoIndex = prevTodos.indexOf(target);
            const nextIndex = todoIndex !== 0 ? todoIndex - 1 : prevTodos.length - 1;

            return prevTodos.map((t, i) => {
                if (t.name === name) {
                    return prevTodos[nextIndex];
                } else if (i === nextIndex) {
                    return target;
                } else {
                    return t;
                }
            });
        }), []
    );

    const moveDownTodo: MoveTodoInterface = useCallback(
        (name) => setTodos((prevTodos) => {
            const target = prevTodos.find(e => e.name === name);

            if (!target) {
                return prevTodos;
            }

            const todoIndex = prevTodos.indexOf(target);

            const isLastTodo = todoIndex === prevTodos.length - 1;
            const nextIndex = isLastTodo ? 0 : todoIndex + 1;

            return prevTodos.map((todo, i) => {
                if (todo.name === name) {
                    return prevTodos[nextIndex];
                } else if (i === nextIndex) {
                    return target;
                } else {
                    return todo;
                }
            });
        }), []
    );

    const revertOrder = useCallback(
        () => setOrder((prevOrder) => {
            if (prevOrder === OrderEnums.ascending) {
                return OrderEnums.descending;
            } else if (prevOrder === OrderEnums.descending) {
                return OrderEnums.ascending;
            } else {
                return prevOrder;
            }
        }), []
    );

    const sortTodos: SortTodosInterface = useCallback(
        (cell) => setTodos((prevTodos) => {
            const sortedTodos = [...prevTodos].sort((current, next) => {
                type ComparedValues = string | number | boolean | Date;

                let currentValue: ComparedValues = current[cell];
                let nextValue: ComparedValues = next[cell];

                if (cell === 'createdAt') {
                    currentValue = new Date(currentValue as string);
                    nextValue = new Date(nextValue as string);
                }

                if (currentValue < nextValue) {
                    return order === OrderEnums.ascending ? -1 : 1;
                } else if (currentValue > nextValue) {
                    return order === OrderEnums.ascending ? 1 : -1;
                } else {
                    return 0;
                }
            });

            revertOrder();
            return sortedTodos;
        }), []
    );

    const removeTodo: RemoveTodoInterface = useCallback(
        (name) => {
            setTodos((prevTodos) => prevTodos.filter(e => e.name !== name));
        }, []
    );

    const changeTodo: ChangeTodoInterface = useCallback(
        (changedTodo: TodoInterface) => setTodos((prevTodos) => {
            return prevTodos.map(todo => todo.name === changedTodo.name ? changedTodo : todo);
        }), []
    )

    if (isLoading) {
        return <CircularProgress className={classes.loading}/>
    } else {
        return (
            <AppContext.Provider value={{ todos, removeTodo, moveUpTodo, moveDownTodo, changeTodo }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TodosTableHeader sortTodos={sortTodos}/>
                        <Todos/>
                    </Table>
                </TableContainer>
            </AppContext.Provider>
        );
    }
}

export default App;