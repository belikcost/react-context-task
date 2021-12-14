import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    CircularProgress,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

import { AppContextInterface, TodoInterface } from './types';

import Todos from "./components/Todos";
import { OrderEnums } from "./enums";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    loading: {
        margin: '0 auto',
        display: 'block'
    },
    headcell: {
        cursor: 'pointer',
        display: 'inline-block'
    }
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
        sortTable('createdAt');
        setIsLoading(false);
    }, []);

    const moveUp = (name: string) => {
        const target = todos.find(e => e.name === name);

        if (!target) {
            return;
        }

        const todoIndex = todos.indexOf(target);
        const nextIndex = todoIndex !== 0 ? todoIndex - 1 : todos.length - 1;

        const newTodos = todos.map((t, i) => {
            if (t.name === name) {
                return todos[nextIndex];
            } else if (i === nextIndex) {
                return target;
            } else {
                return t;
            }
        });

        setTodos(newTodos);
    };

    const moveDown = (name: string) => {
        const target = todos.find(e => e.name === name);

        if (!target) {
            return;
        }

        const todoIndex = todos.indexOf(target);

        const isLastTodo = todoIndex === todos.length - 1;
        const nextIndex = isLastTodo ? 0 : todoIndex + 1;

        const newTodos = todos.map((todo, i) => {
            if (todo.name === name) {
                return todos[nextIndex];
            } else if (i === nextIndex) {
                return target;
            } else {
                return todo;
            }
        });

        setTodos(newTodos);
    };

    const revertOrder = () => {
        if (order === OrderEnums.ascending) {
            setOrder(OrderEnums.descending);
        } else if (order === OrderEnums.descending) {
            setOrder(OrderEnums.ascending);
        }
    };

    const sortTable = (cell: keyof TodoInterface) => {
        const sortedTodos = [...todos].sort((current, next) => {
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

        setTodos(sortedTodos);
        revertOrder();
    };

    if (isLoading) {
        return <CircularProgress className={classes.loading}/>
    } else {
        return (
            <AppContext.Provider value={{ todos, setTodos, moveUp, moveDown }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2">&nbsp;</Typography>
                                </TableCell>
                                <TableCell onClick={() => sortTable('name')}>
                                    <Typography variant="subtitle2" className={classes.headcell}>Название</Typography>
                                </TableCell>
                                <TableCell align="right" onClick={() => sortTable('desc')}>
                                    <Typography variant="subtitle2" className={classes.headcell}>Описание</Typography>
                                </TableCell>
                                <TableCell align="right" onClick={() => sortTable('isActive')}>
                                    <Typography variant="subtitle2" className={classes.headcell}>Активность</Typography>
                                </TableCell>
                                <TableCell align="right" onClick={() => sortTable('createdAt')}>
                                    <Typography variant="subtitle2" className={classes.headcell}>
                                        Дата создания
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">&nbsp;</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <Todos/>
                    </Table>
                </TableContainer>
            </AppContext.Provider>
        );
    }
}

export default App;