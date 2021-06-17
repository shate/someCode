import React, { useEffect, useState } from 'react';
import CoursesPage from '../components/pages/cources/courses';
import Page from '../components/layout/page/page';
import Box from '@material-ui/core/Box';
import CoursesHeader from '../components/pages/headers/coursesHeader/header';
import { getCoursesListAction } from '../store/courses/actions';
import { connect } from 'react-redux';
import { searchCoursesAction, setCourse } from '../store/courses/actions.js';
import { toast, ToastContainer } from 'react-toastify';
import { setErrorMessage } from '../store/auth/actions.js';

const Courses = (props) => {
    document.title = 'Курсы | IQ Academy';
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
            props.setCourse(false);
        }, []
    );

    useEffect(() => {
            if (props.token) {
                props.getCoursesListAction();
            }
        }, [props.token]
    );

    useEffect(() => {
        if (props.message) {
            toast[props.message.type](props.message.message);
            props.setErrorMessage(false);
        }
    }, [props.message]);
    return (
        <Page header={
            <CoursesHeader
                searchCoursesAction={props.searchCoursesAction}
                setShowSearch={setShowSearch}
                showSearch={showSearch}
                getCoursesListAction={props.getCoursesListAction}
            />
        } isHeader={true}>
            <Box component={'main'}>
                {props.coursesList
                    ? <CoursesPage
                        coursesList={props.coursesList}
                        setShowSearch={setShowSearch}
                        showSearch={showSearch}
                    />
                    : null
                }
            </Box>
            <ToastContainer/>
        </Page>
    )
}

const mapStateToProps = (state) => ({
    coursesList: state.coursesReducer.coursesList,
    token: state.authReducer.token,
    message: state.authReducer.message,
});

export default connect(mapStateToProps, {
    getCoursesListAction,
    searchCoursesAction,
    setErrorMessage,
    setCourse

})(Courses);



