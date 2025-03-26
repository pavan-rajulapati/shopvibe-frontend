import React from 'react'
import '../styles/homePage.css'
import HeroSection from '../components/HeroSection'
import Electronics from '../components/category/Electronics'
import HouseHold from '../components/category/Household'
import Fashion from '../components/category/Fashion'
import Furniture from '../components/category/Furniture'

const Homepage = () => {
	return (
		<div >
			<div className='home-section'>
				<HeroSection/>
				<Electronics/>
				<HouseHold/>
				<Fashion/>
				<Furniture/>
			</div>
		</div>
	)
}

export default Homepage