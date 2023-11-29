import Image from 'next/image'
import React from 'react'
import classes from './hero.module.css'

function Hero() {
  return (
    <section className={classes.hero}>
        <div className={classes.image}>
          <Image src='/images/site/mark.jpg' alt='profile image mark' height={300} width={300} />
        </div>
        <h1>I'm Mark</h1>
        <p>This a blog about frontend frameworks like react and angular </p>
    </section>
  )
}

export default Hero