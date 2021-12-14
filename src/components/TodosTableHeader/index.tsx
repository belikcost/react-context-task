import React from "react";
import { makeStyles, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";

import { SortTodosInterface } from "../../types";


const useStyles = makeStyles({
    headcell: {
        cursor: 'pointer',
        display: 'inline-block'
    }
});

const TodosTableHeader = ({ sortTodos }: { sortTodos: SortTodosInterface }) => {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle2">&nbsp;</Typography>
                </TableCell>
                <TableCell onClick={() => sortTodos('name')}>
                    <Typography variant="subtitle2" className={classes.headcell}>Название</Typography>
                </TableCell>
                <TableCell align="right" onClick={() => sortTodos('desc')}>
                    <Typography variant="subtitle2" className={classes.headcell}>Описание</Typography>
                </TableCell>
                <TableCell align="right" onClick={() => sortTodos('isActive')}>
                    <Typography variant="subtitle2" className={classes.headcell}>Активность</Typography>
                </TableCell>
                <TableCell align="right" onClick={() => sortTodos('createdAt')}>
                    <Typography variant="subtitle2" className={classes.headcell}>
                        Дата создания
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle2">&nbsp;</Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default React.memo(TodosTableHeader);