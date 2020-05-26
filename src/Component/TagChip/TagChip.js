import React from "react";
import Chip from "@material-ui/core/Chip";
import {tagColor, textColor} from "./colors";


export default function TagChip(props) {
    const {className, tag, onDelete, size} = props;

    return (
        <Chip className={className} size={size} style={{
            backgroundColor: tagColor(tag.color),
            color: textColor(tag.color)
        }} label={tag.name} onDelete={onDelete}/>
    );
}