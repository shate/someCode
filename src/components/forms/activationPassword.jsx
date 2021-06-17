import React from 'react';
import { Form, reduxForm } from 'redux-form';
import InputField from './inputField/inputField';
import { Button, Box } from '@material-ui/core';
import ArrowDown from '../customIcons/arrowDown';

import stl from './forms.module.scss';
import StepsActivation from './steps/stepsActivation';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'code',
        'password'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Error'
        }
    });
    return errors
};

const ActivationPassword = props => {
    const handleSubmit = (data) => {
        props.activationPassword({...data, ...props.regData});
    };

    return (
        <>
            <Box component={'h1'} textAlign={'center'}>
                Создание нового пароля
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
                    Сейчас Вам поступит звонок.<br/> Введите в поле кода последние 6 цифр номера <br/> телефона
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
                            label={'Новый пароль'}
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
                        Сохранить и войти
                    </Button>
                </Box>
                <Box
                    textAlign="center"
                    letterSpacing={1.2}
                    display={{xs: 'none', sm: 'block'}}
                >
                    <Box component={'span'} ml={1} className={'cup'}
                         onClick={() => props.forgotPassword(props.regData)}>
                        <ins>Отправить код повторно</ins>
                    </Box>
                </Box>
                <Box
                    textAlign="center"
                    display={{xs: 'block', sm: 'none'}}
                >
                    <Box className={'cup'} mb={1} onClick={() => props.forgotPassword(props.regData)}>Отправить код
                        повторно</Box>
                    <Box component={'span'} ml={-1} color={'transparent'}
                         onClick={() => props.forgotPassword(props.regData)}>
                        <ArrowDown viewBox="0 0 35 19"/>
                    </Box>
                </Box>
            </Form>
        </>
    )
}

export default reduxForm({form: 'activation', validate})(ActivationPassword);
