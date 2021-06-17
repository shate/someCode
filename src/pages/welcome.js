import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import WelcomePage from '../components/pages/WelocomePage.jsx';
import { Box } from '@material-ui/core';

const Welcome = props => {
    document.title = 'Курсы | IQ Academy';
    let history = useHistory();

    return (
        props.view
       &&  <Box  display={'flex'} alignItems={'center'} height={1} flexDirection={'column'} mt={'auto'} mb={'auto'} mx={2}>
            <WelcomePage
                view={props.view}
                onClick={()=> history.push('/')}
            />
        </Box>

    )
}

const mapStateToProps = (state) => ({
    view: state.coursesReducer.view,
});

export default connect(mapStateToProps)(withRouter(Welcome));


