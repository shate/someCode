import React, { useState } from 'react';
import stl from './sidebar.module.scss';
import Box from '@material-ui/core/Box';
import Menu from '../layout/menu/menu';
import { Dehaze } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

const SideBar = () => {

    const [fullWidth, setFullWidth] = useState(false);

    return (
        <Box
            className={`${stl.root} ${fullWidth ? stl.max : stl.min}`}
            display={{xs: 'none', sm: 'flex'}}
            flexDirection="column"
            justifyContent="space-between"
            pt={3}

        ><Box>
            <Box mb={10}>
                <Button onClick={() => setFullWidth(!fullWidth)} className={stl.btnWrap}>
                    <Dehaze className={`${fullWidth ? stl.btn : ''}`}/>
                </Button>
            </Box>
            <Menu direction={'column'} fullWidth={fullWidth}/>
        </Box>
        </Box>
    );
};

export default SideBar;
