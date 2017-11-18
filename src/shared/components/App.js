import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';
import Card from './shared/card/Card';
import Home from './home/App';
import NotFound from './shared/NotFound';
import Dining from './dining/App';
import DiningVenue from './dining/DiningVenue';
import Laundry from './laundry/App';
import StudySpaces from './studyspaces/App';
import StudySpacesVenue from './studyspaces/StudySpacesVenue';
import Reservations from './reservations/App';

const Laundry = () => (
  <h1>Laundry stuff</h1>
);

export default () => (
    <div>
      <Nav />
      <div id="wrapper">
        <Sidebar />
        <div id="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dining" component={Dining} />
<<<<<<< HEAD
            <Route exact path="/laundry" component={Laundry} />
=======
            <Route exact path="/dining/:id" component={DiningVenue} />
            <Route exact path="/laundry" component={Laundry} />
            <Route exact path="/studyspaces" component={StudySpaces} />
            <Route exact path="/studyspaces/:id" component={StudySpacesVenue} />
            <Route exact path="/reservations" component={Reservations} />
>>>>>>> master
            <Route path="*" component={NotFound}/>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
);
