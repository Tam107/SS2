import React, { useEffect, useState } from "react";
import Home from "../../components/Home/Home";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import Writing from "../../components/Writing/Writing";
import { getDocument } from "../../api/client/api";
import { useSelector } from "react-redux";

const WritingPage = () => {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.UserReducer
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const fetch = async (id) => {
    const res = await getDocument(id);

    if (res.success) {
        const essaysId = user.EssaysId.filter(i=> i.isAccepted === true);
      if (res.data.ownerId == user._id ||essaysId.find(i=>i.id._id ===id)  ) {
        setData(res.data);
      } else {
        toast.error("No accessible");
        
        navigate("/");
      }
    } else {
      toast.error("Error in Writing page");
      navigate("/");
    }
    return res.ownerId;
  };
  useEffect(() => {
    if (!id) {
      toast.error("Not found document");
      navigate("/");
    } else {
      if (!loading) {
        if (isAuthenticated) {
          fetch(id);
        } else {
          toast.error("No accessible");
          navigate("/");
        }
      }
    }
  }, [id]);

  const [full, setFull] = useState(false); // thu phóng docs

  return <>{data && <Writing full={full} setFull={setFull} data={data} setData={setData}/>}</>;
};

export default WritingPage;
