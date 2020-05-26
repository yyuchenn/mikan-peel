import TranslateIcon from '@material-ui/icons/Translate';
import React from "react";
import Chip from "@material-ui/core/Chip";
import Briefcase from 'mdi-material-ui/Briefcase';
import Gavel from 'mdi-material-ui/Gavel'
import Rocket from 'mdi-material-ui/Rocket'
import ImageMultiple from 'mdi-material-ui/ImageMultiple'
import FormTextboxPassword from 'mdi-material-ui/FormTextboxPassword'
import Palette from 'mdi-material-ui/Palette'

export default function TaskChip(props) {
    const {label, clickable} = props;

    return (
        <div>
            <Chip variant={label["nominee"] === undefined ? "outlined" : "default"} clickable={clickable} icon={taskIcon(label["type"])}
                  color={label["status"] === 1 || label["status"] === 2 ? "primary" :
                      label["status"] === 3 ? "secondary" : ""} size={"small"}
                  label={label["name"]}/>
        </div>
    );
}

export function taskIcon(n) {
    const icons = {
        0: <Briefcase/>,
        1: <ImageMultiple/>,
        2: <TranslateIcon/>,
        3: <FormTextboxPassword/>,
        4: <Palette/>,
        5: <Gavel/>,
        6: <Rocket/>
    };
    return icons[n];
}