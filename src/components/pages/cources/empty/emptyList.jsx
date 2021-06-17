import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Search from '../../../customIcons/search';
import { AddCircleOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, withRouter } from 'react-router-dom';

export const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
        maxWidth: 70,
        maxHeight: 70,
    },

}));

const EmptyList = props => {
    const classes = useStyles();
    let history = useHistory();

    return (
        <Box align={'center'} m={'auto'}>
            <Typography variant={'h1'} align={'center'}>
                Добро пожаловать на платформу IQ.Academy!
            </Typography>
            <Box mt={5}>
                <Typography variant={'h3'} align={'center'} component="p">
                    Если Вы преподаватель, специалист в каком-либо направлении и планируете <br/> зарабатывать деньги на
                    обучении, создайте свой курс и начните его продвигать
                </Typography>
            </Box>
            <Box my={5}>
                <Grid container spacing={3} alignItems={'center'}>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size={'large'}
                                fullWidth
                                onClick={() => history.push('/createcourse')}
                            >
                                Создать курс
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={3} alignItems={'center'}>
                            <Grid item xs={5}>
                                <Typography variant={'h3'} component="p">
                                    или нажмите
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Box>
                                    <AddCircleOutline classes={{
                                        root: classes.root
                                    }}/>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant={'h3'} component="p">
                                    в углу экрана
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Typography variant={'h3'} align={'center'} component="p">
                    Если Вы планируете обучение, Вы можете найти нужный<br/> курс через поиск или отсканировав QR-код с
                    телефона
                </Typography>
            </Box>
            <Box my={5}>
                <Grid container spacing={3} alignItems={'center'}>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size={'large'}
                                fullWidth
                                onClick={()=>props.setShowSearch(!props.showSearch)}
                            >
                                Найти курс
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={3} alignItems={'center'}>
                            <Grid item xs={5}>
                                <Typography variant={'h3'} component="p">
                                    или нажмите
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Box>
                                    <Search viewBox="0 0 30 30"
                                            classes={{
                                                root: classes.root
                                            }}/>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant={'h3'} component="p">
                                    в углу экрана
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

};


export default React.memo(withRouter(EmptyList));
