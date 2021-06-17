import React from 'react';
import stl from './steps.module.scss';
import { Box } from '@material-ui/core';

const StepsActivation = props => {
    return (
        <Box className={`${stl.steps}`} display={'flex'} justifyContent="center" alignItems="center">
            <Box
                className={`${stl.step} ${props.stepFirst ? stl.nextStep : stl.successStep} cup`}
                onClick={() => props.setActivation && props.setActivation(false)}
                 textAlign={'center'}
            >
                1
            </Box>
            <Box className={`${stl.divider} ${!props.stepFirst && stl.successStep}`}/>
            <Box className={`${stl.step} ${!props.stepFirst && stl.nextStep}`} textAlign={'center'}>2</Box>
        </Box>
    );
};

export default React.memo(StepsActivation);
