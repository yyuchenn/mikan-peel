import React from "react";
import Chip from "@material-ui/core/Chip";
import {taskIcon} from "./icons";

export default function TaskChip(props) {
    const {label} = props;

    return (
        <div>
            <Chip {...props} variant={label["accept_by"]["uid"] === "" ? "outlined" : "default"} icon={taskIcon(label["type"])}
                  color={label["status"] === 0 || label["status"] === 1 ? "primary" :
                      label["status"] === 2 ? "secondary" : ""} size={"small"}
                  label={label["name"]} clickable aria-label="Task Chip"
                  to={"/manga/" + label["mid"] + "/" + label["cid"] + "/" + label["id"]}/>
        </div>
    );
}
