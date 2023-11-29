import React from 'react'
import { getPostData, getPostFiles } from '../../utill/post'
import PostContent from '../../components/posts/post-details/post-content.module'
import Head from 'next/head'

function SinglePost({post}) {
  return (
    <>
    <Head>
    <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
    </Head>
     <PostContent post={post} />
    </>
  )
}

export function getStaticProps(context){
  const{params} = context
  const {slug} = params
  const post = getPostData(slug)
  return {
    props:{
      post
    },
  }
}

export function getStaticPaths(){
  const filenames = getPostFiles()
  const slugs = filenames.map((file)=>file.replace(/\.md$/, ''))
  const path = slugs.map((file)=>({params:{slug:file}}))
  return {
    paths:slugs.map((file)=>({params:{slug:file}})),
    fallback: false, 
  }
}

export default SinglePost