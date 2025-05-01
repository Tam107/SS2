import React, { useEffect, useState } from 'react'
import Home from '../../components/Home/Home'
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import Writing from '../../components/Writing/Writing';
import { getDocument } from '../../api/client/api';

const WritingPage = () => {

    const {id}= useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const fetch = async(id)=>{
        const res = await getDocument(id)
        console.log(res);
        
        if(res.success){
            console.log(res.data);
            
            setData(res.data)
        }
        else{
            toast.error("Error")
            navigate("/")
        }
    }
    useEffect(()=>{
        if(!id){
            toast.error("Not found document")
            navigate("/")
        }
        else{
           fetch(id)
        }
      
    },[id])
    
  
 
  const [full, setFull] = useState(false); // thu phóng docs
 
  
  return (
    <>
        {
            data &&
            (
                <Writing full={full} setFull={setFull} data={data}/>
            )
        }
    </>
    
  )
}

export default WritingPage
