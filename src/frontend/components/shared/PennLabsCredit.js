import React from 'react'
import PropTypes from 'prop-types'

import { Col } from './Flex'
import { Subtext } from './Typography'
import { logEvent } from '../../analytics/index'

const AIRTABLE_LINK = 'https://airtable.com/shrE9ZdgiSY0DfDxV'

const PennLabsCredit = ({ padding }) => (
  <Col padding={padding || '0 1rem'}>
    <Subtext paddingTop="0.5rem" marginBottom="0">
      Made with &hearts; by&nbsp;
      <a
        href="https://pennlabs.org"
        target="_BLANK"
        rel="noopener noreferrer"
        onClick={() => logEvent('external links', 'penn labs')}
      >
        Penn Labs.
      </a>
      &nbsp;
      <a
        href={AIRTABLE_LINK}
        target="_BLANK"
        rel="noopener noreferrer"
        onClick={() => logEvent('feeback', 'click from footer')}
      >
        Feedback.
      </a>
    </Subtext>
  </Col>
)

PennLabsCredit.defaultProps = {
  padding: null,
}

PennLabsCredit.propTypes = {
  padding: PropTypes.string,
}

export default PennLabsCredit
