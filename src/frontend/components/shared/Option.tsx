import s from 'styled-components'

import {
  WHITE,
  ALLBIRDS_GRAY,
  DARK_GRAY,
  BLUE,
  DARK_BLUE,
  BORDER,
  MEDIUM_GRAY,
  BABY_BLUE,
  LIGHTER_BLUE,
  BLACK_ALPHA,
} from '../../styles/colors'
import {
  maxWidth,
  PHONE,
  Z_INDEX,
  NAV_HEIGHT,
  MOBILE_FILTER_HEIGHT,
  minWidth,
  FILTER_HEIGHT,
} from '../../styles/sizes'

interface IFilterBtnWrapper {
  active?: boolean
}

/**
 * Button-like component used for filtering
 *
 * Appears more condensed on mobile devices
 *
 * Button is made active when it is clicked by the user
 */
export const FilterBtnWrapper = s.a<IFilterBtnWrapper>`
  margin-right: 1rem;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 4px;

  padding: 0.5rem 0.75rem;
  border-color: ${BORDER};
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  color: ${MEDIUM_GRAY} !important;
  user-select: none;

  :hover {
    background: ${ALLBIRDS_GRAY};
  }
  
  :focus {
    outline: 0 !important;
    box-shadow: 0 0 0 2px ${LIGHTER_BLUE};
  }

  ${maxWidth(PHONE)} {
    padding: 0.25rem 0.5rem;
    margin-right: 0.25rem;
    font-size: 80%;
  }

  ${({ active }) =>
    active &&
    `
    background: ${BLUE} !important;
    color: ${WHITE} !important;

    :hover,
    :focus {
      background: ${DARK_BLUE} !important;
    }
  `}
`

/**
 * Shade shown behind filter options when a filter button is active
 */
export const OptionsModalBacking = s.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${BLACK_ALPHA(0.5)};
  z-index: ${Z_INDEX + 2};
`

interface OptionsModalWrapper {
  left?: number
}

/**
 * Component housing filter options
 *
 * Has a white background and padding
 *
 * On desktop devices this is is positioned justified to corresponding
 * `<FilterBtnWrapper />`
 *
 * On mobile devices this is positioned to take up the full width of the screen
 */
export const OptionsModalWrapper = s.div<OptionsModalWrapper>`
  position: absolute;
  z-index: ${Z_INDEX + 3};
  background: ${WHITE};
  border-radius: 4px;
  margin-top: 0.5rem;
  padding: 1rem calc(1rem + 0.125%);
  border: 1px solid ${BORDER};
  cursor: default;

  ${minWidth(PHONE)} {
    left: ${({ left }): number => (left !== undefined ? left + 1 : 0)}px;
    top: calc(${FILTER_HEIGHT} - 0.5rem);    
  }

  ${maxWidth(PHONE)} {
    position: fixed;
    top: calc(${NAV_HEIGHT} + ${MOBILE_FILTER_HEIGHT});
    width: calc(100% - 2rem);
    left: 1rem;
    margin-bottom: 0.5rem;
  }

  div {
    margin-bottom: 0.2rem;
    outline: 0 !important; // TODO

    color: ${MEDIUM_GRAY};

    :active,
    :focus,
    :hover {
      color: ${DARK_GRAY};
    }

    :last-child {
      margin-bottom: 0;
    }
  }
`

export const Option = s.div`
  border-radius: 4px;
  padding: 0.2rem 0.4rem;
  margin-left: -0.4rem;
  margin-right: -0.4rem;

  :active,
  :hover,
  :focus {
    background: ${BABY_BLUE};
  }
`

interface ICircle {
  active?: boolean
}

export const Circle = s.span<ICircle>`
  height: 1rem;
  width: 1rem;
  transform: translateY(0.1rem);
  border-radius: 50%;
  border: 2px solid ${BORDER};
  display: inline-block;
  margin-right: 0.5rem;

  ${({ active }) =>
    active && `background: ${BLUE}; border: 2px solid ${DARK_BLUE};`}
`

export const OptionText = s.span`
  color: ${DARK_GRAY};
`
