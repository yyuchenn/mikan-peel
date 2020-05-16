import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from "@material-ui/core/Stepper";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";

import TaskChip from "../TaskChip";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    nominee: {
        marginBottom: 10
    },
    completed: {
        color: theme.palette.primary
    }
}));

export default function ChapterListItem(props) {
    const classes = useStyles();
    const {vertical, chapter} = props;

    const tasks = chapter["tasks"];
    const mid = chapter["id"];


    const handleStep = (label) => () => {
        window.location.href = "/manga/" + mid + "/" + label["id"];
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel={!vertical} nonLinear activeStep={-1} orientation={vertical ? "vertical" : "horizontal"}>
                {tasks.map((label, index) => (
                    <Step key={label["name"]}>
                        <StepButton onClick={handleStep(label)} completed={label["status"] === 1}>
                            <StepLabel>
                                <TaskChip label={label} clickable/>
                            </StepLabel>
                        </StepButton>
                    </Step>

                ))}
            </Stepper>
        </div>
    );
}
