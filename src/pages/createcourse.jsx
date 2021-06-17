import React, { useEffect, useState } from 'react';
import Page from '../components/layout/page/page';
import CreateCourseHeader from '../components/pages/headers/createCoursesHeader/header';
import { Form, reduxForm } from 'redux-form';
import InputField from '../components/forms/inputField/inputField';
import { Button, Box } from '@material-ui/core';
import Cover from '../components/pages/cources/course/cover/cover';
import CancelledBtn from '../components/templates/buttons/cancelled';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { showCropper } from '../store/auth/actions';
import Cropper from '../components/forms/profile/cropper';
import { createAction } from '../store/courses/actions';

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

const CreateCourse = props => {
    document.title = 'Создание курса | IQ Academy';
    let history = useHistory();
    const [selectedFile, setFile] = useState(false);
    const [croppedPhoto, setCroppedPhoto] = useState(false);

    const handleSubmit = (data) => {
        props.createAction({...data, image: croppedPhoto});

    };
   useEffect(()=>{
       if(props.course){
           console.log('props.course.id', props.course.id)
           history.push(`/course/${props.course.id}`);
       }

   }, [props.course]);

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
        //  props.setProfile({...props.profile, photo: img});
        props.change('photo', img);
    };

    return (
        <Page header={
            <CreateCourseHeader
                cropperIsShow={props.cropperIsShow}
                showCropper={props.showCropper}
            />
        }
              isHeader={true}
        >
            {
                props.cropperIsShow
                    ?

                        <Cropper
                            selectedFile={selectedFile}
                            setCroppedImg={setCroppedImg}
                            showCropper={props.showCropper}
                            height={400}
                            width={300}
                            borderRadius={20}
                            border={[35, 70]}
                        />

                    :
                    <Box component={'main'} pt={0}>
                        <Box
                            display={'flex'}
                            height={1} flexDirection={'column'}
                            mt={{xs: -6, sm: 2}}
                            mb={'auto'}
                            mx={2}
                            alignItems={'center'}
                            alignSelf={'center'}
                            width={1}
                        >
                            <Box className='formContainer' mx={5} width={1}>
                                <Box component={'h1'} textAlign={'center'} m={0} display={{xs: 'none', sm: 'block'}}>
                                    Создание курса
                                </Box>
                                <Form onSubmit={props.handleSubmit(handleSubmit)}>
                                    <input
                                        type="file"
                                        id="photo"
                                        style={{display: 'none'}}
                                        onChange={onChangeHandler}
                                        accept={'image/png, image/jpeg, image/jpg'}
                                    />
                                    <Box mb={{xs: 0, md: 1}}>
                                        <InputField
                                            label={'Название'}
                                            name={'title'}
                                        />
                                    </Box>
                                    <Box
                                        width={{xs: '100%', sm: 300}}
                                        my={5}
                                        mx={'auto'}
                                    >
                                        <Box component={'label'}
                                             htmlFor="photo"
                                             width={1}
                                             className={'cup'}
                                             maxWidth={1}
                                        >{
                                            croppedPhoto
                                                ? <Box
                                                    component={'img'}
                                                    src={croppedPhoto}
                                                    alt=""
                                                    width={1}
                                                    borderRadius={20}
                                                />
                                                : <Cover/>
                                        }
                                        </Box>
                                    </Box>
                                    <Box textAlign="center"  px={{sm: 5}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size={'large'}
                                            fullWidth
                                            type={'submit'}
                                        >
                                            Продолжить
                                        </Button>
                                    </Box>
                                </Form>
                            </Box>
                        </Box>
                        <Box onClick={() => history.push('/courses')} py={3}>
                            <CancelledBtn/>
                        </Box>
                    </Box>
            }
        </Page>
    );
};

const mapStateToProps = (state) => ({
    cropperIsShow: state.authReducer.cropperIsShow,
    course: state.coursesReducer.course,
});

export default connect(mapStateToProps, {
    showCropper,
    createAction
})(reduxForm({form: 'createcourse', validate})(CreateCourse));
