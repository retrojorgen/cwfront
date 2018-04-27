import React from 'react';
import ReactDOM from 'react-dom';
import EventsList from './components/EventsList';
import EventView from './components/EventView';
import UserView from './components/UserView';
import FrontPage from './components/FrontPage';
import Callback from './components/Callback';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { requireAuth } from './utils/AuthService';

const Root = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/" component={FrontPage} exact={true} />
          <Route path="/events" component={EventsList}  onEnter={requireAuth} exact={true} />
          <Route path="/event/view/:id" component={EventView} onEnter={requireAuth} exact={true} />
          <Route path="/user/:id" component={UserView} onEnter={requireAuth} exact={true} />
          <Route path="/callback" component={Callback} />
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));