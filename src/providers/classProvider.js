import appProvider from "./config/axiosProvider"

const config = {
    "headers": {
        "Content-Type": "application/json",
        "accept": "*/*"
    }
}

export const getStudentsByClassId = async (id) => {
    return appProvider.get(`/aula/get-students-from-class/${id}`)
}

export const getClasses = async () => {
    return appProvider.get("/aula/get-classes", config);
}