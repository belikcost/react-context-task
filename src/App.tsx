import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    CircularProgress,
    Paper,
    TableCell,
    TableContainer,
    Table,
    Typography,
    TableHead,
    TableRow
} from '@material-ui/core';
import Todos from "./components/Todos";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TodoInterface} from "./components/Todo";

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

const defaultValue = [
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

export interface ContextInterface {
    todos: {
        name: string,
        desc: string,
        isActive: boolean,
        createdAt: string
    }[],
    setTodos?: Dispatch<SetStateAction<TodoInterface[]>>,
    moveUp?: (name: string, todos?: TodoInterface[] | undefined) => void
    moveDown?: (name: string, todos?: TodoInterface[] | undefined) => void
}

export const AppContext = React.createContext<ContextInterface>({todos: defaultValue});
const App = () => {
    const classes = useStyles();
    const [dir, setDir] = useState('DESC')
    const [todos, setTodos] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        sortBy('createdAt');
        setIsLoading(false);
    }, [])

    const moveUp = (name: string) => {
        let target = todos.find(e => e.name === name), t_ind = todos.indexOf(target!),
            next_ind = t_ind !== 0 ? t_ind - 1 : todos.length - 1, newTodos = todos.map((t, i) => {
                if (t.name === name) {
                    return todos[next_ind]!;
                } else if (i === next_ind) {
                    return target!;
                } else return t;
            });
        setTodos(newTodos);
    }
    const moveDown = (name: string) => {
        let target = todos.find(e => e.name === name), t_ind = todos.indexOf(target!),
            next_ind = t_ind !== todos.length - 1 ? t_ind + 1 : 0, newTodos = todos.map((t, i) => {
                if (t.name === name) {
                    return todos[next_ind]!;
                } else if (i === next_ind) {
                    return target!;
                } else return t;
            });
        setTodos(newTodos);
    }
    const sortBy = (cell: string) => {
        const todosToSort = [...todos];
        todosToSort.sort((a: any, b: any) => {
            let c = cell === 'createdAt' ? new Date(a[cell]) : a[cell],
                d = cell === 'createdAt' ? new Date(b[cell]) : b[cell];
            if (c < d) {
                return dir === 'ASC' ? -1 : 1;
            } else if (c > d) {
                return dir === 'ASC' ? 1 : -1;
            } else return 0;
        });
        setTodos(todosToSort);
        setDir(dir === 'ASC' ? 'DESC' : 'ASC');
    }

    if (isLoading) {
        return <CircularProgress className={classes.loading}/>
    } else {
        return (
            <AppContext.Provider value={{todos, setTodos, moveUp, moveDown}}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2">&nbsp;</Typography>
                                </TableCell>
                                <TableCell onClick={() => sortBy('name')}>
                                    <Typography variant="subtitle2" className={classes.headcell}>Название</Typography>
                                </TableCell>
                                <TableCell align="right" onClick={() => sortBy('desc')}>
                                    <Typography variant="subtitle2" className={classes.headcell}>Описание</Typography>
                                </TableCell>
                                <TableCell align="right" onClick={() => sortBy('isActive')}>
                                    <Typography variant="subtitle2" className={classes.headcell}>Активность</Typography>
                                </TableCell>
                                <TableCell align="right" onClick={() => sortBy('createdAt')}>
                                    <Typography variant="subtitle2" className={classes.headcell}>Дата
                                        создания</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">&nbsp;</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <DndProvider backend={HTML5Backend}>
                            <Todos/>
                        </DndProvider>
                    </Table>
                </TableContainer>
            </AppContext.Provider>
        );
    }
}

export default App;