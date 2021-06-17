import React, { useEffect, useState } from 'react';
import FormTpl from '../components/templates/mainTpl';
import Registration from '../components/pages/registration';
import { connect } from 'react-redux';
import { sendActivationForm, sendSignInForm, setActivation, setErrorMessage } from '../store/auth/actions';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import ActivationTitle from '../components/forms/activationTitle';

const Index = (props) => {

    document.title = 'Регистрация | IQ Academy';
    const [cookies, setCookie] = useCookies(['iqAcademy']);
    const [title, setTitle] = useState(false);
    let history = useHistory();

    const getLoginType = (data) => {
        const title = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(data.phone_or_mail)
            ? 'Сейчас Вам поступит звонок. Введите в поле кода последние 4 цифры номера телефона'
            : 'Сейчас Вам поступит смообщение на указанный Email. Введите в поле кода указанный в сообщении код';
        setTitle(title);
    };

    useEffect(() => {
        if (props.token) {
            setCookie('iqAcademy', props.token, {path: '/'});
            props.setErrorMessage({
                message: 'Вы успешно зарегистрированы. Сейчас Вы будете перенаправлены в Ваш кабинет',
                type: 'success'
            });
            const timer = setTimeout(() => history.push('/profile'), 4000)
            return function cleanup() {
                clearTimeout(timer)
            }
        }
    }, [props.token]);

    useEffect(() => {
        if (props.redirect) {
            const timer = setTimeout(() => history.push(props.redirect), 4000)
            return function cleanup() {
                clearTimeout(timer)
            }
        }
    }, [props.redirect]);

    return (
        <FormTpl header={<ActivationTitle title={props.activation ? title : null}/>}>
            <Registration
                activation={props.activation}
                sendSignInForm={props.sendSignInForm}
                sendActivationForm={props.sendActivationForm}
                setActivation={props.setActivation}
                getLoginType={getLoginType}
                phoneOrMail={props.location.phoneOrMail}
            />
        </FormTpl>
    )
}

const mapStateToProps = (state) => ({
    activation: state.authReducer.activation,
    redirect: state.authReducer.redirect,
    token: state.authReducer.token,
});

export default connect(mapStateToProps, {
    sendSignInForm,
    sendActivationForm,
    setErrorMessage,
    setActivation
})(Index);


