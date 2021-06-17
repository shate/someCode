import React from 'react';
import { reduxForm } from 'redux-form';
import InputField from './inputField/inputField';
import { Button, Box } from '@material-ui/core';
import ArrowDown from '../customIcons/arrowDown';
import { useHistory } from 'react-router-dom';

import stl from './forms.module.scss';
import StepsActivation from './steps/stepsActivation.jsx';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'name',
        'phone_or_mail'
    ];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Error';
        }
    });
    if (
        values.phone_or_mail &&
        !(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(values.phone_or_mail) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(values.phone_or_mail))

    ) {
        errors.phone_or_mail = 'Invalid email address';
    }
    return errors;
};

const RegisterForm = props => {

    let history = useHistory();
    const handleSubmit = (data) => {
        props.setSignInForm(data);
        props.sendSignInForm(data);
    };

    return (
        <>
            <Box component={'h1'} textAlign={'center'}>
                Регистрация
            </Box>
            <StepsActivation stepFirst/>
            <Box
                component={'form'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                flexGrow={{xs: 2, sm: 0}}
                onSubmit={props.handleSubmit(handleSubmit)}
            >
                <Box>
                    <Box className={stl.mobilWrap}>
                        <Box mb={{xs: 0, md: 1}}>
                            <InputField
                                label={'Имя'}
                                name={'name'}
                            />
                        </Box>
                        <Box mb={{xs: 0, md: 4}} mt={{xs: -1, sm: 0}}>
                            <InputField
                                label={'Email или телефон'}
                                name={'phone_or_mail'}
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
                            Зарегистрироваться
                        </Button>
                    </Box>
                    <Box
                        textAlign="center"
                        letterSpacing={1.2}
                        display={{xs: 'none', sm: 'block'}}
                    >
                        Есть аккаунт?
                        <Box
                            component={'span'}
                            ml={1}
                            className={'cup'}
                            onClick={() => history.push('/login')}
                        >
                            <ins>Войти</ins>
                        </Box>
                    </Box>
                </Box>
                <Box
                    textAlign="center"
                    display={{xs: 'block', sm: 'none'}}
                    mb={2}
                >
                    <Box className={'cup'} mb={1} onClick={() => history.push('/login')}>Войти</Box>
                    <Box
                        component={'span'}
                        ml={-1}
                        onClick={() => history.push('/login')}
                    >
                        <ArrowDown viewBox="0 0 35 19"/>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default reduxForm({form: 'reg', validate})(RegisterForm);
