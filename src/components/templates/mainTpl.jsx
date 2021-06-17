import React, { useEffect } from 'react';
import stl from './formTpl.module.scss';
import Box from '@material-ui/core/Box';
import LogoMain from '../layout/logo/logoMain';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { setErrorMessage } from '../../store/auth/actions';

const MainTpl = props => {

    useEffect(() => {
        if (props.message) {
            toast[props.message.type](props.message.message);
            props.setErrorMessage(false);
        }
    }, [props.message]);

    return (
        <Box
            className={stl.root}
            display={'flex'}
            flexDirection={'column'}
        >
            <Box textAlign="center">
                <LogoMain/>
            </Box>
            <Box display={'flex'} flexGrow={1} flexDirection={'column'}>
                {props.header}
                <Box
                    className={stl.formContainer}
                    width={1}
                    display={'flex'}
                    flexDirection={'column'}
                    flexGrow={{xs:1, sm:0}}
                >
                    {props.children}
                </Box>
            </Box>
            <ToastContainer/>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    message: state.authReducer.message,
});

export default connect(mapStateToProps, {
    setErrorMessage
})(MainTpl);
