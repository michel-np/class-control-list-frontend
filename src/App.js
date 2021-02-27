import { SwipeableDrawer } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Page from "./Components/Page";
import ClassList from "./Components/ClassList"


function App() {
  return <>
    <Router>
      <Switch>
        <Route path="/">
          <Page component={<ClassList />} />
        </Route>
        <Route path="/aula/:id">

        </Route>
      </Switch>
    </Router>

  </>;
}

export default App;
