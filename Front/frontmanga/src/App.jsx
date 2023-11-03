import './component/navBar/menuBurger.css'
import BurgerMenu from './component/navBar/menuBurger.jsx'
import Banner from './component/Banner/banner.jsx'
import LatestPosts from './component/post/post.jsx'

function App() {

  return (
    <>
      <BurgerMenu />
      <Banner />
      <LatestPosts/>
    </>
  )
}

export default App
