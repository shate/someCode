/*
* Created by shate@ya.ru on 29.07.2020
*/
import  React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    root: {
        color: 'transparent !important'
    },

}));
function ArrowDown(props) {
    const classes = useStyles();
    return (
        <SvgIcon
            {...props}
            classes={{
                root : classes.root
            }}
        >
            <path d="M34 1L17.5 17L1 1" stroke="#5C34FA" strokeWidth="2"/>
        </SvgIcon>
    );
}
export default ArrowDown;
