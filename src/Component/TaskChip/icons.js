import Briefcase from "mdi-material-ui/Briefcase";
import ImageMultiple from "mdi-material-ui/ImageMultiple";
import TranslateIcon from "@material-ui/icons/Translate";
import FormTextboxPassword from "mdi-material-ui/FormTextboxPassword";
import Palette from "mdi-material-ui/Palette";
import Gavel from "mdi-material-ui/Gavel";
import Rocket from "mdi-material-ui/Rocket";
import React from "react";

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