import s from 'styled-components'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  BORDER,
  FOCUS_GRAY,
  MEDIUM_GRAY,
  DARK_GRAY,
} from '../../../styles/colors'
import SearchIcon from '../../../../../public/img/search.svg'

const SearchComponent = s.input`
  font-size: 16px;
  font-weight: 400;
  border-width: 0 0 1px;
  background: transparent;
  border-bottom-color: ${FOCUS_GRAY};
  margin-right: 1em;
  color: ${MEDIUM_GRAY};
  border-radius: 0;
  
  :focus {
    outline: none;
    color: ${DARK_GRAY};
    border-bottom-color: ${BORDER};
  }
`

const INPUT_ID = 'search-line'

const Search = ({ filterFunction, filterString }) => {
  const [showInput, setInput] = useState(false)
  return (
    <span>
      <label
        htmlFor={INPUT_ID}
        style={{
          marginRight: showInput ? '0.3em' : '0.5em',
        }}
      >
        <SearchIcon
          className="fas fa-search"
          style={{ transform: 'scale(0.8) translateY(8px)' }}
          onClick={() => setInput(!showInput)}
          cursor="pointer"
        />
        {showInput && (
          <SearchComponent
            id={INPUT_ID}
            onChange={e => filterFunction(e.target.value)}
            value={filterString}
          />
        )}
      </label>
    </span>
  )
}

Search.propTypes = {
  filterFunction: PropTypes.func.isRequired,
  filterString: PropTypes.string.isRequired,
}

export default Search
