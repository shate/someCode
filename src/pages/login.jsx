import React, { useEffect, useState } from 'react';
import FormTpl from '../components/templates/mainTpl';
import LoginForm from '../components/forms/loginForm';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendLoginForm } from '../store/auth/actions';
import { useCookies } from 'react-cookie';

const Login = (props) => {
    document.title = 'Авторизация | IQ Academy';
    const [cookies, setCookie] = useCookies(['iqAcademy']);
    const [phoneOrMail, setPhoneOrMail] = useState(false);
    let history = useHistory();

    useEffect(() => {
        if (props.token) {
            setCookie('iqAcademy', props.token, {path: '/', maxAge: 315360000});
            history.push('/courses');
        }
    }, [props.token]);

    useEffect(() => {
        if (props.activation) {
            history.push('/');
            history.push({phoneOrMail : phoneOrMail});
        }
    }, [props.activation]);

    return (
        <FormTpl>
            <LoginForm sendLoginForm={props.sendLoginForm} setPhoneOrMail={setPhoneOrMail}/>
        </FormTpl>
    )
};

const mapStateToProps = (state) => ({
    token: state.authReducer.token,
    activation: state.authReducer.activation,
});

export default connect(mapStateToProps, {
    sendLoginForm,
})(Login);
