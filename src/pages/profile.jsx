import React, { useEffect } from 'react';
import Page from '../components/layout/page/page';
import ProfileForm from '../components/forms/profile/profileForm';
import Box from '@material-ui/core/Box';
import ProfileHeader from '../components/pages/headers/profileHeader/header';
import { connect } from 'react-redux';
import { editProfile, getUserProfile, setErrorMessage, setProfile, showCropper, deleteAccount } from '../store/auth/actions';
import { useHistory, withRouter } from 'react-router-dom';
import { deleteAvatar } from '../store/auth/actions.js';

const Profile = (props) => {
    document.title = 'Профиль | IQ Academy';
    let history = useHistory();

    useEffect(() => {
            if (!props.profile && props.token) {
                props.getUserProfile();
            }
        }, [props.token]
    );

    useEffect(() => {
            if (!props.token) {
                history.push('/');
            }
        }, [props.token]
    );

    return (
        <Page
            header={
                <ProfileHeader
                    cropperIsShow={props.cropperIsShow}
                    showCropper={props.showCropper}
                />
            }
            isHeader={true}
        >
            <Box component={'main'} px={0} pt={0}>
                {
                    props.profile
                        ? <ProfileForm
                            profile={props.profile}
                            message={props.message}
                            cropperIsShow={props.cropperIsShow}
                            editProfile={props.editProfile}
                            setErrorMessage={props.setErrorMessage}
                            setProfile={props.setProfile}
                            showCropper={props.showCropper}
                            deleteAccount={props.deleteAccount}
                            deleteAvatar={props.deleteAvatar}
                        />
                        : null
                }
            </Box>
        </Page>
    );
};

const mapStateToProps = (state) => ({
    message: state.authReducer.message,
    profile: state.authReducer.profile,
    token: state.authReducer.token,
    cropperIsShow: state.authReducer.cropperIsShow,
});

export default connect(mapStateToProps, {
    getUserProfile,
    editProfile,
    setErrorMessage,
    setProfile,
    showCropper,
    deleteAccount,
    deleteAvatar
})(withRouter(Profile));


