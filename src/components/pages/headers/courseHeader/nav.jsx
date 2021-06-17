import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    list: {
        borderRadius: '20px 0 20px 20px',
        paddingLeft: 15,
        paddingRight: 15
    },
    paper: {
        borderRadius: '20px 0 20px 20px !important'
    }
}));

const HeaderNavigation = (props) => {

    const classes = useStyles();

    const handleSettings = (data) => {

        const init = {
            addPage: false,
            editPage: false,
            deleteCourse: false,
            settingsCourse: false,
            unsubscribe: false
        };
        return props.setActionsPage({
            ...init, ...data
        });
    };

    return (
        <PopupState variant="popover" popupId="course-menu">
            {(popupState) => (
                <>
                    <Button
                        {...bindTrigger(popupState)}
                    >
                        <MoreVert/>
                    </Button>

                        {
                            (props.role === 1 || props.role === 2)
                                ?  <Menu
                                    {...bindMenu(popupState)}
                                    classes={{
                                        list: classes.list,
                                        paper: classes.paper
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        popupState.close();
                                        handleSettings({addPage: true});
                                    }}>Добавить страницу</MenuItem>
                                    <MenuItem onClick={() => {
                                        popupState.close();
                                        handleSettings({editPage: true});
                                    }}>Редактировать страницу</MenuItem>
                                    <MenuItem onClick={() => {
                                        popupState.close();
                                        handleSettings({deletePage: true});
                                    }}>Удалить страницу</MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={() => {
                                        popupState.close();
                                        handleSettings({settingsCourse: true});
                                    }}>Настройки курса</MenuItem>
                                    {
                                        props.role === 2
                                            ? <MenuItem onClick={() => {
                                                popupState.close();
                                                handleSettings({unsubscribe: true});
                                            }}>Отписаться от курса</MenuItem>
                                            : null
                                    }
                                </Menu>

                                :  <Menu
                                    {...bindMenu(popupState)}
                                    classes={{
                                        list: classes.list,
                                        paper: classes.paper
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        popupState.close();
                                        handleSettings({unsubscribe: true});
                                    }}>Отписаться от курса</MenuItem>
                                </Menu>
                        }


                </>
            )}
        </PopupState>
    );
};

export default React.memo(HeaderNavigation);
