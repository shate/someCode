import React, { useEffect, useState } from 'react';
import 'date-fns';
import * as moment from 'moment';
import DateMobilPicker from 'react-mobile-datepicker';
import { Form, reduxForm } from 'redux-form';
import InputField from '../inputField/inputField';
import { Button, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import { DateRange } from '@material-ui/icons';
import { useHistory, withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Cropper from './cropper';
import { useMediaQuery } from 'react-responsive';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import nophoto from '../../../assets/img/circle.svg';
import stl from '../forms.module.scss';
import profile from './profile.module.scss';
import ru from 'date-fns/locale/ru';
import buildLocalizeFn from 'date-fns/locale/_lib/buildLocalizeFn';
import LogoutBtn from '../../templates/buttons/logout';
import DeleteBtn from '../../templates/buttons/delete';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const monthValues = {
    narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
    abbreviated: [
        'янв.',
        'фев.',
        'март',
        'апр.',
        'май',
        'июнь',
        'июль',
        'авг.',
        'сент.',
        'окт.',
        'нояб.',
        'дек.'
    ],
    wide: [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь'
    ]
};

ru.localize.month = buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide',
    defaultFormattingWidth: 'wide'
});

const dateConfig = {
    'date': {
        format: 'D',
        caption: 'День',
        step: 1,
    },

    'month': {
        format: 'M',
        caption: 'Месяц',
        step: 1,
    },
    'year': {
        format: 'YYYY',
        caption: 'Год',
        step: 1,
    },

};

