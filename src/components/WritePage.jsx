import React, { useRef, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import moment from 'moment'
import {app} from '../firebase'
//추가할때는 collection지정, addDoc로 넣어야 함 setX
import {getFirestore,collection,addDoc} from 'firebase/firestore'

const WritePage = ({history}) => {
    const db = getFirestore(app);
    const ref_title = useRef(null);
    const ref_body = useRef(null);

    const [form,setForm] = useState({
        title:'',
        body:''
    })
    const {title,body} = form;

    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(title===""){
            alert("제목을 입력해주세요!");
            ref_title.current.focus();
        }else if(body===""){
            alert("내용을 입력해주세요!")
            ref_body.current.focus();
        }else{
            if(!window.confirm("저장하시겠습니까?"))return;
            const data = {
                title:title,
                body:body,
                email:sessionStorage.getItem('email'),
                date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }            
            addDoc(collection(db,'posts'),data);
            setForm({
                title:'',
                body:''
            })
            history.push('/posts')
        }
    }
  return (
    <Row className='justify-content-center'>
        <Col xl={6} className='my-4'>
            <Card>
                <Card.Title>               
                     <h1>글쓰기📝</h1>
                </Card.Title>
                <Card.Body>
                    <Form className='text-center' onSubmit={onSubmit}>
                        <Form.Control placeholder='제목을 입력하세요' className='my-2' name='title' onChange={onChange} value={title} ref={ref_title}/>
                        <Form.Control placeholder='내용을 입력하세요' style={{height:'200px'}} as='textarea' rows={10} value={body} ref={ref_body} className='my-2' name='body' onChange={onChange}/>
                        <Button type='submit' className='px-5'>글저장</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default WritePage