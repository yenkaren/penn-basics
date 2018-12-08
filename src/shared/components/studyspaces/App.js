import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpaceCard from './SpaceCard';
import {
  Map,
  Row,
  Col,
  Line,
  Subtext,
} from '../shared';
import Filter from './Filter';
import { WHITE } from '../../styles/colors';
import { NAV_HEIGHT, FILTER_HEIGHT } from '../../styles/sizes';
import ErrorMessage from '../shared/ErrorMessage';
import { getAllSpacesData } from '../../actions/spaces_actions';

// TODO ghost loaders

class App extends Component {
  componentDidMount() {
    const { getAllSpacesDataDispatch } = this.props;
    getAllSpacesDataDispatch();
  }

  render() {
    const {
      filteredSpacesData,
      error,
      pending,
      hoveredSpace,
    } = this.props;

    if (pending || !filteredSpacesData || !Object.keys(filteredSpacesData).length) {
      // return null; // TODO
      return (<Filter />);
    }

    return (
      <div>
        <Filter />

        <Row maxHeight={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}>
          <Col
            padding="0 0 .5rem 0"
            background={WHITE}
            overflowY="scroll"
            width="40%"
          >
            <ErrorMessage message={error} />

            {Object.keys(filteredSpacesData).map((spaceId) => {
              const space = filteredSpacesData[spaceId];
              return (
                <div key={spaceId}>
                  <SpaceCard
                    spaceId={spaceId}
                    {...space}
                  />
                  <Line />
                </div>
              );
            })}

            <Col padding="0 1rem">
              <Subtext paddingTop="0.5rem" marginBottom="0">
                Made with &hearts; by&nbsp;
                <a href="https://pennlabs.org" target="_BLANK" rel="noopener noreferrer">
                  Penn Labs.
                </a>
              </Subtext>
            </Col>
          </Col>
          <Col>
            <Map
              mapId="map"
              height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
              markers={filteredSpacesData}
              activeMarker={hoveredSpace}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ spaces }) => spaces;

const mapDispatchToProps = dispatch => ({
  getAllSpacesDataDispatch: venueId => dispatch(getAllSpacesData(venueId)),
});

// Redux config
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
