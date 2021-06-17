import React from 'react';
import Slider from 'react-slick';
import stl from './slider.module.scss';
import Box from '@material-ui/core/Box';

const SliderElem = () => {
    const settings = {
        dots: false,
        arrows: false,
        speed: 500,
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings} className={stl.slider}>
            <div>
                <Box
                    borderRadius="50%"
                    className={`${stl.step} ${stl.completed}`}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    1
                </Box>
            </div>
            <div>
                <Box
                    borderRadius="50%"
                    className={`${stl.step} ${stl.current}`}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    2
                </Box>
            </div>
            <div>
                <Box
                    borderRadius="50%"
                    className={`${stl.step}`}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    3
                </Box>
            </div>
            <div>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Box className={`${stl.middle}`}/>
                </Box>
            </div>
            <div>
                <Box
                    borderRadius="50%"
                    className={`${stl.step}`}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    4
                </Box>
            </div>
            <div>
                <Box
                    borderRadius="50%"
                    className={`${stl.step} ${stl.disabled}`}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    5
                </Box>
            </div>
            <div>
                <Box
                    borderRadius="50%"
                    className={`${stl.step}`}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    6
                </Box>
            </div>
        </Slider>
    );
};

export default SliderElem;
