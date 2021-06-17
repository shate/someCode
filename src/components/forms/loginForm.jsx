import React from 'react';
import { reduxForm } from 'redux-form';
import InputField from './inputField/inputField';
import { Button, Box, Tooltip } from '@material-ui/core';
import ArrowDown from '../customIcons/arrowDown';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Zoom from '@material-ui/core/Zoom';
import { useHistory } from 'react-router-dom';

import stl from './forms.module.scss';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'password',
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

const LoginForm = props => {
    let history = useHistory();
    const handleSubmit = (data) => {
        props.setPhoneOrMail(data.phone_or_mail)
        props.sendLoginForm(data);
    };

    return (
        <>
            <Box component={'h1'} textAlign={'center'}>
                Вход
            </Box>
            <Box
                component={'form'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                flexGrow={{xs:2, sm:0}}
                onSubmit={props.handleSubmit(handleSubmit)}
            >
                <Box>
                <Box className={stl.mobilWrap}>
                    <Box
                        mb={{xs: 0, md: 2}}
                        mt={{xs: 3, sm: 3}}
                    >
                        <InputField
                            label={'Email или телефон'}
                            name={'phone_or_mail'}
                        />
                    </Box>
                    <Box mb={{xs: 0, md: 1}} position={'relative'}>
                        <InputField
                            label={'Пароль'}
                            name={'password'}
                            type={'password'}
                        />
                        <Box
                            component={'span'}
                            className={stl.help}
                             onClick={() => history.push('/resetpassword')}
                        >
                            <Tooltip
                                title="Забыли пароль?"
                                aria-label="forget password"
                                TransitionComponent={Zoom}
                            >
                                <HelpOutline/>
                            </Tooltip>
                        </Box>
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
                        Войти
                    </Button>
                </Box>
                <Box
                    textAlign="center"
                    fontSize={18}
                    color={'primary.contrastText'}
                    letterSpacing={1.2}
                    display={{xs: 'none', sm: 'block'}}
                >
                    Нет аккаунта?
                    <Box
                        component={'span'}
                        ml={1} className={'cup'}
                        onClick={() => history.push('/')}
                    >
                        <ins>Регистрация</ins>
                    </Box>
                </Box>
                </Box>
                <Box
                    textAlign="center"
                    display={{xs: 'block', sm: 'none'}}
                    mb={2}
                >
                    <Box
                        className={'cup'}
                        fontSize={18} mb={1}
                        color={'primary.contrastText'}
                        onClick={() => history.push('/')}
                    >
                        Регистрация
                    </Box>
                    <Box
                        component={'span'}
                        ml={-1}
                        onClick={() => history.push('/')}
                    >
                        <ArrowDown viewBox="0 0 35 19"/>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default reduxForm({form: 'enter', validate})(LoginForm);
