import React, { useEffect } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import { BorderedCard, Row, Col, Title, Subtext } from '../shared'
import DiningCard from '../dining/DiningCard'
import { getFavorites, getVenueHours } from '../../actions/dining_actions'
import { BORDER } from '../../styles/colors'
import { DINING_ROUTE } from '../../constants/routes'

import { IDiningReducerState, TVenueHours, IFavorite } from '../../../types/dining'

interface IDining {
  dispatchGetFavorites: () => void
  dispatchGetVenueHours: () => void
  favorites: IFavorite[]
  venueHours: TVenueHours
  venueHoursPending: boolean
}

const Dining = ({
  dispatchGetFavorites,
  dispatchGetVenueHours,
  favorites,
  venueHours,
  venueHoursPending
}: IDining) => {
  useEffect(() => {
    dispatchGetFavorites()
    dispatchGetVenueHours()
  }, [])

  if (venueHoursPending || !favorites) return <React.Fragment />

  return (
    <BorderedCard>
      <Link href={DINING_ROUTE}>
        <a>
          <Title>Dining</Title>
        </a>
      </Link>

      <Subtext>Status of your favorite dining halls</Subtext>
      <br />

      <Row margin="0.5rem">
        {favorites.map((id, index) => {
          if (index <= 2) {
            return (
              <Col margin="0.5rem" key={id}>
                <DiningCard
                  venueId={id}
                  showLine={false}
                  style={{
                    border: `1px solid ${BORDER}`,
                    borderRadius: '4px',
                    marginBottom: '0.5rem',
                  }}
                  venueHours={venueHours}
                />
              </Col>
            )
          }

          return null
        })}
      </Row>
    </BorderedCard>
  )
}

const mapStateToProps = ({ dining }: { dining: IDiningReducerState }) => {
  const { favorites, venueHours, venueHoursPending } = dining

  return {
    favorites,
    venueHours,
    venueHoursPending
  }
}

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
  dispatchGetVenueHours: () => dispatch(getVenueHours()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dining)
