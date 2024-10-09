import React from 'react'
import HeroSection from './components/HeroSection'
import Services from './components/Services'
import Trusted from './components/Trusted'
import FeatureProducts from './components/FeatureProducts'

function Home() {

  const data = {
    name: 'Shopping Store'
  }

  return (
    <>
    <HeroSection myData= {data}/>
    <FeatureProducts />
    <Services />
    <Trusted />
    </>
  )
}


export default Home
