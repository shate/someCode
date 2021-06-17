import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Logo from '../../../layout/logo/logo';
import Logout from '../../../customIcons/logout.js';


const EditCourseHeader = () => {

    return (

        <>
            <Box display={{xs: 'flex', sm: 'none'}}>
                <Typography variant={'h1'}>Настройки курса</Typography>
            </Box>
            <Logo/>
        </>

    );
};

export default EditCourseHeader;
