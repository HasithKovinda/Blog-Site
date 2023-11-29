import React from 'react'
import classes from './post-content.module.css'
import PostHeader from './post-header.module'
import Markdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import darcula  from 'react-syntax-highlighter/dist/cjs/styles/prism/darcula';
import js  from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css  from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import Image from 'next/image'


function PostContent({post}) {
  const {image,title,slug,content} =post
  const imagePath = `/images/posts/${slug}/${image}`

  const customComponent = {
    img(image){
     const {src,alt} =image
     return <Image src={`/images/posts/${slug}/${src}`} alt={alt} height={300} width={600}/>
    },
    code(code) {
      return (
        <SyntaxHighlighter language='javascript' style={darcula}>
          {code.children}
        </SyntaxHighlighter>
      );
},
   } 
   SyntaxHighlighter.registerLanguage('javascript', js);
   SyntaxHighlighter.registerLanguage('css', css);
  return (
    <article className={classes.content}>
        <PostHeader image={imagePath} title={title} />
        <Markdown components={customComponent}>{content}</Markdown>
    </article>
  )
}

export default PostContent