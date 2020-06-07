import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    listItem: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

export default function TaskBlock(props) {
    const classes = useStyles();
    const {task, adminAuth} = props;
    const privilege = useSelector(state => state.user.privilege);
    const uid = useSelector(state => state.user.uid);


    React.useEffect(() => {
    }, []);

    return (
        <div className={classes.root}>
            <Box display="flex" flexDirection="column">
                <Box display="flex" className={classes.listItem}>
                    <Box flexGrow={1}><Typography variant="h6">承接人</Typography></Box>
                    <Box>我</Box>
                </Box>
                <Divider/>
                <Box display="flex" className={classes.listItem}>
                    <Box flexGrow={1}><Typography>承接时间</Typography></Box>
                    <Box>2019年9月9日</Box>
                </Box>
                <Divider/>
                <Box display="flex" className={classes.listItem}>
                    <Box flexGrow={1}><Typography>完成时间</Typography></Box>
                    <Box>2019年9月9日</Box>
                </Box>
                <Divider/>
                <Box display="flex" className={classes.listItem}>
                    <Box flexGrow={1}><Typography>创建时间</Typography></Box>
                    <Box>2019年9月9日</Box>
                </Box>
            </Box>
        </div>
    );
}
