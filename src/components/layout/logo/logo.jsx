import React from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.svg';

const Logo = () => {
    return (
        <Link to={'/'}>
            <Box
                component={'img'}
                mt={5}
                src={logo} alt="IQ Academy"
                display={{xs: 'none', sm: 'inline-block'}}
                width={1}
            />
        </Link>
    );
};

export default React.memo(Logo);
