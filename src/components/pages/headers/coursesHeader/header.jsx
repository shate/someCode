import React, { useState } from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { Form, reduxForm } from 'redux-form';
import InputField from '../../../forms/inputField/inputField';
import Grid from '@material-ui/core/Grid';
import Search from '../../../customIcons/search';
import Logo from '../../../layout/logo/logo';
import { useHistory } from 'react-router-dom';

import stl from './header.module.scss';

const CoursesHeader = props => {

    let history = useHistory();

    const handleSubmit = (data) => {
        if(Object.keys(data).length === 0){
          props.setShowSearch(false);
          return props.getCoursesListAction();
        }
        props.searchCoursesAction(data);
    };

    return (
        <>
            <Box
                display={{xs: 'none', sm: 'flex'}}
                position={'absolute'}
                right={20}
                top={20}
                alignItems={'center'}
                className={stl.desktopSearchForm}
            >
                <Box className={`${props.showSearch && stl.formWrapp}`}>
                    <Form onSubmit={props.handleSubmit(handleSubmit)}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item xs>
                                <Box display={props.showSearch ? 'block' : 'none'}>
                                    <InputField name={'name'}/>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box>
                                    <Button onClick={() => props.setShowSearch(!props.showSearch)} className={stl.searchBtn}>
                                        <Search viewBox="0 0 30 30"/>
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                </Box>
                <Button onClick={() => history.push('/createcourse')}>
                    <AddCircleOutline/>
                </Button>
            </Box>
            <Box
                display={{xs: 'flex', sm: 'none'}}
                justifyContent="space-between"
                flexGrow={1}
                alignItems="center"
            >
                {
                    props.showSearch
                        ? <Box
                            component={'form'}
                            pl={3}
                            pr={7}
                            mt={-1.3}
                            onSubmit={props.handleSubmit}
                        >
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <Search
                                        viewBox="0 0 26 26"
                                        onClick={() => props.setShowSearch(!props.showSearch)}
                                        className={stl.mobil}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <InputField name={'name'}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        : <>
                            <Button onClick={() => props.setShowSearch(!props.showSearch)}>
                                <Search viewBox="0 0 26 26" className={stl.mobil}/>
                            </Button>
                            <Typography variant={'h1'}>
                                Мои курсы
                            </Typography>
                            <Button onClick={() => history.push('/createcourse')}>
                                <AddCircleOutline/>
                            </Button>
                        </>
                }
            </Box>
            <Logo/>
        </>
    );
};

export default reduxForm({form: 'search'})(CoursesHeader);
