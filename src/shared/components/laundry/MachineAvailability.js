import React from 'react'
import s from 'styled-components'

import {
  GREEN,
  MUSTARD,
  MEDIUM_GRAY,
  FOCUS_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
} from '../../styles/colors'
import StatusPill from './StatusPill'
import { Row, LaundryOverview } from '../shared'

const Table = s.table`
  margin-bottom: 0;
`

const BellIcon = s.span`
  cursor: pointer;
  line-height: 1;
  height: 1rem;

  opacity:  0.5;
  &:hover {
    opacity: 0.75;
  }
`

const handleReminder = (
  machineID,
  hallID,
  hallName,
  dispatchAddReminder,
  reminded
) => {
  if (!reminded) {
    dispatchAddReminder(machineID, hallID, hallName)
  }
}

const MachineAvailability = ({
  machineData,
  machineType,
  allMachines,
  laundryHallId,
  hallName,
  reminders,
  dispatchAddReminder,
  enableReminder,
}) => {
  const tableMachines = allMachines.filter(
    machine => machine.type === machineType
  )
  const {
    open = 0,
    running = 0,
    out_of_order: outOfOrder = 0,
    offline = 0,
  } = machineData

  return (
    <>
      <Row justifyContent="space-between">
        {[
          [open, 'Available', GREEN, LIGHT_GREEN],
          [running, 'Busy', MUSTARD, LIGHT_YELLOW],
          [outOfOrder + offline, 'Broken', MEDIUM_GRAY, FOCUS_GRAY],
        ].map(([number, title, color, background]) => (
          <LaundryOverview
            width="30%"
            key={title}
            color={color}
            background={background}
          >
            <h1>{number}</h1>
            <p>{title}</p>
          </LaundryOverview>
        ))}
      </Row>

      <Table className="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Minutes left</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tableMachines.map(
            ({ status, time_remaining: timeRemaining, id }) => {
              const reminded = reminders.some(
                reminder =>
                  reminder.machineID === id && reminder.hallID === laundryHallId
              )
              const showBell =
                !(timeRemaining === 0 || reminded) && enableReminder
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    <StatusPill status={status} />
                  </td>
                  <td>{status === 'Not online' ? '-' : timeRemaining}</td>
                  <td>
                    {showBell ? (
                      <BellIcon
                        className="icon"
                        onClick={() =>
                          handleReminder(
                            id,
                            laundryHallId,
                            hallName,
                            dispatchAddReminder,
                            reminded
                          )
                        }
                      >
                        <i className="far fa-bell" />
                      </BellIcon>
                    ) : null}
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </Table>
    </>
  )
}

export default MachineAvailability
