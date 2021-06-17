import React, { useState } from 'react';
import ActivationPassword from '../forms/activationPassword';
import ResetPasswordForm from '../forms/resetPasswordForm';

const ResetPassword = props => {

    const [regData, setSignInForm] = useState(false);

    return (

        props.activation
            ? <ActivationPassword
                activationPassword={props.activationPassword}
                forgotPassword={props.forgotPassword}
                regData={regData}
                setActivation={props.setActivation}
                isPhone={props.isPhone}
            />
            : <ResetPasswordForm
                forgotPassword={props.forgotPassword}
                setSignInForm={setSignInForm}
                setIsPhone={props.setIsPhone}
            />
    );
};

export default ResetPassword;
