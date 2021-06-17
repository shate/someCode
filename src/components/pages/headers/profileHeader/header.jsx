import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Logo from '../../../layout/logo/logo';
import Logout from '../../../customIcons/logout.js';


const CoursesHeader = props => {

    return (

        <>
            {!props.cropperIsShow
                ? <Box display={{xs: 'flex', sm: 'none'}}>
                    <Typography variant={'h1'}>Настройки профиля</Typography>
                </Box>
                : <Box
                    display={{xs: 'flex', sm: 'none'}}
                    justifyContent="space-between"
                    flexGrow={1}
                    alignItems="center"
                    px={3}
                >
                    <Box onClick={() => props.showCropper(false)}>
                        <Logout viewBox="0 0 26 26"/>
                    </Box>
                    <Typography variant={'h1'}>
                        Настройки профиля
                    </Typography>
                    <Box/>
                </Box>
            }

            <Logo/>
        </>

    );
};

export default CoursesHeader;
