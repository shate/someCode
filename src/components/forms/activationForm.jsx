import React from 'react';
import { Form, reduxForm } from 'redux-form';
import InputField from './inputField/inputField';
import { Button, Box } from '@material-ui/core';

import stl from './forms.module.scss';
import StepsActivation from './steps/stepsActivation.jsx';

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
    if (
        values.password && values.password.length < 6
    ) {
        errors.phone_or_mai = 'Invalid email address';
    }
    return errors;
};

const ActivationForm = props => {

    const handleSubmit = (data) => {
        props.sendActivationForm({...data, phone_or_mail: props.regData.phone_or_mail});
    };

    return (
        <>
            <Box component={'h1'} mt={{xs: -5, sm: 0}} textAlign={'center'}>
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
                    Сейчас Вам поступит звонок.<br/>Введите в поле кода последние 4 цифры номера телефона
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
                    <Box mb={{xs: 0, md: 4}} mt={{xs: -1, sm: 0}}>
                        <InputField
                            label={'Пароль'}
                            name={'password'}
                            type={'password'}
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
                    <Box component={'span'} ml={1} className={'cup'}
                         onClick={() => props.sendSignInForm(props.regData)}>
                        <ins>Отправить код повторно</ins>
                    </Box>
                </Box>
            </Form>
        </>

    );
};

export default reduxForm({form: 'activation', validate})(ActivationForm);
