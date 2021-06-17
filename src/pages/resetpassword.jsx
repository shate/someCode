import React, { useEffect, useState } from 'react';
import FormTpl from '../components/templates/mainTpl';
import ResetPassword from '../components/pages/resetpassword';
import ActivationTitle from '../components/forms/activationTitle';
import { connect } from 'react-redux';
import { activationPassword, forgotPassword, setActivation, setErrorMessage } from '../store/auth/actions';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const Reset = (props) => {
    document.title = 'Восстановление пароля | IQ Academy';
    let history = useHistory();
    const [isPhone, setIsPhone] = useState(false);
    const [cookies, setCookie] = useCookies(['iqAcademy']);

    const title = isPhone
        ? 'Сейчас Вам поступит звонок. Введите в поле кода последние 6 цифр номера телефона'
        : 'Сейчас Вам придет сообщение на указанный Email. Введите его в поле кода ниже';

    useEffect(() => {
        if (props.token) {
            setCookie('iqAcademy', props.token, {path: '/'});
            props.setErrorMessage({
                message: 'Пароль изменен. Сейчас Вы будете перенаправлены в Ваш кабинет',
                type: 'success'
            });
            const timer = setTimeout(() => history.push('/profile'), 3000)
            return function cleanup() {
                clearTimeout(timer)
            }
        }

    }, [props.token]);

    return (
        <FormTpl
            header={<ActivationTitle title={props.activation ? title : null}/>}
        >
            <ResetPassword
                forgotPassword={props.forgotPassword}
                activationPassword={props.activationPassword}
                setActivation={props.setActivation}
                setIsPhone={setIsPhone}
                isPhone={isPhone}
                activation={props.activation}
            />
        </FormTpl>
    )
}

const mapStateToProps = (state) => ({
    activation: state.authReducer.activation,
    token: state.authReducer.token,
});

export default connect(mapStateToProps,{
    forgotPassword,
    activationPassword,
    setErrorMessage,
    setActivation
})(Reset);
