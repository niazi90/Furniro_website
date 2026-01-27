import React from 'react'

import Banner_components from '../../components/banner_components/Banner_components'
import Acheivemnt from '../../components/achivement/Achivement'

import BillingDetailsForm from '../../components/billing_detail/Billing_details'

const Checkout = () => {
  return (
    <>
 <Banner_components heading={'Checkout'} para={'Checkout'}/>
<BillingDetailsForm />


 <Acheivemnt />
    </>
  )
}

export default Checkout
