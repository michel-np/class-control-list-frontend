import React, { useState, useEffect } from "react";
import { Grid, List, ListItem, RadioGroup, Radio } from "@material-ui/core";
import { getStudentsFromClass, getClasses, getStudentsByClassId } from "../providers/classProvider"

const ClassList = (props) => {
    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(0);

    useEffect(() => {
        setLoading(true)
        getClasses()
            .then(res => {
                setClasses(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    const handleClassChange = (e) => {
        setSelectedClassId(e.target.value)
        getStudentsByClassId(e.target.value)
            .then(res => {
                setCurrentClass(res.data)
            })
            .catch(err => console.log(err));

    }

    const handleChangeStudentPresence = async () => {

    }

    return <>
        <Grid container style={{}}>
            <Grid item xs={4}>
                <span>Aulas</span>
                <List>
                    <RadioGroup>

                        {classes ? classes.map(currentClass => (
                            <ListItem>
                                {new Date(currentClass.date).toLocaleDateString()}, {currentClass.discipline} {currentClass.id}
                                <Radio checked={selectedClassId == currentClass.id} value={currentClass.id} onChange={handleClassChange} />
                            </ListItem>
                        ))
                            : loading
                        }
                    </RadioGroup>
                </List>

            </Grid>
            <Grid item xs={8}>
                <input type="text" />
                {currentClass && currentClass.list && currentClass.discipline}
                {currentClass && currentClass.list
                    ? <List>
                        {currentClass.list.map(student => (
                            <ListItem>
                                {student.name}...
                                <input checked={student.isPresent} value={student.id} onChange={handleChangeStudentPresence} type="checkbox"></input>
                            </ListItem>
                        ))}
                    </List>
                    : "carregando..."}
            </Grid>
        </Grid>

    </>;
}

export default ClassList;