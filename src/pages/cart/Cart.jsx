import React from 'react'
import Banner_components from '../../components/banner_components/Banner_components'
import Acheivemnt from '../../components/achivement/Achivement'
import Cart_section from './Cart_section'

const Cart = () => {
  return (
    <>
    <div>
      <Banner_components heading={"Cart"} para={"cart"} />
      <Cart_section />
      <Acheivemnt />
      <br></br>
    </div>
    </>
  )
}

export default Cart
