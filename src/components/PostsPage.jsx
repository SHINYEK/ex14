import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Row,Col, Card, Button} from 'react-bootstrap'
import {app} from '../firebase'
import {onSnapshot, getFirestore,query,collection,orderBy} from 'firebase/firestore'
import Loading from './Loading'

const PostsPage = () => {
  const db = getFirestore(app);
  const [total,setTotal] = useState(0);

  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);

  const getPosts = () =>{
    setLoading(true);
    const q = query(collection(db,'posts'),orderBy('date','desc'))

      onSnapshot(q,(result)=>{
        let rows= [];
        result.forEach((row)=>{
        const data = row.data();
        const id = row.id;
        rows.push({ id, ...data });
        })
        console.log(rows,rows.length);
        setPosts(rows);
        setTotal(rows.length);
        setLoading(false)
      })
  }

  useEffect(()=>{
    getPosts();
  },[])

  if(loading) return <Loading></Loading>

  return (
    <Row className='box m-3 justify-content-center'>
      <Col xl={10}>
        <h1>게시글목록</h1>
        <span>▶전체글수:{total}</span>
        {sessionStorage.getItem('email') &&
              <Link to='/posts/write'><span className='write'>글쓰기📝</span></Link>
        }
        {posts.map(post=>(
          <Card className='my-3' key={post.id}>
              <Card.Body>
                  <h4 style={{padding:'10px'}}>📌{post.title}</h4>
                  <p className='ellipsis'>{post.body}</p>
                  <Link to={`/posts/${post.id}`}><Button>Read More</Button></Link>
              </Card.Body>
              <Card.Footer className='text-muted'>
                  Posted on {post.date} by {post.email}
              </Card.Footer>
          </Card>
        ))}
      </Col>
    </Row>
  )
}

export default PostsPage