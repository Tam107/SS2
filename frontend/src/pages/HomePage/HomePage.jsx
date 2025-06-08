import React, { useEffect, useState } from 'react'
import Home from '../../components/Home/Home'
import Store from '../../redux/store';
import { loadUserAction } from '../../redux/actions/UserAction';

const HomePage = () => {
  
  const [title, setTitle] = useState("Untitled Document"); // title document
  const [full, setFull] = useState(false); // thu phóng docs
  const [content, setContent] = useState(''); // thu phóng docs
  const [showRequest,setShowRequest] = useState(false);
  const [showList,setShowList] = useState(false);

  

  return (
    <>
      <Home showList={showList} setShowList={setShowList} showRequest={showRequest} setShowRequest={setShowRequest} content={content} setContent={setContent} full={full} setFull={setFull} title={title} setTitle={setTitle}/>
    </>
    
  )
}

export default HomePage
