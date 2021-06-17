import React, { useEffect, useState } from 'react';
import RegisterForm from '../forms/registerForm';
import ActivationForm from '../forms/activationForm';

const Registration = props => {
    const [regData, setSignInForm] = useState({phone_or_mail : props.phoneOrMail});

    useEffect(() => {
            props.getLoginType(regData);
        }, [regData]
    );

    return (
        props.activation
            ? <ActivationForm
                sendActivationForm={props.sendActivationForm}
                regData={regData}
                sendSignInForm={props.sendSignInForm}
                setActivation={props.setActivation}
            />
            : <RegisterForm
                sendSignInForm={props.sendSignInForm}
                setSignInForm={setSignInForm}
            />
    );
};

export default Registration;
