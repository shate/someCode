import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import Chapter from '../../../../customIcons/chapter';
import DoneCourses from '../../../../customIcons/donecource';
import MainChapter from '../../../../customIcons/mainChapter';

const StepperElem = props => {
    const [activeStep, setActiveStep] = useState(0);
    const setIco = (props) => {
        if (props.completed) {
            return <DoneCourses/>;
        }
        if (props.active) {
            return <MainChapter/>;
        }
        return <Chapter/>;
    };

    return (
        <Box className={'overlay'} mt={4}>
            <Stepper orientation="vertical" activeStep={activeStep}>
                {props.categories.map(item => {
                    return (
                        <Step key={item.id}>
                            <StepLabel StepIconComponent={(props) => setIco(props)}>{item.title}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default StepperElem;
