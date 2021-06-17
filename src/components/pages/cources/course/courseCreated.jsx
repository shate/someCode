import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const CourseCreated = () => {
    return (
        <Box align={'center'} m={'auto'}>
            <Typography variant={'h1'} align={'center'}>
                Добро пожаловать на страницу создания Вашего курса!
            </Typography>
            <Box my={5}>
                <Typography variant={'h3'} align={'center'} component="p">
                    Курс состоит из категорий, в которых находятся страницы. Сейчас Вам <br/> необходимо создать первую страницу или категорию страниц.
                </Typography>
            </Box>
            <Grid container spacing={3} alignItems={'center'} justify="center">
                <Grid item xs={12} md={5} lg={4} xl={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        size={'large'}
                        fullWidth

                    >
                        Создать категорию
                    </Button>
                </Grid>
                <Grid item xs={12} md={5} lg={4} xl={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        size={'large'}
                        fullWidth

                    >
                        Создать страницу
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CourseCreated;
