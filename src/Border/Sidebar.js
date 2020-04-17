import React from "react";
import {Link, matchPath} from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import SidebarItem from "./SidebarItem";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

import MenuBookIcon from '@material-ui/icons/MenuBook';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import PeopleIcon from '@material-ui/icons/People';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ExtensionIcon from '@material-ui/icons/Extension';

export const desktopWidth = 100;
const mobileWidth = 150;

const useStyle = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: desktopWidth,
            flexShrink: 0,
        },
    },
    placeholder: theme.mixins.toolbar,
    drawerPaper: {
        [theme.breakpoints.up('md')]: {
            width: desktopWidth,
        },
        width: mobileWidth,
    },
}));

export default function Sidebar(props) {
    const {sidebarToggle, openStatus} = props;
    const classes = useStyle();

    const drawer = (
        <span style={{height: "100%"}}>
            <Box style={{height: "100%"}} display="flex" flexDirection={"column"}
                 justifyContent={"space-between"} alignItems={"stretch"}>
                <Box>
                    <div className={classes.placeholder}/>
                    <Divider/>

                    <List disablePadding={true}>
                        <SidebarItem to={"/"} name={"漫画"} sidebarToggle={sidebarToggle}>
                            <MenuBookIcon/>
                        </SidebarItem>
                        <SidebarItem to={"/tasks"} name={"任务"} sidebarToggle={sidebarToggle}>
                            <DateRangeIcon/>
                        </SidebarItem>
                        <SidebarItem name={"文件"} sidebarToggle={sidebarToggle}>
                            <FolderSharedIcon/>
                        </SidebarItem>
                        <SidebarItem name={"成员"} sidebarToggle={sidebarToggle}>
                            <PeopleIcon/>
                        </SidebarItem>
                        <SidebarItem name={"统计"} sidebarToggle={sidebarToggle}>
                            <EqualizerIcon/>
                        </SidebarItem>
                    </List>
                </Box>
                <Box>
                    <Divider/>
                    <List>
                        <SidebarItem name={"管理"} sidebarToggle={sidebarToggle}>
                            <ExtensionIcon/>
                        </SidebarItem>
                    </List>
                </Box>
            </Box>
        </span>

    );

    return (<nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
            <Drawer

                variant="temporary"
                anchor="left"
                open={openStatus}
                onClose={sidebarToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
        </Hidden>
    </nav>);
}