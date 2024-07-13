import { useEffect, useState } from "react"
import { qBank } from "./qBank"

export const Quiz = () => {
    const [currentQuestion, setcurrentQuestion]=useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer,setTimer]=useState(10);

    function handleClick(option){
        console.log(option)
        if(qBank[currentQuestion].answer === option){
            setScore(score+1)
        }
        if(currentQuestion < qBank.length -1 ){
            setcurrentQuestion(currentQuestion+1)
            setTimer(10)
        }
        else{
            setShowScore(true)
        }
    }

    function hanldeRestart(){
        setcurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimer(10);
    }

    useEffect(()=>{
        let interval;
        if(timer > 0 && !showScore){
            interval= setInterval( () => {
                setTimer((prevTimer)=> prevTimer-1)
        } ,1000)
        }
        else{
            clearInterval(interval);
           
            if(currentQuestion < qBank.length -1){
                setcurrentQuestion(currentQuestion+1);
                setTimer(10)
            }
            else{
                setShowScore(true);
            }
        }
        return ()=>{
            clearInterval(interval);
        }
    },[timer,showScore,currentQuestion,qBank])

  return (
    <div>
        <div className='bg-[#333] h-[100vh] w-[100vw] flex items-center justify-center'>
            <div className='bg-white w-[800px] h-[400px]  rounded-md mx-auto'>
                {showScore ? 
                    <div className="flex flex-col items-center justify-center font-roboto">
                        <div className="text-5xl text-orange-400 font-medium uppercase mt-24">Your Score</div>
                        <div className="text-5xl text-black font-semibold mt-10 ">{score}/{qBank.length}</div>
                        <button className="text-2xl p-5 bg-orange-500 text-white mt-8  
                        tracking-wide rounded-3xl " onClick={hanldeRestart}>Restart</button>
                    </div> :
                    <div className='flex flex-col items-center justify-center mt-12 font-roboto'>
                        <div className="text-4xl text-blue-500 font-semibold tracking-wide">Question {qBank[currentQuestion].id}</div>
                        <div className="mt-8 mb-2 text-black font-medium tracking-normal text-3xl">{qBank[currentQuestion].question}</div>
                        <div className='m-4'>
                            {qBank[currentQuestion].options.map((option,i)=>(
                                <button id={i} key={option} className="border m-4 py-3 px-5 rounded-[28px] text-white bg-blue-500 text-2xl 
                                tracking-wide hover:brightness-75" onClick={()=>handleClick(option)}>{option}</button>
                            ))}
                        </div>
                        <div className="my-10 text-xl font-normal">Time Left:{timer}s</div>
                    </div> 
                
                }
                
                
            </div>
        </div>
    </div>
  )
}
