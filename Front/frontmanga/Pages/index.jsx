import BurgerMenu from '../src/component/navBar/menuBurger.jsx'
import Banner from '../src/component/Banner/banner.jsx'
import LatestPosts from '../src/component/post/post.jsx'
import Footer from '../src/component/footer/footer.jsx'

function Index() {

  return (
    <>
      <BurgerMenu />
      <Banner />
      <LatestPosts/>
      <Footer/>
    </>
  )
}

export default Index
