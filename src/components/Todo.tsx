import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React, {useState} from "react";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {Input, Switch} from "@material-ui/core";

export interface TodoInterface {
    name: string,
    desc: string,
    isActive: boolean,
    createdAt: string
}

const useStyles = makeStyles({
    operations: {
        cursor: 'pointer',
    }
});

const Todo = (props: { todo: TodoInterface, moveUp: () => void, moveDown: () => void, removeTodo: () => void }) => {
    const [todo, setTodo] = useState(props.todo);
    const [isUpdate, setIsUpdate] = useState(false);
    const classes = useStyles();
    console.log(props.todo.name);
    return (
        <TableRow>
            <TableCell>
                <ArrowDropUpIcon onClick={() => props.moveUp()} className={classes.operations}/>
                <ArrowDropDownIcon onClick={() => props.moveDown()} className={classes.operations}/>
            </TableCell>
            <TableCell>
                {isUpdate ?
                    <Input value={todo.name} onChange={(e) => setTodo({...todo, name: e.target.value})}/> : todo.name}
            </TableCell>
            <TableCell align="right">
                {isUpdate ?
                    <Input value={todo.desc} onChange={(e) => setTodo({...todo, desc: e.target.value})}/> : todo.desc}
            </TableCell>
            <TableCell align="right">
                {isUpdate ? <Switch
                    checked={todo.isActive}
                    onChange={(e) => setTodo({...todo, isActive: e.target.checked})}
                    color="primary"
                /> : (todo.isActive ? <CheckIcon/> : <CloseIcon/>)}
            </TableCell>
            <TableCell align="right">
                {todo.createdAt}
            </TableCell>
            <TableCell>
                {isUpdate ? <CheckIcon className={classes.operations} onClick={() => setIsUpdate(false)}/> :
                    <CreateIcon className={classes.operations} onClick={() => setIsUpdate(true)}/>}
                <DeleteIcon className={classes.operations}
                            onClick={() => window.confirm('Вы уверены?') && props.removeTodo()}/>
            </TableCell>
        </TableRow>
    )
}

export default Todo;