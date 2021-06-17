import React from 'react';
import Courses from '../../customIcons/courses';
import Message from '../../customIcons/message';
import Notification from '../../customIcons/notification';
import Account from '../../customIcons/account';
import Box from '@material-ui/core/Box';
import { NavLink, withRouter } from 'react-router-dom';

import stl from './menu.module.scss';

const Menu = props => {

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={props.direction}
            alignItems={props.fullWidth ? 'flex-start' : 'center'}
        >
            <NavLink to={'/courses'} activeClassName={stl.active} className={stl.link}>
                <Courses viewBox="0 0 32 32" className={stl.ico}/>
                <Box component={'span'} ml={3} display={props.fullWidth ? 'inline' : 'none'}>Курсы</Box>
            </NavLink>
            <NavLink to={'/message'} activeClassName={stl.active} className={stl.link}>
                <Message viewBox="0 0 26 15" className={stl.ico}/>
                <Box component={'span'} ml={3} display={props.fullWidth ? 'inline' : 'none'}>Сообщения</Box>
            </NavLink>
            <NavLink to={'/notice'} activeClassName={stl.active} className={stl.link}>
                <Notification viewBox="0 0 22 24" className={stl.ico}/>
                <Box component={'span'} ml={3} display={props.fullWidth ? 'inline' : 'none'}>Уведомления</Box>
            </NavLink>
            <NavLink to={'/profile'} activeClassName={stl.active} className={stl.link}>
                <Account viewBox="0 0 22 24" className={stl.ico}/>
                <Box component={'span'} ml={3} display={props.fullWidth ? 'inline' : 'none'}>Мой аккаунт</Box>
            </NavLink>
        </Box>
    );
};

export default withRouter(Menu);
