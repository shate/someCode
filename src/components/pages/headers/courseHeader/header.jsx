import React, { useState } from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { Form, reduxForm } from 'redux-form';
import InputField from '../../../forms/inputField/inputField';
import Grid from '@material-ui/core/Grid';
import Search from '../../../customIcons/search';
import HeaderNavigation from './nav';

import stl from './header.module.scss';

const CoursesHeader = (props) => {

    const [showSearch, setShowSearch] = useState(false);

    return (
        <Box display={{xs: 'none', sm: 'block'}}>
            <Box
                display={{xs: 'none', sm: 'flex'}}
                justifyContent={'space-between'}
                right={20}
                top={20}
                alignItems={'center'}
                className={stl.desktopSearchForm}
            >
                <Box/>
                {props.title && <Typography variant={'h1'}>
                    {props.title}
                </Typography>}
                <Box display={'flex'}>
                    <Box className={`${showSearch && stl.formWrapp}`}>
                        <Form onSubmit={props.handleSubmit}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item xs>
                                    <Box display={showSearch ? 'block' : 'none'}>
                                        <InputField name={'search'}/>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box>
                                        <Button
                                            onClick={() => setShowSearch(!showSearch)}
                                            className={stl.searchBtn}
                                        >
                                            <Search viewBox="0 0 28 28"/>
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    </Box>
                    <HeaderNavigation setActionsPage={props.setActionsPage} role={props.role}/>
                </Box>
            </Box>
            <Box
                display={{xs: 'flex', sm: 'none'}}
                justifyContent="space-between"
                flexGrow={1}
                alignItems="center"
            >
                {
                    showSearch
                        ? <Box
                            component={'form'}
                            pl={3} pr={7}
                            mt={-1.3}
                            onSubmit={props.handleSubmit}
                        >
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <Search
                                        viewBox="0 0 26 26"
                                        onClick={() => setShowSearch(!showSearch)}
                                        className={stl.mobil}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <InputField name={'search'}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        : <>
                            <Button onClick={() => setShowSearch(!showSearch)}>
                                <Search viewBox="0 0 26 26" className={stl.mobil}/>
                            </Button>
                            <Typography variant={'h1'}>
                                Мои курсы
                            </Typography>
                            <HeaderNavigation setActionsPage={props.setActionsPage} role={props.role}/>
                        </>
                }
            </Box>
        </Box>
    );
};

export default reduxForm({form: 'search'})(CoursesHeader);
