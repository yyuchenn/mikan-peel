import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


export default function ImgUrlTextField(props) {
    const {input, initVal} = props;

    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://imgchr.com/sdk/pup.js";
        script.setAttribute("data-url", "https://imgchr.com/upload");
        script.setAttribute("data-auto-insert", "direct-links");
        script.setAttribute("data-mode", "manual");
        script.async = true;
        document.head.appendChild(script);
    }, []);

    return (
        <Box display="flex" alignItems="flex-end">
            <Box flexGrow={1}>
                <TextField
                    margin="dense" id="cover" name="cover" label="封面URL" type="string" fullWidth defaultValue={initVal}
                    onChange={(event) => input.onChange(event.target.value)}
                />
            </Box>
            <Box>
                <Button data-chevereto-pup-trigger data-target="#cover"
                        ariant="contained" color="secondary" component="span">图床上传</Button>
            </Box>
        </Box>
    );
}