import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import EnvoyIcon from '../../Envoy.png'
import './postIndexShow.scss'

const PostIndex = () => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/posts`)
      .then(res => {
        // console.log(res.data.posts)
        setPosts(res.data.posts)
      })
      // .catch(console.error)
  }, [])

  if (!posts) {
    return <p>Loading....</p>
  }

  if (posts.length === 0) {
    return <p>There are no posts yet!!! Make one!</p>
  }

  // console.log('posts: ', posts)
  return (
    <div>
      {/* <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> */}
      <div className="postIndexContainer">
        {posts.map(post => (
          <Card key={post._id} className="postBox">
            <div className="borderBox"></div>
            <Card.Body className="postContent">
              <div className="textBox">
                <img className="postIcon" src={EnvoyIcon}/>
                <p className="postInfo">{post.owner ? post.owner.email : 'USERNAME'}</p>
                <p className="postInfo">Posted on {post.createdAt ? post.createdAt.split('T')[0] : 'DATE'}</p>
              </div>
              <div>
                {post.imgUrl && <Card.Img className="postImage" variant="bottom" src={post.imgUrl} />}
                {/* <iframe width="420" height="345" src={post.imgUrl}> </iframe> */}

                <div className="postTextTitle">
                  {post.title}
                </div>
                <div className="postTextBody">
                  {post.body}
                </div>
                <div className="commentStatsBody">
                  {post.comments.length} Comments
                </div>
              </div>
              <div className="buttonBox">
                <Button as={Link} to={`/posts/${post._id}`} className="button">View Post</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
        <div id="latestPostsWrapper">
          <div id="latestPostsBanner">
            The Latest Posts
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostIndex
