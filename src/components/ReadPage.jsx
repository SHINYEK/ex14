import React, { useEffect, useState } from 'react'
import {app} from '../firebase'
import { getFirestore,getDoc,doc, deleteDoc } from 'firebase/firestore';
import Loading from './Loading';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const ReadPage = ({match, history}) => {
    const db = getFirestore(app);
    const id = match.params.id;
    console.log(match);
    const [post,setPost] = useState({});
    const [loading, setLoading] = useState(false);

    const getPost = async() =>{
        setLoading(true);
        const result = await getDoc(doc(db,'posts', id));
        console.log(result.data());
        setPost(result.data());
        setLoading(false);
    }

    const onDelete = async(id) =>{
        if(!window.confirm(`${id}번 게시글을 삭제하실래요?`))return;
        await deleteDoc(doc(db,'posts',id));
        history.push('/posts')
    }

    useEffect(()=>{
        getPost();
    },[id])

    if(loading) return <Loading></Loading>

  return (
    <Row className='justify-content-center my-4'>
        <Col xl={6}>
            <h1>게시글정보</h1>
            {sessionStorage.getItem('email') === post.email && 
            <div>
                <Link to={`/posts/update/${id}`}><Button className='m-2'>수정</Button></Link>
                <Button onClick={()=>onDelete(id)}>삭제</Button>
            </div>
            }
            <Card className='p-3'>
                <Card.Title>
                   {post.title}
                </Card.Title>
                <Card.Body>
                   <p> {post.date} {post.email}</p>
                   <hr/>
                   <p>{post.body}</p>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default ReadPage