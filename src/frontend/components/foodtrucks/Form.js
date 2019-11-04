import React from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

import { Text } from '../shared'
import { FOCUS_GRAY, BORDER } from '../../styles/colors'

const TextArea = s.textarea`
  resize: none;
  width: 100%;
  height: 10em;
  border: 1px solid ${FOCUS_GRAY};
  padding: 1em;
  margin-bottom: 1em;

  :focus {
    outline: none;
    border: 1px solid ${BORDER};
  }
`

const Buttons = s.div`
  float: right;
`

const Form = ({ show, hideFunction }) => {
  if (!show) return null

  return (
    <div style={{ marginBottom: '3rem' }}>
      <Text>
        <strong>Write a Review</strong>
      </Text>
      <br />
      <TextArea />
      <Buttons>
        <span // eslint-disable-line
          className="button is-light"
          onClick={() => hideFunction()}
        >
          Cancel
        </span>
        <span // eslint-disable-line
          className="button is-success is-light"
          style={{ marginLeft: '0.5rem' }}
        >
          Submit
        </span>
      </Buttons>
    </div>
  )
}

Form.defaultProps = {
  show: false,
}

Form.propTypes = {
  show: PropTypes.bool,
  hideFunction: PropTypes.func.isRequired,
}

export default Form
