import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CancelledBtn from '../../templates/buttons/cancelled';
import Slider from '@material-ui/core/Slider';

import stl from '../forms.module.scss';

class Cropper extends React.Component {

    state = {
        value: 1
    };

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    setEditorRef = (editor) => this.editor = editor;

    onCrop = () => {
        if (this.editor) {
            const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL();
            return this.props.setCroppedImg(canvasScaled);
        }
    };

    render() {
        return (
            <>
                <Box margin={'auto'}>
                    <Box textAlign="center">
                        <AvatarEditor
                            ref={this.setEditorRef}
                            image={this.props.selectedFile}
                            width={this.props.width}
                            height={this.props.height}
                            borderRadius={this.props.borderRadius}
                            color={[34, 34, 34, 0.7]} // RGBA
                            scale={this.state.value}
                            rotate={0}
                            border={this.props.border}
                            disableHiDPIScaling

                        />
                    </Box>
                    <Box mt={3} display='flex' alignItems='center'>
                        <Box component={'span'} className={stl.min} mr={3}/>
                        <Box flexGrow={1} display='flex'>
                            <Slider
                                value={this.state.value}
                                onChange={this.handleChange}
                                min={1}
                                max={5}
                            />
                        </Box>
                        <Box component={'span'} className={stl.max} ml={3}/>
                    </Box>
                    <Box width={1} my={5}>
                        <Button
                            variant="contained"
                            color="primary"
                            size={'large'}
                            fullWidth
                            onClick={this.onCrop}
                        >
                            Сохранить
                        </Button>
                    </Box>
                </Box>
                <Box
                    pl={{xs: 1.5, sm: 13}}
                    py={2}
                    display={'flex'}
                    onClick={() => this.props.showCropper(false)}
                >
                    <CancelledBtn />
                </Box>
            </>
        );
    }
}

export default Cropper;
