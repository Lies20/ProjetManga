import Index from '../Pages/index.jsx';
import { Routes, Route } from 'react-router-dom';
import Inscription from '../Pages/Inscription.jsx';
import Connection from '../Pages/connection.jsx';
import CreatePost from '../Pages/createPost.jsx';
import PostDetail from './component/postDetail/postDetail.jsx';
import AdminPage from './component/adminPage/adminPage.jsx';
import Compte from './component/compte/compte.jsx';
import ForgotPassword from './component/forgotMdp/forgotMdp.jsx';
import CGU from "./component/CGU/cgu.jsx";
import MentionsLegales from "./component/MentionsLegales/mentionlegal.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/inscription' element={<Inscription />} />
        <Route path='/connexion' element={<Connection />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/post-detail/:postId' element={<PostDetail />} />
        <Route path='/mot-de-passe-oublie' element={<ForgotPassword />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/compte' element={<Compte />} />
        <Route path='/cgu' element={<CGU />} />
        <Route path='/mentions-legales' element={<MentionsLegales />} />
      </Routes>
    </>
  );
}

export default App;
