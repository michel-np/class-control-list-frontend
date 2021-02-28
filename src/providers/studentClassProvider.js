import appProvider from "./config/axiosProvider"

const config = {
    "headers": {
        "Content-Type": "application/json",
        "accept": "*/*"
    }
}


export const updateAttendanceStatus = async (obj) => {
    return appProvider.post("aluno-aula/update-student-status", obj, config);
}