import React, { useEffect, useReducer } from "react";
import { Grid, List, RadioGroup, Backdrop, Typography, } from "@material-ui/core";
import { getClasses, getStudentsByClassId } from "../providers/classProvider"
import { getStudentAttendanceStatus } from "../providers/studentProvider";
import { makeStyles } from "@material-ui/styles"
import { updateAttendanceStatus } from "../providers/studentClassProvider";
import style from "./ClassListStyle"
import reducer from "../reducers/studyClassReducer";
import StudyClass from "./StudyClass";
import StudentList from "./StudentList";


const useStyles = makeStyles(() => style)

const StudentSearch = ({ onFilterChange, filter }) => {
    const classes = useStyles();
    return <>
        <div className={classes.studentSearch}>
            <div >
                <input type="text" onChange={onFilterChange} value={filter} placeholder="Filtrar pelo nome do(a) aluno(a)" />
            </div>
        </div>

    </>
}

const ClassList = (props) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, {
        studyClasses: [],
        currentClass: null,
        selectedClassId: 0,
        filteredStudents: [],
        filter: "",
        loading: false

    })


    useEffect(() => {
        dispatch({ type: "START_GET_CLASSES" });
        getClasses()
            .then(res => {
                dispatch({
                    type: "FINISH_GET_CLASSES",
                    payload: {
                        studyClasses: res.data
                    }
                })
            })
            .catch(err => console.error(err))
    }, [])



    const handleClassChange = (id) => {
        dispatch({ type: "START_SELECT_CLASS", payload: { id } });
        getStudentsByClassId(id)
            .then(res => {
                dispatch({ type: "FINISH_SELECT_CLASS", payload: { currentClass: res.data } });
            })
            .catch(err => console.log(err));

    }

    const handleChangeStudentPresence = async (event, studentId, isPresent) => {
        let requestPayload = {
            classId: state.currentClass.classId,
            studentId: studentId,
            isPresent: !isPresent
        }
        setTimeout(() => {
            if (state.isPresent === isPresent) {
                dispatch({ type: "UPDATE_STATUS_START" });
            }
        }, 500)
        await updateAttendanceStatus(requestPayload).then(() => {

            getStudentAttendanceStatus(studentId, state.currentClass.classId).then(res => {
                let studentIndex = state.filteredStudents.findIndex(x => x.id === studentId)
                if (studentIndex !== -1) {
                    let newFilteredStudents = state.filteredStudents;
                    newFilteredStudents[studentIndex]["isPresent"] = res.data.isPresent;
                    newFilteredStudents = Array.from(newFilteredStudents); //Javascript forgot that the new Array is an actual array. This line JS reminds of it.
                    dispatch({ type: "FINISH_UPDATE_STATUS", payload: newFilteredStudents })
                }
            })
        })
            .catch(err => console.error(err))
    }

    const handleFilterChange = (event) => {
        dispatch({
            type: "FILTER_STUDENTS",
            payload: {
                filter: event.target.value
            }
        })
    }

    return <>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid container style={{ width: "80vw" }}>
                <Grid item sm={4} xs={12} >
                    <div style={{ position: "-webkit-sticky", top: 0, backgroundColor: "#ededed" }}>
                        <h3 style={{ padding: 20, fontSize: 25, textAlitn: "center", display: "flex", justifyContent: "center" }}>Aulas</h3>
                        <List style={{ position: "sticky" }}>
                            <RadioGroup>
                                {state.studyClasses ? state.studyClasses.map(currentClass => (
                                    <StudyClass
                                        discipline={currentClass.discipline}
                                        id={currentClass.id}
                                        date={currentClass.date}
                                        onSelect={handleClassChange}
                                        selectedClassId={state.selectedClassId}
                                    />
                                ))
                                    : "loading"
                                }
                            </RadioGroup>
                        </List>
                    </div>

                </Grid>
                <Grid item sm={8} xs className={classes.studentsList} >
                    {state.currentClass &&
                        <>
                            <Typography align="center" style={{ fontSize: 30 }}>{state.currentClass.discipline} - {new Date(state.currentClass.date).toLocaleDateString()}</Typography>
                            <StudentSearch
                                onFilterChange={handleFilterChange}
                                filter={state.filter}
                            />
                        </>}

                    <div style={{ overflow: "scroll", height: "60%" }}>
                        <StudentList
                            filteredStudents={state.filteredStudents}
                            onTogglePresence={handleChangeStudentPresence}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
        <Backdrop style={{ zIndex: 10 }} open={state.loading} />
    </>;
}

export default ClassList;