import React from 'react'

import Banner from '../../components/navbar/Banner'
import CardSection from '../../components/cardsection/CardSection'
import ProductSection from '../../components/productsection/Productsection'
import RoomInspiration from '../../components/roominsperation/RoomInspiration'
import ShareSection from '../../components/sharesection/Sharesection'

const Home_page = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Banner />
      <CardSection />
{/* <ProductSection text={"Our Products"} discount_price={"-30%"} /> */}
<ProductSection text={"Our Product"} />
<RoomInspiration />
<ShareSection />
    
    </div>
  )
}

export default Home_page
