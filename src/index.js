import React from 'react';
import ReactDOM from 'react-dom';
import CelebrityJokes from './components/CelebrityJokes';
import FoodJokes from './components/FoodJokes';
import Callback from './components/Callback';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import indexcss from './index.css';
import { requireAuth } from './utils/AuthService';

const Root = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/" component={FoodJokes}  exact={true} />
          <Route path="/special" component={CelebrityJokes} onEnter={requireAuth}/>
          <Route path="/callback" component={Callback} />
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));