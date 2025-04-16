import React, { useState } from 'react'
import Home from '../../components/Home/Home'

const HomePage = () => {
  
  const [title, setTitle] = useState("Untitled Document"); // title document
  const [full, setFull] = useState(false); // thu phóng docs
  const [content, setContent] = useState(''); // thu phóng docs
  
  return (
    <>
      <Home content={content} setContent={setContent} full={full} setFull={setFull} title={title} setTitle={setTitle}/>
    </>
    
  )
}

export default HomePage
