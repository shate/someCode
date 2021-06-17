import React from 'react';
import { Typography, Box } from '@material-ui/core';
import Logo from '../../../layout/logo/logo';
import { useHistory } from 'react-router-dom';
import Logout from '../../../customIcons/logout.js';

const CreateCourseHeader = props => {
    let history = useHistory();

    return (
        <>
            <Box
                display={{xs: 'flex', sm: 'none'}}
                justifyContent="space-between"
                flexGrow={1}
                alignItems="center"
                px={3}
            >
                <Box onClick={() => {
                    props.cropperIsShow ? props.showCropper(false) :  history.push('/courses')
                }}
                >
                    <Logout viewBox="0 0 26 26"/>
                </Box>
                <Typography variant={'h1'}>
                    Создание курса
                </Typography>
                <Box/>
            </Box>
            <Logo/>
        </>
    );
};

export default CreateCourseHeader;
