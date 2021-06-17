import React from 'react';
import { Form, reduxForm } from 'redux-form';
import InputField from './inputField/inputField';
import { Button, Box } from '@material-ui/core';
import ArrowDown from '../customIcons/arrowDown';
import { useHistory } from 'react-router-dom';
import StepsActivation from './steps/stepsActivation.jsx';

import stl from './forms.module.scss';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'code',
        'password'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Error';
        }
    });
    return errors;
};

const ActivationMailPhone = props => {

    let history = useHistory();
    const handleSubmit = (data) => {
        props.activationEmailPhone({...data, ...props.regData});
    };

    return (
        <>
            <Box component={'h1'} textAlign={'center'}>
                Активация
            </Box>
            <StepsActivation setActivation={props.setActivation}/>
            <Box textAlign={'center'} mt={2} mb={2} display={{xs: 'block', sm: 'none'}}>
                <Box
                    component={'span'}
                    fontSize={20}
                    display={'inline-block'}
                    mt={1}
                    lineHeight={1.1}
                >
                </Box>
            </Box>
            <Form onSubmit={props.handleSubmit(handleSubmit)}>
                <Box className={stl.mobilWrap}>
                    <Box mb={{xs: 0, md: 1}}>
                        <InputField
                            label={'Код'}
                            name={'code'}
                        />
                    </Box>
                </Box>
                <Box textAlign="center" my={4} px={{xs: 7, sm: 5}}>
                    <Button
                        variant="contained"
                        color="primary"
                        size={'large'}
                        fullWidth
                        type={'submit'}
                    >
                        Активировать
                    </Button>
                </Box>
                <Box
                    textAlign="center"
                    letterSpacing={1.2}
                    display={{xs: 'none', sm: 'block'}}
                >
                    <Box component={'span'} ml={1} className={'cup'} onClick={() => {
                        history.push('/profile');
                        props.activation(false);
                    }}>
                        <ins>Назад</ins>
                    </Box>
                </Box>
                <Box
                    textAlign="center"
                    display={{xs: 'block', sm: 'none'}}
                >
                    <Box className={'cup'} mb={1} onClick={() => history.push('/profile')}>Назад</Box>
                    <Box component={'span'} ml={-1} color={'transparent'} onClick={() => {
                        history.push('/profile');
                        props.activation(false);
                    }}>
                        <ArrowDown viewBox="0 0 35 19"/>
                    </Box>
                </Box>
            </Form>
        </>
    );
};

export default reduxForm({form: 'activationMailPhone', validate})(ActivationMailPhone);
