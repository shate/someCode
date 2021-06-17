import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Box from '@material-ui/core/Box';
import Logout from '../../customIcons/logout';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../../store/auth/actions';

import stl from './logout.module.scss';

const LogoutBtn = props => {
    let history = useHistory();
    const [cookies, removeCookie] = useCookies(['iqAcademy']);

    useEffect(() => {
        if (!props.token) {
            history.push('/login');
        }
    }, [props.token]);

    return (
        <Box
            onClick={() => {
                removeCookie('iqAcademy', '', {path: '/'});
                props.logOut();
            }}
            className={stl.logOutdBtn}
            alignItems={'center'}
            display={'flex'}
        >
            <Logout viewBox={'0 0 26 26'} className={'cup'}/>
            <Box component={'span'} className={'cup'}>
                <Box component={'span'} ml={2}
                     display={{xs: 'none', sm: 'inline'}}
                >
                    Выход
                </Box>
                <Box component={'span'} ml={2} display={{xs: 'inline', sm: 'none'}}>Выйти из профиля</Box>
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    token: state.authReducer.token,
});

export default connect(mapStateToProps, {
    logOut
})(LogoutBtn);
