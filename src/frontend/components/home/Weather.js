/* global document */
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { BorderedCard, Title } from '../shared'
import Toggle from '../shared/Toggle'

const TEMP_BASE = 'https://forecast7.com/en/39d95n75d17/philadelphia/'

const Weather = () => {
  const [isFahrenheit, setIsFahrenheit] = useState(true)
  useEffect(() => {
    const tag = document.createElement('script')
    tag.setAttribute('src', 'https://weatherwidget.io/js/widget.min.js')
    document.getElementsByTagName('body')[0].appendChild(tag)
  }, [isFahrenheit])

  const toggleIsFahrenheit = () => setIsFahrenheit(!isFahrenheit)

  return (
    <BorderedCard>
      <Toggle
        filter={isFahrenheit}
        dispatchFilterAction={toggleIsFahrenheit}
        filterOffText="°C"
        filterOnText="°F"
      />
      <Title>Weather in Philly</Title>
      <a
        className="weatherwidget-io"
        href={isFahrenheit ? `${TEMP_BASE}?unit=us` : TEMP_BASE}
        data-label_1="Philadelphia"
        data-label_2={moment().format('dddd[,] MMMM Do')}
        data-days="3"
        data-accent=""
        data-theme="pure"
        data-highcolor=""
        data-lowcolor=""
        style={{ transition: 'height 0.5s ease' }}
      >
        Weather in Philly
      </a>
    </BorderedCard>
  )
}

export default Weather
