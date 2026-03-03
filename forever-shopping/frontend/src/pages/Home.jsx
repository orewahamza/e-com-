import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Forever Shopping</title>
        <meta name="description" content="Discover the latest trends in fashion at Forever Shopping." />
      </Helmet>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
