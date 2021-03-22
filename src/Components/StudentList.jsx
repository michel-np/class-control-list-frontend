import React from "react";
import {List, ListItem, ListItemIcon, Checkbox, ListItemText} from "@material-ui/core";


const StudentList = ({filteredStudents, onTogglePresence}) => {

    return <>
        {filteredStudents
            ? <List style={{ width: "90%" }}>
                {filteredStudents.map(student => (
                    <ListItem key={student.id} dense button onClick={(e) => onTogglePresence(e, student.id, student.isPresent)} >
                        <ListItemIcon>
                            <Checkbox edge="start"
                                checked={student.isPresent} />
                        </ListItemIcon>
                        <ListItemText id={student.id} primary={student.name} />
                    </ListItem>
                ))}
            </List>
            : "carregando..."}
    </>
}

export default StudentList;