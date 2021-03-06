import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

class CelebrityJokes extends Component {

  constructor() {
    super();
    this.state = { jokes: [] };
  }

  componentDidMount() {
  }

  render() {

    const { jokes } = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Privileged Chuck Norris Celebrity Jokes</h3>
        <hr/>

        { jokes.map((joke, index) => (
              <div className="col-sm-6" key={index}>
                <div className="panel panel-danger">
                  <div className="panel-heading">
                    <h3 className="panel-title"><span className="btn">#{ joke.id }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> { joke.joke } </p>
                  </div>
                </div>
              </div>
          ))}

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>View Food Jokes</h2>
            <NavLink className="btn btn-lg btn-success" to='/'>Chuck Norris Food Jokes </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default CelebrityJokes;