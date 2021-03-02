
const style = {

    studentSearch: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        "& div": {
            margin: "50px 10px 30px 10px",
            height: "50px",
            backgroundColor: "gray",
            width: "80%",
            borderRadius: 5,
            display: "flex",
            justifyContent: "space-between",
            "& input[type=text]": {
                fontSize: 20,

                marginLeft: 10,
                width: "80%",
                border: "0px solid",
                backgroundColor: "transparent",
                color: "white",
                "&:focus": {
                    outline: "none",
                    minHeight: "4%",
                }
            },
            "& input[type=text]::-webkit-input-placeholder": {
                color: "white"
            }

        }
    },
    studentsList: {
        marginTop: "5%",
        "& .MuiTypography-root": {
            fontSize: 20,
            fontWeight: 600
        }

    },
    ".MuiListItemText-primary": {
        fontSize: 20
    }
}

export default style;