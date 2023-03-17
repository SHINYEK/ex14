import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage'
import { UserContext } from './components/UserContext';
import { useState } from 'react';
import PostsPage from './components/PostsPage';
import WritePage from './components/WritePage';
import ReadPage from './components/ReadPage';
import UpdatePage from './components/UpdatePage';

function App() {
  const [user,setUser] = useState(null);
  return (
    <UserContext.Provider value={{user,setUser}}>
        <div className="App">
        <Header></Header>
        <Switch>
          <Route path='/' component={HomePage} exact={true}></Route>
          <Route path='/login' component={LoginPage}></Route>
          <Route path='/posts' component={PostsPage} exact={true}></Route>
          <Route path='/posts/write' component={WritePage}></Route>
          <Route path='/posts/:id' component={ReadPage} exact={true}></Route>
          <Route path='/posts/update/:id' component={UpdatePage}></Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
