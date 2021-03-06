import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  getLaundryHalls,
  getFavorites,
  checkBrowserCompatability,
} from '../../actions/laundry_actions'
import { Card, Row, Col, Scrollbar, NavHeader, Line } from '../shared'
import Loading from '../shared/Loading'
import { BABY_BLUE } from '../../styles/colors'
import PennLabsCredit from '../shared/PennLabsCredit'
import LaundryCard from './LaundryCard'
import LaundryVenue from './LaundryVenue'
import FavoriteCard from './FavoriteCard'
import { ILaundryReducerState, IFavorite, ILaundryHall } from '../../../types/laundry'

interface IAppProps {
  dispatchGetLaundryHalls: () => void
  dispatchGetFavorites: () => void
  dispatchCheckBrowser: () => void
  laundryHalls: ILaundryHall[]
  id: undefined | string
  favorites: IFavorite[]
}

const App = ({
  dispatchGetLaundryHalls,
  dispatchGetFavorites,
  dispatchCheckBrowser,
  laundryHalls,
  id,
  favorites = [],
}: IAppProps): React.ReactElement => {
  useEffect(() => {
    dispatchGetLaundryHalls()
    dispatchGetFavorites()
    dispatchCheckBrowser()
  }, [dispatchCheckBrowser, dispatchGetFavorites, dispatchGetLaundryHalls])

  const parsedHallId = Number.isNaN(Number(id)) ? -1 : Number(id)
  const isActiveHall =
    parsedHallId !== undefined &&
    !Number.isNaN(parsedHallId) &&
    (parsedHallId > -1)
  
  console.log(isActiveHall)

  return (
    <Row fullHeight>
      <Scrollbar
        padding="0 0 .5rem 0"
        sm={12}
        md={3}
        borderRight
        fullHeight
        hideOnMobile={isActiveHall}
      >
        <Card background={BABY_BLUE} padding="0">
          <NavHeader className="title is-5">Favorites</NavHeader>
          <Line />
        </Card>

        {favorites && favorites.map(favorite => (
          <FavoriteCard favorite={favorite} />
        ))}

        <Card background={BABY_BLUE} padding="0">
          <NavHeader className="title is-5">Laundry Halls</NavHeader>
          <Line />
        </Card>

        {laundryHalls ? (
          laundryHalls.map(locationObject => (
            <LaundryCard
              selectedHallId={parsedHallId}
              locationObject={locationObject}
              key={locationObject.location}
            />
          ))
        ) : (
          <Loading padding="40vh 0" />
        )}

        <PennLabsCredit />
      </Scrollbar>

      <Col
        sm={12}
        md={9}
        overflowY="auto"
        fullHeight
        hideOnMobile={!isActiveHall}
      >
        <LaundryVenue hallURLId={parsedHallId} />
      </Col>
    </Row>
  )
}

const mapStateToProps = ({ laundry }: { laundry: ILaundryReducerState } ) => {
  const { laundryHalls, favorites } = laundry
  return { laundryHalls, favorites }
}

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchGetLaundryHalls: () => dispatch(getLaundryHalls()),
  dispatchGetFavorites: () => dispatch(getFavorites()),
  dispatchCheckBrowser: () => dispatch(checkBrowserCompatability()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
