import React, { useState, useEffect } from "react";
import { Grid, List, ListItem, RadioGroup, Radio, ListItemIcon, Checkbox, ListItemText, Backdrop, Typography } from "@material-ui/core";
import { getStudentsFromClass, getClasses, getStudentsByClassId } from "../providers/classProvider"
import { getStudentAttendanceStatus } from "../providers/studentProvider";
import { makeStyles } from "@material-ui/styles"
import { updateAttendanceStatus } from "../providers/studentClassProvider";


const useStyles = makeStyles(() => ({

    studentSearch: {
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        "& div": {
            margin: "30px 10px 30px 10px",
            height: "50px",
            backgroundColor: "gray",
            width: "80%",
            borderRadius: 5,
            display: "flex",
            justifyContent: "space-between",
            "& input[type=text]": {
                marginLeft: 10,
                width: "80%",
                border: "0px solid",
                backgroundColor: "transparent",
                color: "white",
                "&:focus": {
                    outline: "none",
                    minHeight: "4%",
                }
            }
        }
    },
    studentsList: {
        padding: 10

    },
    ".MuiListItemText-primary": {
        fontSize: 20
    }
}))


const ClassList = (props) => {
    const [studyClasses, setStudyClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(0);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState("")

    const classes = useStyles()


    useEffect(() => {
        setLoading(true)
        getClasses()
            .then(res => {
                setStudyClasses(res.data)
                setLoading(false)
            })
            .catch(err => console.error(err))
    }, [])


    useEffect(() => {
        if (currentClass && currentClass.list) setFilteredStudents(currentClass.list)
    }, [currentClass])

    useEffect(() => {
        if (currentClass && filter === "") setFilteredStudents(currentClass.list)
    }, [filter])

    const handleClassChange = (id) => {
        setSelectedClassId(id)
        getStudentsByClassId(id)
            .then(res => {
                setCurrentClass(res.data)
            })
            .catch(err => console.log(err));

    }

    const handleChangeStudentPresence = async (event, studentId, isPresent) => {

        let requestPayload = {
            classId: currentClass.classId,
            studentId: studentId,
            isPresent: !isPresent
        }
        console.log("Student Id", studentId)
        await updateAttendanceStatus(requestPayload).then(() => {
            getStudentAttendanceStatus(studentId, currentClass.classId).then(res => {
                let studentIndex = filteredStudents.findIndex(x => x.id === studentId)
                console.log("StudentIndex", studentIndex)
                if (studentIndex !== -1) {
                    let newFilteredStudents = filteredStudents;
                    newFilteredStudents[studentIndex]["isPresent"] = res.data.isPresent;
                    newFilteredStudents = Array.from(newFilteredStudents); //Javascript forgot that the new Array is an actual array. This line remembers it.
                    setFilteredStudents(newFilteredStudents);
                }
            })
        })
            .catch(err => console.log(err))
    }

    const handleStudentFilterChange = (event) => {
        setFilter(event.target.value);

        let searchTerm = new RegExp(filter, "gi");

        let filteredArray = currentClass.list.filter(student => {
            return student.name.match(searchTerm)
        })
        console.log(filteredArray)
        setFilteredStudents(filteredArray);

    }

    return <>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid container style={{ width: "80vw" }}>
                <Grid item sm={4} xs={12} >
                    <div style={{ position: "-webkit-sticky", position: "sticky", top: "10%" }}>
                        <h3 style={{ padding: 20, fontSize: 25, textAlitn: "center", display: "flex", justifyContent: "center" }}>Aulas</h3>
                        <List style={{ position: "sticky" }}>
                            <RadioGroup>
                                {studyClasses ? studyClasses.map(currentClass => (
                                    <>
                                        <ListItem key={currentClass.discipline} button onClick={() => handleClassChange(currentClass.id)} style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
                                            <ListItemIcon edge="start">
                                            </ListItemIcon>
                                            <ListItemText primary={<span style={{ fontSize: 20, fontWeight: 600 }}>{currentClass.discipline}</span>} secondary={<>
                                                <span style={{ fontSize: 20 }}>{new Date(currentClass.date).toLocaleDateString()}</span>

                                            </>} />
                                            <Radio checked={selectedClassId == currentClass.id} value={currentClass.id} />
                                        </ListItem>
                                        <hr />
                                    </>
                                ))
                                    : "loading"
                                }
                            </RadioGroup>
                        </List>
                    </div>

                </Grid>
                <Grid item sm={8} xs className={classes.studentsList}>
                    {currentClass &&
                        <div className={classes.studentSearch}>
                            <div >
                                <input type="text" onChange={handleStudentFilterChange} value={filter} />
                            </div>
                        </div>
                    }

                    <div style={{ overflow: "scroll", height: "60%" }}>
                        {filteredStudents
                            ? <List style={{ width: "90%" }}>
                                {filteredStudents.map(student => (
                                    <ListItem key={student.id} dense button onClick={(e) => handleChangeStudentPresence(e, student.id, student.isPresent)} >
                                        <ListItemIcon>
                                            <Checkbox edge="start"
                                                checked={student.isPresent} />
                                        </ListItemIcon>
                                        <ListItemText id={student.id} primary={student.name} />
                                    </ListItem>
                                ))}
                            </List>
                            : "carregando..."}
                    </div>
                </Grid>
            </Grid>
        </div>
        <Backdrop open={loading} />
    </>;
}

export default ClassList;