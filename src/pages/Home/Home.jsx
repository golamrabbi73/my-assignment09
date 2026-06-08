import AvailableCars from '../../components/home/AvailableCars'
import Banner from '../../components/home/Banner'
import CustomerReviews from '../../components/home/CustomerReviews'
import WhyChooseUs from '../../components/home/WhyChooseUs'

const Home = () => {
  return (
    <div>
      <Banner />
      <AvailableCars />
      <WhyChooseUs />
      <CustomerReviews />
    </div>
  )
}

export default Home
