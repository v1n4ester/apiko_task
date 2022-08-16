import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart/Cart';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Likes from './Components/Favorites Page/Likes';
import Main from './Components/Main/Main';
import { initialiezeApp } from './Redux/auth-reducer';
import store from './Redux/redux-store';
import { connect, Provider } from 'react-redux'
import Account from './Components/Account Page/Account';
import Preloader from './Preloader/Preloader';


class App extends React.Component {
  componentDidMount() {
    this.props.initialiezeApp();
    window.onunhandledrejection = (err) => {
      alert("something gone wrong")
    }
  }
  render() {
    if (this.props.initialized) {
      return <Preloader />
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to={"/main"} />} />
            <Route path="/main" element={<Main />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.auth.initialized
})

let AppContainer = connect(mapStateToProps, { initialiezeApp })(App);

const StoreApp = (props) => {
  return <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>
}

export default StoreApp;
