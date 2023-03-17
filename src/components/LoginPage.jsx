import React, { useState } from 'react'
import {Row,Col,Card,Form, Button} from 'react-bootstrap'
import {app} from '../firebase'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import AlertModal from './AlertModal'
import Loading from './Loading'


const LoginPage = ({history}) => {
    const [loading,setLoading] = useState(false);
    const auth = getAuth(app);

    const [form,setForm] = useState({
        email:'user01@email.com',
        password:'12341234'
    })

    const {email,password} = form;

    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit =(e) =>{
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth,email,password)
        .then((success)=>{
            alert("환영합니다.")
            setLoading(false);
            sessionStorage.setItem('email', email);
            history.push('/')
        })
        .catch((error)=>{
            alert("로그인 실패" + error.message)
            setLoading(false);
        })
    }

    if(loading) return <Loading/>
  return (
   <div>
        <Row className='justify-content-center'>
            <Col xl={4} md={5} className='my-5'>
                <Card>
                    <Card.Title className='text-center'>
                        <h1>Login🔒</h1>
                    </Card.Title>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Control placeholder='email' className='mb-2' name='email' value={email} onChange={onChange}/>
                            <Form.Control placeholder='password' type='password' name='password' value={password} onChange={onChange}/>
                            <Button className='m-3' type='submit'>로그인</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <AlertModal/>
   </div>
  )
}

export default LoginPage