import React from 'react';
import Box from '@material-ui/core/Box';
import Logout from '../../customIcons/logout';
import stl from './cancelled.module.scss';

const CancelledBtn = () => {

    return (
        <Box
            pl={{xs: 1.5, sm: 0}}
            className={stl.cancelledBtn}
            alignItems={'center'}
            display={'flex'}
        >
            <Logout viewBox={'0 0 26 26'} className={'cup'}/>
            <Box component={'span'} ml={1} className={'cup'}>Отменить</Box>
        </Box>
    );
};

export default React.memo(CancelledBtn);
