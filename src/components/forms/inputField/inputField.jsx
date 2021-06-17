import React from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import StylesProvider from '@material-ui/styles/StylesProvider';
import MenuItem from '@material-ui/core/MenuItem';

const renderTextField = ({
                             label,
                             input,
                             select,
                             options,
                             placeholder,
                             value,
                             meta: {touched, invalid, error},
                             ...custom
                         }) => {
    let valid = '';
    if (touched && !(touched && invalid)) {
        valid = 'MuiTextField-success';
    }
    if (!touched && !invalid) {
        valid = 'MuiTextField-default';
    }

    return (
        <StylesProvider injectFirst>
            {select && options.length ?
                <TextField
                    label={label}
                    select={select}
                    error={touched && invalid}
                    value={value}
                    {...input}
                    {...custom}
                    className={valid}

                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                :
                <TextField
                    label={label}
                    placeholder={placeholder}
                    select={select}
                    error={touched && invalid}
                    {...input}
                    {...custom}
                    className={valid}
                />
            }
        </StylesProvider>
    )
}

const InputField = props => {
    return (
        <Field
            multiline={props.multiline}
            rowsMax={props.rowsMax}
            fullWidth
            color="primary"
            margin={'dense'}
            select={props.select}
            component={renderTextField}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            options={props.options}
            label={props.label}
            validate={props.validate}
            type={props.type}
            onChange={props.inputHandler ? (event, newValue, previousValue, name) => props.inputHandler(event, newValue, previousValue, name) : null}
        />
    )
}

export default React.memo(InputField);
