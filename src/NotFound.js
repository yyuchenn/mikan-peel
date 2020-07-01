import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import {setTitle} from "./controller/utils";
import GoogleDownasaur from "mdi-material-ui/GoogleDownasaur"

export default function NotFound() {
    let history = useHistory();

    useEffect(() => setTitle("404"), []);

    useEffect(() => {
        setTimeout(redirect, 3000);
    });

    const redirect = () => history.push("");

    return (
        <Container component="main">

            <Typography variant="h1"><GoogleDownasaur style={{fontSize: 90}}/>404什么也没有找到</Typography>
        </Container>
    );
}