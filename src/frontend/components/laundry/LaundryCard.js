import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { Card, Text, Row, Col, Line } from '../shared'
import LaundryCardHeader from './LaundryCardHeader'

const LaundryCard = ({ locationObject, selectedHallId }) => {
  const [expanded, setExpanded] = useState(false)

  const { halls, location } = locationObject

  // Check if the hall has only one location
  if (halls.length === 1) {
    const { id } = halls[0]
    return (
      <Link href={`/laundry?id=${id}`} as={`/laundry/${id}`} key={`laundry-hall-${location}-${id}`}>
        <a>
          <LaundryCardHeader
            title={location}
            selected={Number(id) === selectedHallId}
          />
          <Line />
        </a>
      </Link>
    )
  }

  return (
    <>
      <div // eslint-disable-line
        onClick={() => setExpanded(!expanded)}
      >
        <LaundryCardHeader title={location} hasDropdown expanded={expanded} />
      </div>

      {expanded &&
        halls.map(({ hall_name: hallName, id }) => (
          <Link href={`/laundry?id=${id}`} as={`/laundry/${id}`} key={`laundry${id}`}>
            <Card
              padding="0.5rem 1rem"
              hoverable
              selected={Number(id) === selectedHallId}
            >
              <Row>
                <Col padding="0 0 0 1rem">
                  <Text marginBottom="0">{hallName}</Text>
                </Col>
              </Row>
            </Card>
          </Link>
        ))}

      <Line />
    </>
  )
}

LaundryCard.defaultProps = {
  locationObject: {},
  selectedHallId: null,
}

LaundryCard.propTypes = {
  selectedHallId: PropTypes.number,
  locationObject: PropTypes.shape({
    location: PropTypes.string,
    halls: PropTypes.arrayOf(
      PropTypes.shape({
        hall_name: PropTypes.string,
        id: PropTypes.number,
        location: PropTypes.string,
      })
    ),
  }),
}

export default LaundryCard
