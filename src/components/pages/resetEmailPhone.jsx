import React, { useState } from 'react';
import ResetEmailPhoneForm from '../forms/reseEmailPhoneForm';
import ActivationMailPhone from '../forms/activationMailPhone';

const ResetMailPhone = props => {

    const [regData, setSignInForm] = useState(false);

    return (
        props.activation
            ? <ActivationMailPhone
                activationEmailPhone={props.activationEmailPhone}
                regData={regData}
                setActivation={props.setActivation}
            />
            : <ResetEmailPhoneForm
                editEmailPhone={props.editEmailPhone}
                setSignInForm={setSignInForm}
                activation={props.setActivation}
            />
    );
};

export default ResetMailPhone;
