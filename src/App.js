import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import Likes from './Components/Likes';
import Footer from './Components/Footer/Footer';
import Login from './Login';
import Register from './Register';
import Cart from './Components/Cart';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={"/main"} />} />
        <Route path="/main" element={<Main />}/>
        <Route path="/likes" element={<Likes />}/>
        <Route path="/cart" element={<Cart />}/>
      </Routes>
      <Footer />
    </div>
 </BrowserRouter> 
 );
}

export default App;
