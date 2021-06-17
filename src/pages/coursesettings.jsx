import React, { useEffect, useState } from 'react';
import Page from '../components/layout/page/page';
import InputField from '../components/forms/inputField/inputField';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import Cropper from '../components/forms/profile/cropper';
import { Form, reduxForm } from 'redux-form';
import stl from '../components/forms/forms.module.scss';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Cover from '../components/pages/cources/course/cover/cover';
import { showCropper } from '../store/auth/actions';
import { editAction, deleteAction } from '../store/courses/actions';
import { useHistory, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import EditCourseHeader from '../components/pages/headers/editCourseHeader/header';
import CancelledBtn from '../components/templates/buttons/cancelled';
import DeleteBtn from '../components/templates/buttons/delete';
import { getCourseAction } from '../store/courses/actions';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { deleteCoverAction } from '../store/courses/actions.js';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'title',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Error';
        }
    });
    return errors;
};

const CourseSettings = (props) => {
    document.title = 'Настройки курса | IQ Academy';
    let history = useHistory();
    const [selectedFile, setFile] = useState(false);
    const [croppedPhoto, setCroppedPhoto] = useState(false);
    const [payment, setPayment] = useState(props.course.payment);
    const [status, setStatus] = useState(props.course.status);


    useEffect(() => {
        if (props.course) {
            const role = props.course.role || 0;
            if (+role < 1 || +role > 2) {
                history.push('/courses');
            }
        }
    }, [props.course]);

    useEffect(() => {
        props.token && props.getCourseAction(props.match.params.id);
    }, [props.token]);

    useEffect(() => {
        if (props.course) {
            props.initialize({
                title: props.course.title,
                status: props.course.status,
                image: props.course.image,
                payment: props.course.payment,
                price: props.course.price,
                description: props.course.description,
                period: props.course.period,
            });
        }

    }, [props.course]);

    const handleSubmit = (data) => {
        props.editAction(croppedPhoto ? {...data, image: croppedPhoto, id: props.course.id} : {
            ...data,
            id: props.course.id
        });
        history.push(`/course/${props.course.id}`);
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
        props.change('photo', img);
    };

    const handlePaymentChange = e => {
        props.change('payment', e.target.value);
        setPayment(e.target.value);
    };
    const handleStatusChange = e => {
        props.change('status', e.target.value);
        setStatus(e.target.value);
    };
    const paymentArr = [
        {
            value: 'percentage',
            label: 'Процент с каждой оплаты'
        },
        {
            value: 'fixed',
            label: 'Абонентская плата'
        }
    ];

    const statusArr = [
        {
            value: 0,
            label: 'Не активен'
        },
        {
            value: 1,
            label: 'Активен'
        }
    ];

    return (
        (props.course || props.course)
        && <Page
            header={
                <EditCourseHeader/>
            }
            isHeader={true}
        >{
            selectedFile && props.cropperIsShow
                ? <Cropper
                    selectedFile={selectedFile}
                    setCroppedImg={setCroppedImg}
                    showCropper={props.showCropper}
                    height={400}
                    width={300}
                    borderRadius={20}
                    border={[35, 70]}
                />
                : <>
                    <Box className='formContainer profile' width={1} px={{xs: 0, sm: 5}}>
                        <Box mb={2} display={{xs: 'none', sm: 'block'}}>
                            <Typography variant={'h1'} align={'center'}>
                                Настройки курса
                            </Typography>
                        </Box>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>

                                <Box
                                    component={'label'}
                                    htmlFor="photo"
                                    display={'block'}
                                    className={'cup'}
                                    mb={0}
                                    px={{xs: 3, sm: 0}}
                                >
                                    {(props.course.image || croppedPhoto)
                                        ? <Box
                                            component={'img'}
                                            src={croppedPhoto || props.course.image}
                                            alt=""
                                            borderRadius={20}
                                            width={1}
                                        />
                                        : <Cover/>
                                    }
                                </Box>
                                {
                                    props.course.image
                                        ? <Box textAlign="center" mt={3}>
                                            <Tooltip title="Удалить обложку">
                                                <Fab
                                                    color="primary"
                                                    aria-label="delete cover"
                                                    onClick={() => props.deleteCoverAction(props.course.id)}
                                                >
                                                    <DeleteBtn/>
                                                </Fab>
                                            </Tooltip>
                                        </Box>
                                        : null

                                }

                            </Grid>
                            <Grid item xs={12} sm={8}>
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
                                                label={'Название курса'}
                                                name={'title'}
                                            />
                                        </Box>
                                        <Box mb={{xs: 0, md: 1}}>
                                            <InputField
                                                label={'Описание курса'}
                                                name={'description'}
                                                multiline
                                                rowsMax="4"
                                            />
                                        </Box>
                                        <Box mb={{xs: 0, md: 1}}>
                                            <InputField
                                                label={'Статус'}
                                                name={'status'}
                                                select
                                                value={status}
                                                onChange={handleStatusChange}
                                                options={statusArr}
                                            />
                                        </Box>
                                        <Box mb={{xs: 0, md: 1}}>
                                            <InputField
                                                label={'Оплата'}
                                                name={'payment'}
                                                select
                                                value={payment}
                                                onChange={handlePaymentChange}
                                                options={paymentArr}
                                            />
                                        </Box>
                                        <Box mb={{xs: 0, md: 1}}>
                                            <InputField
                                                label={'Стоимость курса'}
                                                name={'price'}

                                            />
                                        </Box>
                                        <Box mb={{xs: 0, md: 1}}>
                                            <InputField
                                                label={'Периодичность оплаты'}
                                                name={'period'}
                                            />
                                            <Typography variant="caption">
                                                Оставьте 0 для единоразовой покупки
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box textAlign="center" my={4} px={{xs: 7, sm: 5}} mt={{xs: 6}} mb={{xs: 0}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size={'large'}
                                            fullWidth
                                            type={'submit'}
                                        >
                                            Сохранить
                                        </Button>
                                    </Box>
                                </Form>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        pl={{xs: 1.5, sm: 13}}
                        pr={4}
                        py={2}
                        display={'flex'}
                        justifyContent={'space-between'}
                    >
                        <Box onClick={() => props.history.goBack()}>
                            <CancelledBtn/>
                        </Box>
                        <Box onClick={() => {
                            props.deleteAction(props.course.id);
                            props.history.push('/courses');
                        }}>
                            <DeleteBtn title={'Удалить курс'}/>
                        </Box>
                    </Box>
                </>
        }
        </Page>
    );
};

const mapStateToProps = (state) => ({
    cropperIsShow: state.authReducer.cropperIsShow,
    token: state.authReducer.token,
    course: state.coursesReducer.course,

});

export default reduxForm({form: 'settings', validate})(connect(mapStateToProps, {
    showCropper,
    editAction,
    deleteAction,
    getCourseAction,
    deleteCoverAction

})(withRouter(CourseSettings)));


