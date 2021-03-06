import axios from 'axios'
import { Query } from 'mongoose'

import spacesJSON from '../../resources/spaces.json'
import Space from '../models/Space'

import { ISpaceORHoursAndOpenAndSpaceId } from '../../../types/studyspaces'

const spaces = spacesJSON as ISpaceORHoursAndOpenAndSpaceId[]

const { MONGO_URI, GOOGLE_MAPS_API_KEY } = process.env
if (!MONGO_URI) {
  console.log('Missing MONGO_URI') // eslint-disable-line
  process.exit(1)
}

// TODO abstract this out to its own routes file
const GOOGLE_URL =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'

const deleteSpacesInDB = (): Query<any> => Space.find().remove()

const updateSpaces = (): Promise<any> =>
  Promise.all(
    spaces.map(async (space, spaceIndex) => {
      const { address } = space
      let { name } = space
      name = name
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
        .toLowerCase()

      const fields = ['formatted_address', 'geometry']
      const url = `${GOOGLE_URL}?key=${GOOGLE_MAPS_API_KEY}&input=${address}&inputtype=textquery&fields=${fields.join(
        ','
      )}`
      spaces[spaceIndex].spaceID = name
      if (address) {
        try {
          const gRes = await axios.get(url)
          const { candidates } = gRes.data
          if (!candidates || candidates.length < 1) {
            // TODO: Address when the request returned erroneous failure or empty candidate result list
            throw new Error(
              'Something went wrong with Google api. Either no results or the request failed.'
            )
          }
          const { location } = candidates[0].geometry
          spaces[spaceIndex] = { ...space, location }
          return spaces[spaceIndex]
        } catch (err) {
          // eslint-disable-next-line
          console.error(
            `Encountered the following error when querying Google api on on study space ${spaceIndex}: \n\t${err}`
          )
          return space // don't change the space if there's an error
        }
      }
      return new Promise(resolve => {
        resolve(space)
      })
    })
  )

const loadSpacesIntoDB = (): Promise<void> =>
  Promise.all(
    spaces.map(
      space => new Space(space).save().then(console.log) // eslint-disable-line
    )
  ).then(() => {
    console.log('----seeding completed----') // eslint-disable-line
    process.exit(0)
  })

updateSpaces()
  .then(deleteSpacesInDB)
  .then(loadSpacesIntoDB)
