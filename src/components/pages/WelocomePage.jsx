import React from 'react';
import { Box, Button } from '@material-ui/core';
import defaultCover from '../../assets/pic/1.jpg';
import Grid from '@material-ui/core/Grid';

const WelcomePage = props => {
    const role = +props.view.role || 0;
    let title = role === 5 ? 'Отменить заявку' : 'Записаться на курс';

    const handlerClick = () => {
        switch (role) {
            case 0 :
                props.joinAction(props.view.id);
                break;
            case 5 :
                props.leaveAction(props.view.id);
                break;
        }
    };
    return (
        <Box className='formContainer profile' mx={5}>
            <Box component={'h1'} textAlign={'center'} display={{xs: 'none', sm: 'block'}}>
                {props.view.title}
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Box component={'img'} src={props.view.image ? props.view.image : defaultCover}
                         alt={props.view.title} width={1} borderRadius={20}/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                        height={1}
                    >
                        <Box>
                            {props.view.description}
                        </Box>
                        <Box textAlign="center" my={3}>
                            <Box className='formContainer mobilBg' component={'span'} display={'inline-flex'}
                                 flexDirection={'column'} px={6} py={2}>
                                <Box component={'span'} fontSize={36} fontFamily={'Helvetica'}>
                                    {props.view.price}
                                    <Box component={'span'} ml={1} fontFamily={'Montserrat'}
                                         fontWeight={200}>р</Box>
                                </Box>
                                {props.view.period
                                    ?  <Box fontSize={20}>каждые { props.view.period } дней</Box>
                                    : ''
                                }
                            </Box>
                        </Box>
                        <Box px={{sm: 10}}>
                            <Button
                                variant="contained"
                                color="primary"
                                size={'large'}
                                fullWidth
                                onClick={props.onClick ? props.onClick : handlerClick}
                            >
                                {title}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(WelcomePage);
