import React from 'react';
import { Box } from '@material-ui/core';

const ActivationTitle = props => {

    return (
        <Box textAlign={'center'} mb={-7} mt={3} display={{xs: 'none', sm: 'block'}}>
            <Box
                component={'span'}
                width={500}
                fontSize={20}
                display={'inline-block'}
                mt={4}
                lineHeight={1.3}
            >
                {props.title}
            </Box>
        </Box>
    )
}

export default React.memo(ActivationTitle);
