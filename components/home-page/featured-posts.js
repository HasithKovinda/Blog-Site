import PostGrid from '../posts/posts-grid'
import classes from './featured-posts.module.css'

import React from 'react'

function FeaturedPosts({posts}) {
  return (
    <section className={classes.latest}>
        <h2>Featured Posts</h2>
        <PostGrid posts={posts}></PostGrid>
    </section>
  )
}

export default FeaturedPosts