const validate = values => {
    const errors = {};

    const requiredFields = [
        'name',
    ];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Error';
        }
    });

    if (values.mail && !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(values.mail)) {
        errors.mail = 'Invalid email address';
    }

    if (values.phone && !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(values.phone)) {
        errors.phone = 'Invalid phone';
    }
    return errors;
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileForm = (props) => {

    const [isOpen, toggleOpen] = useState(false);
    const [sex, setSex] = useState(props.profile.sex);
    const [selectedFile, setFile] = useState(false);
    const [croppedPhoto, setCroppedPhoto] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(false);
    const isMobile = useMediaQuery({maxWidth: 900});
    const [selectedDate, setSelectedDate] = useState(false);

    let history = useHistory();


    const sexArr = [
        {
            value: 0,
            label: 'Не указан'
        },
        {
            value: 1,
            label: 'Мужской'
        }, {
            value: 2,
            label: 'Женский'
        }
    ];

    useEffect(() => {
        if (props.message) {
            toast[props.message.type](props.message.message);
            props.setErrorMessage(false);
        }

    }, [props.message]);

    useEffect(() => {

        setSelectedDate(props.profile.birth_date > 0 ? moment(new Date(props.profile.birth_date * 1000)) : new Date());
        props.initialize({
            name: props.profile.name,
            mail: props.profile.mail,
            data: props.profile.birth_date > 0 ? moment(new Date(props.profile.birth_date * 1000)).format('DD/MM/YYYY') : '',
            sex: props.profile.sex,
            phone: props.profile.phone,
            password: props.profile.password || ''
        });

    }, [props.profile]);

    const handleSubmit = (data) => {
        props.setProfile({...props.profile, ...data});
        props.editProfile();
    };

    const handleClick = () => {
        toggleOpen(true);
    };

    const handleCancel = () => {
        toggleOpen(false);
    };

    const handleSelect = (date) => {

        props.change('data', moment(new Date(date)).format('DD/MM/YYYY'));
        props.change('birth_date', Math.round(date.getTime() / 1000));
        toggleOpen(false);
    };

    const handleChange = e => {
        props.change('sex', e.target.value);
        setSex(e.target.value);
    };

    const onChangeHandler = e => {
        const file = e.target.files[0];
        if (file.type.endsWith('jpg') || file.type.endsWith('jpeg') || file.type.endsWith('png')) {
            setFile(file);
            props.showCropper(true);

        }
    };

    const setCroppedImg = img => {
        setCroppedPhoto(img);
        setFile(false);
        props.showCropper(false);
        props.setProfile({...props.profile, photo: img});
        props.change('photo', img);
    };

    const handleClickOpen = (e, field) => {

        switch (field) {

            case 'mail' :
                setFormData({title: 'почту', form: field});
                break;
            case 'phone' :
                setFormData({title: 'телефон', form: field});
                break;
            default :
                break;

        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        selectedFile && props.cropperIsShow
            ? <Cropper
                selectedFile={selectedFile}
                setCroppedImg={setCroppedImg}
                showCropper={props.showCropper}
                width={300}
                height={300}
                borderRadius={300}
                border={[50, 100]}
            />
            : <>
                <Box className='formContainer profile' width={1}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3}>
                            {props.profile && props.profile.photo ?
                                <Box className={profile.userPhoto} m={'auto'}>
                                    <Box component={'label'} htmlFor="photo" className={'cup'} mb={0}>
                                        <Box component={'img'} src={croppedPhoto || props.profile.photo} alt=""
                                             borderRadius="50%" width={1}/>
                                    </Box>
                                </Box>
                                :

                                <Box
                                    component={'label'}
                                    htmlFor="photo"
                                    className='cup'
                                    display={'block'}
                                    mb={0}
                                > <Box width={'125px'}
                                       pt={2}
                                       ml={'auto'}
                                       mr={'auto'}>
                                    <Box component={'img'} src={nophoto} alt=""/>
                                </Box>
                                </Box>
                            }
                            {
                                props.profile.photo
                                    ? <Box textAlign="center" mt={3}>
                                        <Tooltip title="Удалить аватар">
                                            <Fab
                                                color="primary"
                                                aria-label="delete avatar"
                                                onClick={props.deleteAvatar}
                                            >
                                                <DeleteBtn/>
                                            </Fab>
                                        </Tooltip>
                                    </Box>
                                    : null

                            }
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Form onSubmit={props.handleSubmit(handleSubmit)}>
                                <input
                                    type="file"
                                    id="photo"
                                    style={{display: 'none'}}
                                    onChange={onChangeHandler}
                                    accept={'image/png, image/jpeg, image/jpg'}
                                />
                                <Box className={stl.mobilWrap} mt={{xs: 6, sm: 0}}>
                                    <Box mb={{xs: 0, md: 1}}>
                                        <InputField
                                            label={'Имя'}
                                            name={'name'}
                                            type={'text'}
                                        />
                                    </Box>
                                    <Box mb={{xs: 0, md: 1}} onClick={(e) => handleClickOpen(e, 'mail')}>
                                        <InputField
                                            label={'Email'}
                                            name={'mail'}
                                            type={'button'}
                                        />
                                    </Box>
                                    <Box mb={{xs: 0, md: 1}} onClick={(e) => handleClickOpen(e, 'phone')}>
                                        <InputField
                                            label={'Телефон'}
                                            name={'phone'}
                                            type={'button'}
                                        />
                                    </Box>
                                    <Box mb={{xs: 0, md: 1}}>
                                        <InputField
                                            label={'Пароль'}
                                            name={'password'}
                                            type={'password'}
                                        />
                                    </Box>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            {isMobile
                                                ? <Box position={'relative'} onClick={handleClick} mb={{sm: -3.5, md: 0}}>
                                                    <InputField
                                                        label={'Дата рождения'}
                                                        name={'data'}
                                                        type={'text'}
                                                    />
                                                    <Box component={'span'} className={stl.help}
                                                         onClick={handleClick}><DateRange/></Box>
                                                    <DateMobilPicker
                                                        isOpen={isOpen}
                                                        onSelect={handleSelect}
                                                        onCancel={handleCancel}
                                                        theme={'android-dark'}
                                                        dateConfig={dateConfig}
                                                        showCaption={true}
                                                        headerFormat={'DD/MM/YYYY'}
                                                        confirmText='Выбрать'
                                                        cancelText='Закрыть'
                                                        autocomplete={'off'}
                                                        max={new Date()}
                                                    />
                                                </Box>
                                                : <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
                                                    <KeyboardDatePicker
                                                        className={'MuiTextField-default'}
                                                        value={selectedDate}
                                                        onChange={(date) => {
                                                            setSelectedDate(date);
                                                            handleSelect(date);
                                                        }}
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="dense"
                                                        id="date-picker-dialog"
                                                        label="Дата рождения"
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box pt={0.8} mb={{xs: -2, sm: 0}}>
                                                <InputField
                                                    name={'sex'}
                                                    select
                                                    label="Пол"
                                                    value={sex}
                                                    onChange={handleChange}
                                                    options={sexArr}
                                                    className={stl.select}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box textAlign="center" my={4} px={{xs: 7, sm: 5}} mt={{xs: 6}} mb={{xs: 0}}>
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
                            </Form>
                        </Grid>
                    </Grid>
                    <ToastContainer/>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                    >
                        <DialogTitle>{`Хотите изменить ${formData.title}?`}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => history.push(`/resetmailphone/${formData.form}`)}
                                    variant="contained"
                                    color="primary">
                                Да
                            </Button>
                            <Button onClick={handleClose}
                                    variant="contained"
                                    color="primary">
                                Закрыть
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                <Box
                    pl={{xs: 1.5, sm: 13}}
                    py={2}
                    display={'flex'}
                    justifyContent={'space-between'}
                    pr={4}
                    width={1}
                    boxSizing={'border-box'}
                >
                    <LogoutBtn fullWidth/>
                    <Box onClick={() => {
                        props.deleteAccount();

                    }}>
                        <DeleteBtn title={'Удалить аккаунт'}/>
                    </Box>
                </Box>
            </>

    );
};

export default reduxForm({form: 'profile', validate})(withRouter(ProfileForm));
