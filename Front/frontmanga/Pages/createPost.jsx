import BurgerMenu from "../src/component/navBar/menuBurger.jsx"
import CreatePost from "../src/component/createPost/createPost.jsx"
import Footer from "../src/component/footer/footer.jsx";

function creatPost (){
    return (
        <>
        <BurgerMenu/>
        <CreatePost/>
        <Footer/>
        </>
    )
}

export default creatPost;