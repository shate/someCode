import React from 'react';
import Box from '@material-ui/core/Box';
import Delete from '../../customIcons/delete';
import stl from './cancelled.module.scss';

const DeleteBtn = props => {

    return (
        <Box
            pl={{xs: 1.5, sm: 0}}
            className={stl.cancelledBtn}
            alignItems={'center'}
            display={'inline-flex'}
        >
            {props.title
                ? <Box component={'span'} mr={1} className={'cup'}>{props.title}</Box>
                : null
            }

            <Delete viewBox={'0 0 26 26'} className={'cup'}/>
        </Box>
    );
};

export default React.memo(DeleteBtn);
