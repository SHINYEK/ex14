import React, { useContext, useEffect, useState } from 'react'
import Back from '../images/back.jpg'
import { Link, withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from './UserContext';
import {app} from '../firebase'
import {getFirestore,doc,getDoc} from 'firebase/firestore'
import Loading from './Loading';

const Header = ({history}) => {
  const [loading,setLoading] = useState(false);
  const email = sessionStorage.getItem('email');
  const {user,setUser} = useContext(UserContext);
  const db = getFirestore(app);

  const getUser = async () =>{
    const result = await getDoc(doc(db,'users',email));
    console.log(result.data())
    setUser(result.data());

  }

  const onLogout = () =>{
    if(!window.confirm("로그아웃 하시겠습니까?"))return;
    sessionStorage.removeItem('email');
    setUser(null);
    history.go(-1);
  }

  useEffect(()=>{
    if(email) getUser();
  },[email])
  


  return (
    <div className='header'>
        <img src={Back} style={{width:'100%'}} />
        <Navbar bg="dark" variant="light">
        <Container>
            <Nav className="me-auto">
                <Link to='/'>Home</Link>
                <Link to='/posts'>게시글</Link>
                {email ? <Link to='#' onClick={onLogout}>로그아웃</Link> : <Link to='/login'>로그인</Link>}               
            </Nav>
            {(user && user.name) && <Link style={{paddingRight:'15px'}}>{user.name}</Link> }
            {(user && user.name) && <img src={user.photo} style={{width:'30px', borderRadius:'50%'}}/> }
        </Container>
      </Navbar>
    </div>
  )
}

export default withRouter(Header)