import React, { useState } from "react";

import { Input, makeStyles, Switch, TableCell, TableRow } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';

import { ChangeTodoInterface, MoveTodoInterface, RemoveTodoInterface, TodoInterface } from "../../types";

const useStyles = makeStyles({
    operations: {
        cursor: 'pointer',
    }
});

interface TodoPropsInterface {
    todo: TodoInterface;
    moveUpTodo: MoveTodoInterface;
    moveDownTodo: MoveTodoInterface;
    removeTodo: RemoveTodoInterface;
    changeTodo: ChangeTodoInterface;
}

const Todo = ({ todo, removeTodo, moveUpTodo, moveDownTodo, changeTodo }: TodoPropsInterface) => {
    const [isChanging, setIsChanging] = useState(false);

    const classes = useStyles();

    const onRemoveTodo = () => {
       const confirm = window.confirm('Вы уверены?');

       if (confirm) {
           removeTodo(todo.name);
       }
    };

    const onMoveDownTodo = () => {
      moveDownTodo(todo.name);
    };

    const onMoveUpTodo = () => {
        moveUpTodo(todo.name);
    };

    return (
        <TableRow>
            <TableCell>
                <ArrowDropUpIcon onClick={onMoveUpTodo} className={classes.operations}/>
                <ArrowDropDownIcon onClick={onMoveDownTodo} className={classes.operations}/>
            </TableCell>
            <TableCell>
                {isChanging ? (
                    <Input value={todo.name} onChange={(e) => changeTodo({ ...todo, name: e.target.value })}/>
                ) : (
                    todo.name
                )}
            </TableCell>
            <TableCell align="right">
                {isChanging ? (
                    <Input
                        value={todo.desc}
                        onChange={(e) => changeTodo({ ...todo, desc: e.target.value })}
                    />
                ) : (
                    todo.desc
                )}
            </TableCell>
            <TableCell align="right">
                {isChanging ? (
                    <Switch
                        checked={todo.isActive}
                        onChange={(e) => changeTodo({ ...todo, isActive: e.target.checked })}
                        color="primary"
                    />
                ) : (todo.isActive ? <CheckIcon/> : <CloseIcon/>)}
            </TableCell>
            <TableCell align="right">
                {todo.createdAt}
            </TableCell>
            <TableCell>
                {isChanging ? (
                    <CheckIcon className={classes.operations} onClick={() => setIsChanging(false)}/>
                ) : (
                    <CreateIcon className={classes.operations} onClick={() => setIsChanging(true)}/>
                )}
                <DeleteIcon
                    className={classes.operations}
                    onClick={onRemoveTodo}
                />
            </TableCell>
        </TableRow>
    );
};

export default React.memo(Todo);