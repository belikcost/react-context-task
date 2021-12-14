import React, { useState } from "react";

import { Input, makeStyles, Switch, TableCell, TableRow } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';

import { TodoInterface } from "../../types";

const useStyles = makeStyles({
    operations: {
        cursor: 'pointer',
    }
});

interface TodoPropsInterface {
    todo: TodoInterface;
    moveUp: () => void;
    moveDown: () => void;
    removeTodo: () => void;
}

const Todo = (props: TodoPropsInterface) => {
    const [todo, setTodo] = useState(props.todo);
    const [isUpdate, setIsUpdate] = useState(false);

    const classes = useStyles();

    return (
        <TableRow>
            <TableCell>
                <ArrowDropUpIcon onClick={() => props.moveUp()} className={classes.operations}/>
                <ArrowDropDownIcon onClick={() => props.moveDown()} className={classes.operations}/>
            </TableCell>
            <TableCell>
                {isUpdate ? (
                    <Input value={todo.name} onChange={(e) => setTodo({ ...todo, name: e.target.value })}/>
                ) : (
                    todo.name
                )}
            </TableCell>
            <TableCell align="right">
                {isUpdate ? (
                    <Input
                        value={todo.desc}
                        onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
                    />
                ) : (
                    todo.desc
                )}
            </TableCell>
            <TableCell align="right">
                {isUpdate ? (
                    <Switch
                        checked={todo.isActive}
                        onChange={(e) => setTodo({ ...todo, isActive: e.target.checked })}
                        color="primary"
                    />
                ) : (todo.isActive ? <CheckIcon/> : <CloseIcon/>)}
            </TableCell>
            <TableCell align="right">
                {todo.createdAt}
            </TableCell>
            <TableCell>
                {isUpdate ? (
                    <CheckIcon className={classes.operations} onClick={() => setIsUpdate(false)}/>
                ) : (
                    <CreateIcon className={classes.operations} onClick={() => setIsUpdate(true)}/>
                )}
                <DeleteIcon
                    className={classes.operations}
                    onClick={() => window.confirm('Вы уверены?') && props.removeTodo()}
                />
            </TableCell>
        </TableRow>
    );
};

export default Todo;