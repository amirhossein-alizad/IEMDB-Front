import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          
          <Route exact path="/login">

          </Route>

          <Route exact path="/signup">

          </Route>

          <Route exact path="/movies">

          </Route>

          <Route exact path="/movies/:id">

          </Route>

          <Route exact path="/actors/:id">

          </Route>

          <Route exact path="/watchlist">
            
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
