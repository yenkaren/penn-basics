import React from 'react'
import PropTypes from 'prop-types'

import { BorderedCard } from '../shared'
import HoursVisualization from './HoursVisualization'
import venueData from '../../../server/database/venue_info.json'
import { AnchorButton } from '../shared/Button'

const PENN_DINING_BASE_URL =
  'https://university-of-pennsylvania.cafebonappetit.com/cafe/'

const DiningOverview = ({ id }) => {
  const { description, pennDiningSlug } = venueData[id]

  return (
    <>
      <BorderedCard>
        {description && <p style={{ marginBottom: '1rem' }}>{description}</p>}
        <HoursVisualization id={id} />
      </BorderedCard>

      {pennDiningSlug && (
        <div style={{ textAlign: 'center' }}>
          <AnchorButton
            href={`${PENN_DINING_BASE_URL}${pennDiningSlug}`}
            target="_BLANK"
            className="button is-info is-medium"
          >
            View Menu Details
          </AnchorButton>
        </div>
      )}
    </>
  )
}

DiningOverview.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DiningOverview
