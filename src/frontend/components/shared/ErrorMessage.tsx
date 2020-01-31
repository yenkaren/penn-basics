import React, { useState } from 'react'
import s from 'styled-components'

import { maxWidth, PHONE } from '../../styles/sizes'

interface IErrorMessageProps {
  message?: string
}

const Wrapper = s.div`
  ${maxWidth(PHONE)} {
    display: none;
  }
`

export const ErrorMessage = ({ message = '' }: IErrorMessageProps) => {
  const [visible, setVisibility] = useState<boolean>(true)
  if (!message || !visible) return null

  return (
    <Wrapper className="notification is-danger">
      <button
        className="delete"
        type="button"
        onClick={() => setVisibility(false)}
      />

      {message || 'Oops, there was an error'}
    </Wrapper>
  )
}