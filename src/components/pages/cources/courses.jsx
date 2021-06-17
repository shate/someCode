import React from 'react';
import Grid from '@material-ui/core/Grid';
import CoursesItem from './coursesItem';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import EmptyList from './empty/emptyList';

const CoursesPage = (props) => {

    const isMobile = useMediaQuery({maxWidth: 600});

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: props.coursesList.length !== 1,
    };

    return (
        props.coursesList.length
            ? isMobile
                ? <Slider {...settings}>
                    {props.coursesList.map((item) => {
                        return <CoursesItem key={item.id} {...item} isSlider/>;
                    })}
                </Slider>
                : <Grid container spacing={2}>
                    {props.coursesList.map((item) => {
                        return <Grid item sm={6} md={4} xl={3} key={item.id}>
                            <CoursesItem {...item}/>
                        </Grid>;
                    })}
                </Grid>
            : <EmptyList setShowSearch={props.setShowSearch} showSearch={props.showSearch}/>
    );
};

export default CoursesPage;
