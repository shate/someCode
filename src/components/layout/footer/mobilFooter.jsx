import React from 'react';
import Box from '@material-ui/core/Box';
import Menu from '../menu/menu';

const MobilFooter = () => {

    return (
        <Box
            display={{xs: 'block', sm: 'none'}}
            borderTop={2}
            pt={2}
            mt={2}
        >
            <Menu direction={'row'}/>
        </Box>
    );
};

export default React.memo(MobilFooter);
