import React, { useEffect } from 'react';
import Page from '../components/layout/page/page';
import Box from '@material-ui/core/Box';
import { withRouter, useHistory } from 'react-router-dom';
import CoursePage from '../components/pages/cources/course/course';
import { connect } from 'react-redux';
import { getCourseAction } from '../store/courses/actions';
import WelcomePage from '../components/pages/WelocomePage.jsx';
import { joinAction, leaveAction } from '../store/courses/actions.js';

const Course = props => {
    if (props.course) {
        document.title = `${props.course.title} | IQ Academy`;
    }
    let history = useHistory();

    useEffect(() => {
        props.token && props.getCourseAction(props.match.params.id);
    }, [props.token]);

    useEffect(() => {
        if(props.courseNotFound){
            history.push('/404')
        }
    }, [props.courseNotFound]);

    return (
        <Page>
            <Box component={'main'}>
                {props.course
                    ?
                    ( props.course.role > 0 && props.course.role < 5)
                        ? <CoursePage
                                course={props.course}
                                deleteAction={props.deleteAction}
                            />
                            :<WelcomePage
                            view={props.course}
                            joinAction={props.joinAction}
                            leaveAction={props.leaveAction}
                        />

                    : null
                }
            </Box>
        </Page>
    )
}

const mapStateToProps = (state) => ({
    course: state.coursesReducer.course,
    courseNotFound: state.coursesReducer.courseNotFound,
    token: state.authReducer.token,
});

export default connect(mapStateToProps, {
    getCourseAction,
    joinAction,
    leaveAction

})(withRouter(Course));
