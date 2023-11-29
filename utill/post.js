import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postDirectory = path.join(process.cwd(), 'posts')

export function getPostData(postIdentifier){
 const postSlug = postIdentifier.replace(/\.md$/, '')
 const filePath = path.join(postDirectory,`${postSlug}.md`)
 const fileContent = fs.readFileSync(filePath,'utf-8')
 const{data,content} = matter(fileContent)
 const postData ={
    slug:postSlug,
    ...data,
    content
 }
 return postData
}

export function getPostFiles(){
   return fs.readdirSync(postDirectory)
}

export function getAllPosts(){
    const postFiles = getPostFiles()
    const allPosts = postFiles.map((postFile)=>{
       return getPostData(postFile)
    })

    const sortedPosts = allPosts.sort((PostA,PostB)=>PostA.date>PostB.date ? -1:1)

    return sortedPosts
}

export function getFeaturedPosts(){
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.filter((post)=>post.isFeatured)
  return featuredPosts
}