import React, { useState, useEffect, useReducer } from "react";
import { RadioGroup, Radio, List, ListItemText, ListItem, ListItemIcon } from "@material-ui/core"
import { getClasses, getStudentsByClassId } from "../providers/classProvider"

const StudyClasses = ({ discipline, id, date, onSelect, selectedClassId }) => {


    return <>
        <ListItem key={discipline} button onClick={() => onSelect(id)} style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
            <ListItemIcon edge="start">
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontSize: 20, fontWeight: 600 }}>{discipline}</span>} secondary={<>
                <span style={{ fontSize: 20 }}>{new Date(date).toLocaleDateString()}</span>

            </>} />
            <Radio checked={selectedClassId == id} value={id} />
        </ListItem>
        <hr />
    </>

}


export default StudyClasses;