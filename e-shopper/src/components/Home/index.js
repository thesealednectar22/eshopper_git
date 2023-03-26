import React, { useEffect } from 'react';
import Slider from '../ImageSliders/slider'
import Product from '../Layouts/Product'
import { useStateValue } from '../Context/StateProvider';
import './Home.css'
import axiosInstance from '../../interceptor/axiosInterceptor';

const Home = () => {
  const [, dispatch] = useStateValue();
  const email = localStorage.getItem('email')


  useEffect(() => {
    if (email) {
      dispatch({
        type: 'SET_USER',
        user: email
      })
    } else {
      dispatch({
        type: 'SET_USER',
        user: null
      })
    }

    
    axiosInstance.get('/products/categoryList/').then((response)=>{
      console.log(response.data)
    })
  }, [email, dispatch]);

  
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src="https://images-na.ssl-images-Amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg" alt="heroSection" />

        <div className="home_row">
          <Product id={1} title="The lean startup" price={29.99} img="https://m.media-Amazon.com/images/I/41QztBTooxL._AC_SY200_.jpg" rating={5} />
          <Product id={2} title="Amazon Echo (3rd generation)" price={50.25} img="https://images-na.ssl-images-Amazon.com/images/G/01/events/GFAH/GWDesktop_SingleImageCard_fitathome_1x._SY304_CB434924743_.jpg" rating={2} />
        </div>

        <div className="home_row">
          <Product id={3} title="You can't imagine what it feels like" price={45.84} img="https://images-na.ssl-images-Amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg" rating={5} />
          <Product id={4} title="Amazon Echo (3rd generation)" price={82.62} img="https://images-na.ssl-images-Amazon.com/images/G/01/AmazonExports/Events/2020/PrimeDay/Fuji_Dash_PD_Nonprime__1x._SY304_CB403084762_.jpg" rating={2} />
          <Product id={5} title="I love coding like mad oh" price={14.04} img="https://images-na.ssl-images-Amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg" rating={5} />
        </div>

        <div className="home_row">
          <Product id={6} title="Amsung LC9RG40SSUKENX" price={4.95} img="https://m.media-Amazon.com/images/I/41kaOFDXzSL._AC_SY200_.jpg" rating={4} />
        </div>
      </div>
    </div>
  )
}

export default Home
