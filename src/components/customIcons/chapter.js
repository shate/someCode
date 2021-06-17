/*
* Created by shate@ya.ru on 29.07.2020
*/
import  React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

function Chapter(props) {
    return (
        <SvgIcon {...props} viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="15" fill="#4F3F84" fillOpacity="0.3"/>
            <circle cx="15" cy="15" r="12" fill="#4F3F84" fillOpacity="0.6"/>
            <circle cx="15" cy="15" r="6" fill="#5C34FA"/>
        </SvgIcon>
    );
}
export default Chapter;
