import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

import {localtime_exact, setTitle} from "../controller/utils";
import {useDispatch} from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import UserChip from "../Component/UserChip/UserChip";
import axios from "axios";
import {API_BASE} from "../constant";
import {setBusy, setSnackbar} from "../controller/site";
import {setNotifications, tokenHeader} from "../controller/user";
import DeleteButton from "../Component/DeleteButton/DeleteButton";

const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    root: {
        width: '100%'
    },
    rootExpanded: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    details: {
        alignItems: 'center',
    },
    summary: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    userChip: {
        marginRight: theme.spacing(1),
    },
    unreadHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: "bold",
    }
}));

export default function MessagePage(props) {
    const classes = useStyles();
    const [messages, setMessages] = useState();
    const [expanded, setExpanded] = useState("");
    const dispatch = useDispatch();

    const deleteFromList = (mrn) => {
        let result = [];
        for (let message of messages) {
            message["mrn"] !== mrn && result.push(message);
        }
        setMessages(result);
    };

    useEffect(() => {
        setTitle("通知");
        dispatch(setBusy(true));
        axios.get(API_BASE + "/profile/inbox", {
            headers: tokenHeader(),
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    typeof res["messages"] === "object" && setMessages(res["messages"]);
                }
            ).catch(err => {
            dispatch(setSnackbar("拉取列表失败, 请刷新重试", "error"));
        }).finally(() => dispatch(setBusy(false)));
    }, []);


    return (
        <Container>
            <Box display={"flex"} className={classes.titleArea} flexDirection="column">
                <Box flexGrow={1}>
                    <Typography variant="h2">我的通知</Typography>
                </Box>
                <Box display={"flex"} flexWrap={"wrap"}
                     justifyContent={"center"} alignItems={"center"} flexDirection="column">
                    {messages && messages.map((message) => (
                        <MessageItem message={message} expanded={expanded} setExpanded={setExpanded}
                                     deleteFromList={deleteFromList} key={message["mrn"]}/>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}

function MessageItem(props) {
    const classes = useStyles();
    const {message, expanded, setExpanded, deleteFromList} = props;
    const [unread, setUnread] = useState(false);
    const dispatch = useDispatch();

    const [body, setBody] = useState();

    const handleDelete = () => {
        dispatch(setBusy(true));
        axios.delete(API_BASE + "/message/" + message["mrn"], {
            headers: tokenHeader(),
            withCredentials: true,
            validateStatus: status => status === 200
        }).then(res => {
                deleteFromList(message["mrn"]);
            }
        ).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };

    React.useEffect(() => setUnread(message["unread"]), []);

    React.useEffect(() => {
        if (expanded === message["mrn"] && !body) {
            dispatch(setBusy(true));
            axios.get(API_BASE + "/message/" + message["mrn"], {
                headers: tokenHeader(),
                withCredentials: true,
                validateStatus: status => status === 200
            })
                .then(res => res.data)
                .then(res => {
                        typeof res["body"] === "string" && setBody(res["body"]);
                        if (unread) {
                            setUnread(false);
                            dispatch(setNotifications(-1));
                        }
                    }
                ).catch(err => {
                dispatch(setSnackbar("获取消息失败, 请刷新重试", "error"));
            }).finally(() => dispatch(setBusy(false)));
        }
    }, [expanded]);

    const handleExpand = () => {
        if (expanded === message["mrn"]) setExpanded("");
        else setExpanded(message["mrn"]);
    };

    return <div className={expanded === message["mrn"] ? classes.rootExpanded : classes.root}>
        <ExpansionPanel TransitionProps={{unmountOnExit: true}} expanded={expanded === message["mrn"]}
                        onChange={handleExpand}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="message-summary">
                <Box display="flex" alignItems={"center"} flexDirection="row" className={classes.summary}>
                    <UserChip user={message["from_by"]} className={classes.userChip}/>
                    <Box flexGrow={1}>
                        <Typography className={unread ? classes.unreadHeading : classes.heading}
                                    noWrap>{message["title"]}</Typography>
                    </Box>
                    <Typography>{localtime_exact(message["create_on"])}</Typography>
                </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                <Typography variant="body1">{body}</Typography>
            </ExpansionPanelDetails>
            <Divider/>
            <ExpansionPanelActions>
                <Button onClick={handleDelete} color="secondary" variant="outlined" size="small">删除消息</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    </div>
}