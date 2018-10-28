import React, { Component } from 'react';
import axios from 'axios';

import SpaceCard from './SpaceCard';
import {
  Map,
  Row,
  Col,
  Line,
  Subtext,
} from '../shared';
import { WHITE } from '../../styles/colors';
import { NAV_HEIGHT } from '../../styles/sizes';
import ErrorMessage from '../shared/ErrorMessage';

// TODO ghost loaders

class App extends Component {
  static openOrNot(space, time, day) {
    const { start, end } = space;
    const startTime = start[day];
    const endTime = end[day] || 24;

    return (time > startTime && time < endTime);
  }

  constructor(props) {
    super(props);

    this.state = {
      spaces: {},
      error: '',
    };
  }

  componentDidMount() {
    const today = new Date();
    const day = today.getDay();
    const time = today.getHours() + (today.getMinutes() / 60);

    axios.get('/api/spaces/all')
      .then((res) => {
        const formattedSpaces = {};
        const { spaces } = res.data;

        spaces.forEach((space) => {
          const spaceObj = Object.assign({}, space);
          spaceObj.open = App.openOrNot(space, time, day);
          formattedSpaces[spaceObj._id] = spaceObj; // eslint-disable-line no-underscore-dangle
        });

        this.setState({
          spaces: formattedSpaces,
        });
      })
      .catch(() => {
        this.setState({
          spaces: [],
          error: 'There was a problem loading the list of study spaces. Try refreshing the page.',
        });
      });
  }

  render() {
    const { spaces, error } = this.state;

    if (!spaces || !Object.keys(spaces).length) return null;

    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Col
          padding="0 1rem 0.5rem 1rem"
          background={WHITE}
          overflowY="scroll"
        >
          <ErrorMessage message={error} />

          {Object.keys(spaces).map((spaceId) => {
            const space = spaces[spaceId];
            return (
              <div key={spaceId}>
                <SpaceCard
                  {...space}
                />
                <Line />
              </div>
            );
          })}

          <Subtext paddingTop="0.5rem" marginBottom="0">
            Made with &hearts; by&nbsp;
            <a href="https://pennlabs.org" target="_BLANK" rel="noopener noreferrer">
              Penn Labs.
            </a>
          </Subtext>
        </Col>
        <Col>
          <Map mapId="map" />
        </Col>
      </Row>
    );
  }
}


export default App;
