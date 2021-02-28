import appProvider from "./config/axiosProvider";



export const getStudentAttendanceStatus = async (studentId, classId) => {
    return appProvider.get(`/aluno/get-student-attendance-status?studentId=${studentId}&classId=${classId}`);
}