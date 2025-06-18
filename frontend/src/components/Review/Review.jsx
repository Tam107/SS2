import { Button } from "antd";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { learningAIApi, submitGradeApi } from "../../api/client/api";

const Review = ({data,setData}) => {
  const [overview, setOverview] = React.useState("");
  const [taskResponse, setTaskResponse] = React.useState("");
  const [lexicalResource, setLexicalResource] = React.useState("");
  const [grammaticalRange, setGrammaticalRange] = React.useState("");
  const [coherenceCohesion, setCoherenceCohesion] = React.useState("");
  const [scoreOveral, setScoreOveral] = React.useState(0);
  const [scoreTaskResponse, setScoreTaskResponse] = React.useState("");
  const [scoreLexicalResource, setScoreLexicalResource] = React.useState("");
  const [scoreGrammaticalRange, setScoreGrammaticalRange] = React.useState('');
  const [scoreCoherenceCohesion, setScoreCoherenceCohesion] = React.useState('');
  const stateUser = useSelector((state) => state.UserReducer);

  
  
  const calculateOverallScore = () => {
    const scores = [
      scoreTaskResponse,
      scoreLexicalResource,
      scoreGrammaticalRange,
      scoreCoherenceCohesion,
    ];
  
    // Ép kiểu sang float, lọc điểm hợp lệ và nằm trong khoảng 0.5 - 9
    const validScores = scores
      .map((score) => parseFloat(score)) // Ép về dạng số
      .filter((score) => !isNaN(score) && score >= 0.5 && score <= 9); // Loại bỏ NaN và kiểm tra khoảng
  
    if (validScores.length === 4) {
      const average = validScores.reduce((sum, val) => sum + val, 0) / 4;
      const roundedScore = Math.round(average * 2) / 2; // Làm tròn đến 0.5 gần nhất
      setScoreOveral(roundedScore);
    }
  };

  useEffect(() => {
    calculateOverallScore();
  }, [
    scoreTaskResponse,
    scoreLexicalResource,
    scoreGrammaticalRange,
    scoreCoherenceCohesion,
  ]);
  useEffect(()=>{
    setScoreTaskResponse(data?.teacherGrade?.Task_Response?.score || '');
    setScoreLexicalResource(data?.teacherGrade?.Lexical_Resource?.score || '');
    setScoreGrammaticalRange(data?.teacherGrade?.Grammatical_Range_and_Accuracy?.score || '');
    setScoreCoherenceCohesion(data?.teacherGrade?.Coherence_and_Cohesion?.score || '');
    setOverview(data?.teacherGrade?.Overal?.comment || '');
    setTaskResponse(data?.teacherGrade?.Task_Response?.comment || '');
    setLexicalResource(data?.teacherGrade?.Lexical_Resource?.comment || '');
    setGrammaticalRange(data?.teacherGrade?.Grammatical_Range_and_Accuracy?.comment || '');
    setCoherenceCohesion(data?.teacherGrade?.Coherence_and_Cohesion?.comment || '');
    setScoreOveral(data?.teacherGrade?.Overal?.score || 0);
  },[data])
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      !scoreOveral ||
      !scoreTaskResponse ||
      !scoreLexicalResource ||
      !scoreGrammaticalRange ||
      !scoreCoherenceCohesion
    ) {
      toast.error("Please fill all score fields");
      return;
    }
    const reviewData = {
      idTeacher:stateUser.user._id , 
      Task_Response: {
        score: scoreTaskResponse,
        comment: taskResponse,
      },
      Lexical_Resource: {
        score: scoreLexicalResource,
        comment: lexicalResource,
      },
      Grammatical_Range_and_Accuracy: {
        score: scoreGrammaticalRange,
        comment: grammaticalRange,
      },
      Coherence_and_Cohesion: {
        score: scoreCoherenceCohesion,
        comment: coherenceCohesion,
      },
      Overal: {
        score: scoreOveral,
        comment: overview,
      },
      Essay:data.content
    };
    
    
    const res = await submitGradeApi(data._id, reviewData);
    if(!res.success){
      toast.error("Error in submitting review");
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt mà
      });
      return;
    }
    const resLearning = await learningAIApi(data._id, reviewData);
    if(!res.success){
      toast.error("Error in submitting review");
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt mà
      });
      return;
    }
    
    setData({...data, isAIAcess:true});
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
    toast.success("Review submitted successfully");

    

    // Submit the review data to the server or handle it as needed
  };

  const AILearning = async (e) => {
    e.preventDefault();
    if (
      !scoreOveral ||
      !scoreTaskResponse ||
      !scoreLexicalResource ||
      !scoreGrammaticalRange ||
      !scoreCoherenceCohesion
    ) {
      toast.error("Please fill all score fields");
      return;
    }
    const reviewData = {
      Task_Response: {
        score: scoreTaskResponse,
        comment: taskResponse,
      },
      Lexical_Resource: {
        score: scoreLexicalResource,
        comment: lexicalResource,
      },
      Grammatical_Range_and_Accuracy: {
        score: scoreGrammaticalRange,
        comment: grammaticalRange,
      },
      Coherence_and_Cohesion: {
        score: scoreCoherenceCohesion,
        comment: coherenceCohesion,
      },
      Essay:data.content
    };

  
    
    
  }
  return (
    <>
      <div className=" w-screen py-4  bg-[#F6F5F2]">
        <h2 className="text-2xl font-bold text-center mb-4">Scoring Essay 
          
         
          </h2>
        <div className="max-w-[84%] mx-auto bg-white shadow-md text-card-foreground border border-slate-300 dark:border-slate-700  rounded-xl px-4 py-2">
          <div className="p-6">
            <form className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label
                    for="overview"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Overview Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="overview"
                    className=" mb-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                  ></textarea>
                  <input
                    
                    type="number"
                    value={scoreOveral}
                    disabled
                    className=" rounded-md border cursor-not-allowed border-input bg-gray-400 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  font-sans"
                    id=""
                  />
                </div>
                <div>
                  <label
                    for="tr"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Task Response Review{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="tr"
                    className="flex mb-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    data-listener-added_03f3dd6a="true"
                    value={taskResponse}
                    onChange={(e) => setTaskResponse(e.target.value)}
                  ></textarea>
                  <input
                    type="number"
                    className="flex min-w-[150px]  rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  font-sans"
                    placeholder="Enter TR Score"
                    value={scoreTaskResponse}
                    onChange={(e) => setScoreTaskResponse(e.target.value)}
                    min={0.5}
                    max={9}
                    step={0.5}

                  />
                </div>
                <div>
                  <label
                    for="lr"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Lexical Resource Review{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="lr"
                    className="flex w-full mb-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    data-listener-added_03f3dd6a="true"
                    value={lexicalResource}
                    onChange={(e) => setLexicalResource(e.target.value)}
                  ></textarea>
                  <input
                    type="number"
                    className="flex min-w-[150px]  rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  font-sans"
                    placeholder="Enter LR Score"
                    value={scoreLexicalResource}
                    onChange={(e) => setScoreLexicalResource(e.target.value)}
                    min={0.5}
                    max={9}
                    step={0.5}
                  />
                </div>
                <div>
                  <label
                    for="gra"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Grammatical Range & Accuracy Review{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="gra"
                    className="flex w-full rounded-md mb-1 border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    data-listener-added_03f3dd6a="true"
                    value={grammaticalRange}
                    onChange={(e) => setGrammaticalRange(e.target.value)}
                  ></textarea>
                  <input
                    type="number"
                    className="flex min-w-[150px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  font-sans"
                    placeholder="Enter GRA Score"
                    value={scoreGrammaticalRange}
                    onChange={(e) => setScoreGrammaticalRange(e.target.value)}
                    min={0.5}
                    step={0.5}
                    max={9}
                  />
                </div>
                <div>
                  <label
                    for="cc"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Coherence & Cohesion Review{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="cc"
                    className="flex w-full mb-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    data-listener-added_03f3dd6a="true"
                    value={coherenceCohesion}
                    onChange={(e) => setCoherenceCohesion(e.target.value)}
                  ></textarea>
                  <input
                    type="number"
                    className="flex  min-w-[150px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  font-sans"
                    placeholder="Enter CC Score"
                    value={scoreCoherenceCohesion}
                    onChange={(e) => setScoreCoherenceCohesion(e.target.value)}
                    min={0.5}
                    max={9}
                    step={0.5}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
              
              {
                data?.teacherGrade?.idTeacher === stateUser.user._id &&
                <button
                className="px-6 disabled:bg-gray-400 disabled:cursor-not-allowed  py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
                onClick={handleSubmit}
                disabled={data?.isGraded}
              >
                Submit
              </button>
              }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
