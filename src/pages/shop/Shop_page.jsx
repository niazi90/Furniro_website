
import Acheivemnt from '../../components/achivement/Achivement';
import Banner_components from '../../components/banner_components/Banner_components';
import Filter_components from '../../components/filter/Filter_components';
import ProductSection from '../../components/productsection/Productsection';
import filtersvgs from '/filter.svg';
import menusvgs from '/menu.svg';
import destopsvgs from '/destop.svg';

const Shop_page = () => {
  return (
    <>
    
    <Banner_components heading={"Shop"} para={"shop"} />
   <Filter_components filter_svg={filtersvgs} filter_heading={"Filter"} filter_text={"Filtersvg"}
   menu_svg={menusvgs} menu_text={"Menu svg"} destop_svg={destopsvgs} destop_text={"destopsvg"}
   Showing_text={"showing"} page_first_number={"1-16"} page_last_number={"of 32 results"}
   righttext={"show"} rightnumber={"16"} short_by={"sorted by"} default_text={"Default"}




   
   
   
   
   
   />
    <ProductSection  />
    <Acheivemnt />
    </>
  )
}

export default Shop_page
