export const ActionTypes = {
    START_SELECT_CLASS: "START_SELECT_CLASS",
    FINISH_SELECT_CLASS:"FINISH_SELECT_CLASS",
    START_GET_CLASSES:"START_GET_CLASSES",
    FINISH_GET_CLASSES: "FINISH_GET_CLASSES",
    FILTER_STUDENTS:"FILTER_STUDENTS",
    START_UPDATE_STATUS:"START_UPDATE_STATUS",
    FINISH_UPDATE_STATUS:"FINISH_UPDATE_STATUS"
}


const reducer = (state, action) => {
    switch(action.type) {
        case ActionTypes.START_SELECT_CLASS:            
            return {...state
                , selectedClassId: action.payload.id,                            
            }
        case ActionTypes.FINISH_SELECT_CLASS:
            return {
                ...state,
                currentClass:action.payload.currentClass,
                filteredStudents:action.payload.currentClass.list,
                filter:""
            }
        case ActionTypes.START_GET_CLASSES:
            return {
                ...state,
                loading:true
            }
        case ActionTypes.FINISH_GET_CLASSES:
            return {
                ...state,
                loading:false,
                studyClasses:action.payload.studyClasses
            }
        case ActionTypes.FILTER_STUDENTS:
            let filter = action.payload.filter;
            let searchTerm = new RegExp(filter, "gi");
            return{
                ...state,
                filter,
                filteredStudents:  state.currentClass.list.filter(student => (
                    student.name.match(searchTerm)
                ))
            }
        case ActionTypes.START_UPDATE_STATUS:
            return {
                ...state,
                loading:true
            }
        case ActionTypes.FINISH_UPDATE_STATUS:
            return {
                ...state,
                filteredStudents:action.payload,
                loading:false
            }
        default:
            return state;
    }
}






export default reducer;


