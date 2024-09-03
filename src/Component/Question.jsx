import React, { useRef, useState } from 'react'
import './Question.css'
import { data } from '../assets/data'
function Question() {
    let [index, setIndex] = useState(0)
    let [question, setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false)
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    // if you click on the wrong answer then it aometically show the correct answer.
    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)

    let opctionArray = [option1, option2, option3, option4]
    const checkAns = (e, correctAnswer) => {
        if (lock === false) {
            if (question.correctAnswer === correctAnswer) {
                e.target.classList.add("correct");
                setLock(true)
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                opctionArray[question.correctAnswer - 1].current.classList.add("correct")

            }
        }
    }
    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true)
                return 0

            }
            setIndex(++index);
            setQuestion(data[index])
            setLock(false)
            opctionArray.map((Option) => {
                Option.current.classList.remove("wrong")
                Option.current.classList.remove("correct")
            })
        }
    }
    const reset=()=>{
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }
    return (
        <>
            <div className='container'>
                <h2>Quiz App</h2>
                <hr />
                {result ? <></> : <>
                    <h4>{index + 1}.{question.question}</h4>
                    <ul>
                        <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                        <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                        <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                        <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>

                    </ul>
                    <button onClick={next}>Next</button>
                    <div className='index'>
                        {index + 1} of the {data.length}</div>
                </>}
                {result?<> <h3>You Scored {score}</h3>
                <button onClick={reset}>Reset</button></>:<></>}
               
            </div>
        </>
    )
}

export default Question
