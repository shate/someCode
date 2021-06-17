import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import stl from './coursesItem.module.scss';
import cover from '../../../assets/pic/1.jpg';
import progress from '../../../assets/pic/Statistics.png';

const CoursesItem = props => {

    const declination = (number, titles) => {
        const cases = [2, 0, 1, 1, 1, 2];
        return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };

    return (
        <Box className={stl.item} mb={{sm: 7}} mx={{xsm: 1, sm: 0}}>
            <Link to={`/course/${props.id}`}>
                <Box component={'img'} src={props.image ? props.image : cover} alt={props.title} className={stl.cover}/>
                <Box className={stl.overlay}>
                    <Typography variant={'h3'}>{props.title}</Typography>
                    <Box mt={{xs:0,sm:3}}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs>
                                <Typography variant={'h5'}>{props.lessons} уроков
                                    • {declination(props.tests, ['тест', 'теста', 'тестов'])}</Typography>
                            </Grid>
                            <Grid item >
                                <Box  width={'48px'} height={'48px'} display={'flex'} position={'right'}>
                                    <CircularProgressbar
                                        value={props.points && props.user_points * 100/props.points}
                                        text={`${props.points ? (props.user_points * 100/props.points) : 0}%`}
                                        strokeWidth={4}
                                        styles={{
                                            path: {
                                                stroke: `#57B535`,
                                                strokeLinecap: 'round',
                                            },
                                            trail:{
                                                stroke: 'rgba(87, 181, 53, 0.5)',
                                            },
                                            text: {
                                                fill: '#E1D3C1',

                                            },

                                        }}
                                    />;
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Link>
        </Box>
    );
};

export default React.memo(CoursesItem);
