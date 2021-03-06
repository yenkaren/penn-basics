import React, { useEffect } from 'react'
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
} from '../shared'
import MachineAvailability from '../laundry/MachineAvailability'

import { getFavoritesHomePage } from '../../actions/laundry_actions'
import { LAUNDRY_HALLS_ROUTE } from '../../constants/routes'

import { ILaundryReducerState, IFavoriteHome } from '../../../types/laundry'

interface ILaundryProps {
  dispatchGetFavoritesHomePage: () => void
  favoritesHome: IFavoriteHome[]
}

const Laundry = ({ dispatchGetFavoritesHomePage, favoritesHome }: ILaundryProps) => {
  useEffect(() => {
    dispatchGetFavoritesHomePage()
  }, [])

  const renderFavorites = () => {
    if (!favoritesHome || favoritesHome.length === 0) {
      return (
        <Link href={LAUNDRY_HALLS_ROUTE}>
          <a>
            <h4>Select your favorite Laundry hall</h4>
          </a>
        </Link>
      )
    }

    return favoritesHome.map(favorite => {
      const { washers, dryers } = favorite.machines

      return (
        <BorderedCard
          key={`laundryFavorite-${favorite.id}`}
          padding="1rem 1rem 0 1rem"
        >
          <Link href={`/laundry/${favorite.id}`} as={`/laundry/${favorite.id}`}>
            <a>
              <Subtitle>{`${favorite.location}: ${favorite.hall_name}`}</Subtitle>
            </a>
          </Link>
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
      )
    })
  }

  return (
    <BorderedCard>
      <Link href={LAUNDRY_HALLS_ROUTE}>
        <a>
          <Title>Laundry</Title>
        </a>
      </Link>
      <Subtext>Status of your favorite halls</Subtext>

      <br />
      {renderFavorites()}
    </BorderedCard>
  )
}

const mapStateToProps = ({ laundry }: { laundry: ILaundryReducerState }) => {
  const { favoritesHome } = laundry
  return {
    favoritesHome,
  }
}

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchGetFavoritesHomePage: () => dispatch(getFavoritesHomePage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Laundry)
