import React from 'react';
import { Form, reduxForm } from 'redux-form';
import InputField from './inputField/inputField';
import { Button, Box } from '@material-ui/core';
import ArrowDown from '../customIcons/arrowDown';
import { useHistory, withRouter } from 'react-router-dom';

import stl from './forms.module.scss';
import StepsActivation from './steps/stepsActivation.jsx';

const validate = values => {
    const errors = {};
    const requiredFields = [
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

const ResetEmailPhoneForm = props => {
    let history = useHistory();
    const handleSubmit = (data) => {
        props.setSignInForm(data);
        props.editEmailPhone(data);
    };
    const text = {};

    switch (props.match.params.filter) {
        case 'mail':
            text.h1 = 'Введите новый Email';
            text.label = 'Email';
            text.fieldName = 'phone_or_mail';
            break;
        case 'phone':
            text.h1 = 'Введите новый номер телефона';
            text.label = 'Телефон';
            text.fieldName = 'phone_or_mail';
            break;
    }

    return (
        <>
            <Box component={'h1'} textAlign={'center'}>
                {text.h1}
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
                        <Box mb={{xs: 0, md: 4}} mt={{xs: 3, sm: 0}}>
                            <InputField
                                label={text.label}
                                name={text.fieldName}
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
                            Изменить
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
                </Box>
                <Box
                    textAlign="center"
                    display={{xs: 'block', sm: 'none'}}
                    mb={2}
                >
                    <Box className={'cup'} mb={1} onClick={() => {
                        history.push('/profile');
                        props.activation(false);
                    }}>Назад</Box>
                    <Box
                        component={'span'}
                        ml={-1}
                        color={'transparent'}
                        onClick={() => history.push('/profile')}
                    >
                        <ArrowDown viewBox="0 0 35 19"/>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default reduxForm({form: 'resetEmailPhone', validate})(withRouter(ResetEmailPhoneForm));
