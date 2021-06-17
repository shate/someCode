import React from 'react';
import Box from '@material-ui/core/Box';
import SideBar from '../../sidebar/sidebar';
import Menu from '../menu/menu';

const Page = props => {

    return (
        <>
            <SideBar/>
            {props.isHeader
                ? <Box
                    component={'header'}
                    display={'flex'}
                    justifyContent="center"
                    py={3}
                >
                    {props.header}
                </Box>
                : ''
            }
            {props.children}
            <Box
                component={'footer'}
                display={{xs: 'block', sm: 'none'}}
                borderTop={2}
                py={2}
                mt={2}
                px={3}
            >
                <Menu/>
            </Box>
        </>
    );
};

export default Page;
