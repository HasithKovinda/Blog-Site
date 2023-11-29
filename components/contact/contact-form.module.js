import React, { useEffect, useState } from 'react'
import classes from './contact-form.module.css'
import Notification from '../ui/notification'

function ContactForm() {
    const[name,setName] =useState('')
    const[email,setEmail] =useState('')
    const[message,setMessage] =useState('')
    const [requestStatus,setRequestStatus] =useState()
    const[error,setError] = useState()

    useEffect(()=>{
    if(requestStatus==='success' || requestStatus==='error'){
    const timer=setTimeout(()=>{
        setRequestStatus(null)
        setError(null)
      },3000)
      return ()=>clearTimeout(timer)
    }
    },[requestStatus])

async function sendMessage(info){
 
 const response= await  fetch('/api/contact',{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
   body: JSON.stringify(info)
  })
  const data = await response.json()
  if(!response.ok){
    throw new Error(data.message || 'Something went wrong')
  }
 }


  async  function submitHandler(e){
    e.preventDefault()
    if(!email || !name || !message) return
    const data={name,email,message}
    try {
      setRequestStatus('pending')
      await sendMessage(data)
      setRequestStatus('success')
      setEmail('')
      setName('')
      setMessage('')
    } catch (error) {
      setRequestStatus('error')
      setError(error.message)
    }
      
  }

  let notification;

  if(requestStatus==='pending'){
    notification={
      status:'pending',
      title:'Pending',
      message:'Message Sending...'
    }
  }

  if(requestStatus==='success'){
    notification={
      status:'success',
      title:'Success',
      message:'Message send successfully'
    }
  }

  if(requestStatus==='error'){
    notification={
      status:'error',
      title:'Error',
      message:error
    }
  }

  return (
    <section className={classes.contact} onSubmit={submitHandler}>
    <h1>How can I help you?</h1>
    <form className={classes.form} >
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your Name</label>
          <input
            type='text'
            id='name'
            required
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='message'>Your Message</label>
        <textarea
          id='message'
          rows='5'
          required
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        ></textarea>
      </div>

      <div className={classes.actions}>
        <button>Send Message</button>
      </div>
    </form>
    {
      notification && <Notification title={notification.title} message={notification.message} status={notification.status} />
    }
  </section>
  )
}

export default ContactForm