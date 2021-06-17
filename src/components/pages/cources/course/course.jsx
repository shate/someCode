import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CourseHeader from '../../headers/courseHeader/header';
import Logo from '../../../layout/logo/logo';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { FormatListBulleted } from '@material-ui/icons';
import StepperElem from './stepper/stepper';
import SliderElem from './slider/slider';
import HeaderNavigation from '../../headers/courseHeader/nav';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, withRouter } from 'react-router-dom';
import CourseCreated from './courseCreated.jsx';
import defaultCover from "../../../../assets/pic/1.jpg";

export const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    }

}));

const CoursePage = props => {

    const classes = useStyles();
    let history = useHistory();
    const [actionsPage, setActionsPage] = useState(false);

    useEffect(() => {
        if (actionsPage.settingsCourse) {
            history.push(`/coursesettings/${props.course.id}`);
        }
    }, [actionsPage.settingsCourse]);

    return (props.course &&
        <Grid
            container
            spacing={8}
            classes={{
                root: classes.root
            }}

        >
            <Grid item sm={5} md={4} lg={3} xl={2} className={'overlay2'}>
                <Box display={{xs: 'none', sm: 'block'}}>
                    <Logo/>
                    <Box component={'section'} mt={3}>
                        <Box component={'img'} src={props.course.image ? props.course.image : defaultCover} borderRadius={20} width={1}/>
                    </Box>

                    <Box component={'section'} mt={4} className={'overlay'}>
                        <Box mb={4}>
                            <Typography variant={'h3'}>
                                {props.course.title}
                            </Typography>
                        </Box>
                        <Typography variant={'h5'}>
                            {props.course.lessons ? `${props.course.lessons} уроков` : null}
                            {props.course.lessons && props.course.tests ? ' • ' : null}
                            {props.course.tests ? `${props.course.tests} теста` : null}

                        </Typography>
                    </Box>

                    {props.course.categories
                        ? <StepperElem categories={props.course.categories}/>
                        : null
                    }

                </Box>
                <Box
                    display={{xs: 'flex', sm: 'none'}}
                    justifyContent={'space-between'}
                    px={3}
                    borderBottom={1}
                    pb={2}
                >
                    <Box ml={-2}>
                        <Button>
                            <FormatListBulleted/>
                        </Button>
                    </Box>
                    <Typography variant={'h1'}>
                        2 урок
                    </Typography>
                    <Box mr={-2}>
                        <HeaderNavigation setActionsPage={setActionsPage} role={props.course.role}/>
                    </Box>
                </Box>
                <Box
                    display={{xs: 'flex', sm: 'none'}}
                    pt={2}
                    pl={1}
                >
                    {props.course.categories
                        ? <SliderElem/>
                        : null
                    }
                </Box>
            </Grid>
            <Grid
                item sm={7}
                md={8}
                lg={9}
                xl={10}
                classes={{
                    root: classes.content
                }}
            >
                <CourseHeader
                    setActionsPage={setActionsPage}
                    role={props.course.role}
                />
                <Box
                    pt={{sm: 5}}
                    component={'article'}
                    display={'flex'}
                    flexDirection={'column'}
                    flexGrow={1}
                    justifyContent={'space-between'}
                >
                    <Box>
                        {/*<Typography variant={'h1'} align={'center'}>*/}
                        {/*{props.course.title}*/}
                        {/*</Typography>*/}
                        <Box mt={4}>
                            {
                                props.course.description
                                    ? <Typography>
                                        {props.course.description}
                                    </Typography>
                                    : <CourseCreated/>
                            }

                        </Box>
                    </Box>
                    {
                        props.course.description
                            ? <Box textAlign={'center'} my={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size={'large'}
                                >
                                    <Box component={'span'} display={{xs: 'none', md: 'inline-block'}}>
                                        Отметить страницу как изученную
                                    </Box>
                                    <Box component={'span'} display={{xs: 'inline-block', md: 'none'}}>
                                        Закончить урок
                                    </Box>
                                </Button>
                            </Box>
                            : null
                    }

                </Box>
            </Grid>
        </Grid>
    );
};

export default withRouter(CoursePage);
