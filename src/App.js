import React from 'react';
import './App.css';
import HomePage from './pages/homepage.component';
import {Route, Switch, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {auth} from './firebase/firebase.utils';
import {createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';




class App extends React.Component {


  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      const {setCurrentUser} = this.props;
      if(userAuth){
      const userRef=await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapshot=>{

          setCurrentUser({id: userRef.id, ...snapshot.data()})
          
        }
        

      )}else{
        setCurrentUser(userAuth);
      }})


  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route 
          exact 
          path='/signin' 
          render={()=>this.props.currentUser? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );

  }
}

const mapDispatchToProps= dispatch =>({
  setCurrentUser: user=>dispatch(setCurrentUser(user))
})

const mapStateToProps = ({user})=>({
  currentUser: user.currentUser
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
