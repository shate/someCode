import React, { useEffect } from 'react';
import FormTpl from '../components/templates/mainTpl';
import ResetMailPhone from '../components/pages/resetEmailPhone';
import { connect } from 'react-redux';
import { activationEmailPhone, editEmailPhone, setActivation, setActivationSuccess } from '../store/auth/actions';
import ActivationTitle from '../components/forms/activationTitle';
import { useHistory, withRouter } from 'react-router-dom';

const ResetMailOrPhone = (props) => {
    document.title = 'Изменение пароля | IQ Academy';
    let history = useHistory();
    let title;
    switch (props.match.params.filter) {
        case 'mail':
            title = 'Сейчас Вам придет сообщение на указанный Email. Введите его в поле кода ниже';
            break;
        case 'phone':
            title = 'Сейчас Вам поступит звонок. Введите в поле кода последние 6 цифр номера телефона';
            break;
        default:
            title = '';
    }

    useEffect(() => {
        if (!props.token) {
            history.push('/');
        }
    });

    useEffect(() => {
        if (props.isActivationSuccess) {
            history.push('/profile');
            props.setActivationSuccess(false)
        }
    }, [props.isActivationSuccess]);

    return (
        <FormTpl
            header={<ActivationTitle title={props.activation ? title : null}/>}
        >
            <ResetMailPhone
                activation={props.activation}
                setActivation={props.setActivation}
                editEmailPhone={props.editEmailPhone}
                activationEmailPhone={props.activationEmailPhone}
            />
        </FormTpl>
    );
};
const mapStateToProps = (state) => ({
    activation: state.authReducer.activation,
    isActivationSuccess: state.authReducer.isActivationSuccess,
    token: state.authReducer.token,
    profile: state.authReducer.profile,
});

export default connect(mapStateToProps, {
    editEmailPhone,
    activationEmailPhone,
    setActivation,
    setActivationSuccess
})(withRouter(ResetMailOrPhone));
