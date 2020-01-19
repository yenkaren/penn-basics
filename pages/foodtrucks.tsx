import React from 'react'
import { useRouter } from 'next/router'

import App from '../src/frontend/components/foodtrucks/App'
import Header from '../src/frontend/components/header/index'
import Head from 'next/head'
import { GOOGLE_MAPS_API_ROUTE } from '../src/frontend/constants/routes'

const Foodtrucks = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Header>
      <Head>
        <script src={GOOGLE_MAPS_API_ROUTE} />
      </Head>
      <App id={id} />
    </Header>
  )
}

export default Foodtrucks
