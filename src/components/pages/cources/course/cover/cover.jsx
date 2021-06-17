import React from 'react';
import Box from '@material-ui/core/Box';
import stl from './cover.module.scss';
import Typography from '@material-ui/core/Typography';

const Cover = () => {

    return (
        <Box
            className={stl.cover}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Typography align={'center'} variant={'h3'}>
                Добавить<br/>
                изображение
            </Typography>
        </Box>
    );
};

export default Cover;
