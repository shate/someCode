import React from 'react';
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import logo from '../../../assets/img/logo.svg';
import logoMob from '../../../assets/img/logoMob.svg';

const LogoMain = () => {
    const isMobile = useMediaQuery({maxWidth: 600});
    return (
        <Link to={'/'}>
                <Box component={'img'} mt={5} src={isMobile ?  logoMob : logo} alt="IQ Academy"/>
        </Link>
    )
}


export default React.memo(LogoMain);
