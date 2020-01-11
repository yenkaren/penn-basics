import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'next/link'

import {
  BorderedCard,
  Text,
  Title,
  Subtext,
  Col,
  Row,
  ColSpace,
  Subtitle,
  StyledLink,
} from '../shared'
import MachineAvailability from '../laundry/MachineAvailability'

import { getFavoritesHomePage } from '../../actions/laundry_actions'

class Laundry extends Component {
  componentDidMount() {
    const { dispatchGetFavoritesHomePage } = this.props
    dispatchGetFavoritesHomePage()
  }

  renderFavorites() {
    const { favoritesHome } = this.props

    if (favoritesHome.length === 0) {
      return (
        <Link href="/laundry">
          <h4>Select your favorite Laundry hall</h4>
        </Link>
      )
    }

    return favoritesHome.map(favorite => {
      const { washers, dryers } = favorite.machines

      return (
        <StyledLink href={`/laundry/${favorite.id}`}>
          <BorderedCard
            key={`${favorite.location}-${favorite.hall_name}`}
            padding="1rem 1rem 0 1rem"
          >
            <Subtitle>{`${favorite.location}: ${favorite.hall_name}`}</Subtitle>
            <Row>
              <Col>
                <Text>Washer</Text>
                <MachineAvailability
                  displayDetails={false}
                  machineData={washers}
                />
              </Col>
              <ColSpace />
              <Col>
                <Text>Dryer</Text>
                <MachineAvailability
                  displayDetails={false}
                  machineData={dryers}
                />
              </Col>
            </Row>
          </BorderedCard>
        </StyledLink>
      )
    })
  }

  render() {
    return (
      <BorderedCard>
        <Link href="/laundry">
          <Title>Laundry</Title>
        </Link>
        <Subtext>Status of your favorite halls</Subtext>

        <br />
        {this.renderFavorites()}
      </BorderedCard>
    )
  }
}

Laundry.defaultProps = {
  favoritesHome: [],
}

Laundry.propTypes = {
  favoritesHome: PropTypes.array, // eslint-disable-line
  dispatchGetFavoritesHomePage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ laundry }) => {
  const { favoritesHome } = laundry
  return {
    favoritesHome,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFavoritesHomePage: () => dispatch(getFavoritesHomePage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Laundry)
