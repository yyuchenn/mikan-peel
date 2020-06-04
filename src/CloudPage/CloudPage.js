import React from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {CLOUD_URL} from "../constant";

export default function CloudPage() {

    React.useEffect(() => {
        window.location.href = CLOUD_URL;
    }, []);

    return (<Container>
        <Typography variant={"h3"}>正在跳转...</Typography>
        <Typography variant={"h5"}>如无跳转, <a href={CLOUD_URL}>请点击这里。</a></Typography>
    </Container>);
}
