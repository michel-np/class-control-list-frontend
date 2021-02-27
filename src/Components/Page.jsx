import { AppBar, Toolbar } from "@material-ui/core"

const Page = ({ component }) => {

    return <>
        <AppBar style={{ height: "50px" }}>
            <Toolbar>

            </Toolbar>
        </AppBar>
        <div style={{ marginTop: "55px" }}>
            {component}
        </div>


    </>
}

export default Page;