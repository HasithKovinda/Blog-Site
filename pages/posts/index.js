import React from 'react'
import AllPosts from '../../components/posts/all-posts.module'
import { getAllPosts } from '../../utill/post'
import Head from 'next/head'

function PostPage({posts}) {
  return (
   <>
     <Head>
     <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
     </Head>
     <AllPosts posts={posts}/>
   </>
  )
}


export function getStaticProps(){
  const allPosts = getAllPosts()
  return {
    props:{
      posts:allPosts
    }
  }
}

export default PostPage