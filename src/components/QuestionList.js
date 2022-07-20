import React ,{useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
   const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(quiz => setQuestions(quiz))
  },[])

function handleUpdateOnDelete(deletedQuiz) {
  const serverOptions = {method: 'DELETE'}
  fetch(`http://localhost:4000/questions/${deletedQuiz.id}`,serverOptions)
  .then(r => r.json())
  .then(() => setQuestions(questions => questions.filter(quiz => quiz.id!== deletedQuiz.id)))
}

   const qList = questions.map(q => (
    <QuestionItem  
    onDelete={handleUpdateOnDelete} 
    question={q} 
    key={q.key} 
    onAnsChange = {handleAnsChange}/>
  ))

  function handleAnsChange(id, correctIndex) {
    const options = {
      method:'PATCH',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({correctIndex})
    }
    fetch(`http://localhost:4000/questions/${id}`, options)
    .then (r => r.json)
    .then((updatedQuiz) =>{
      const updatedQuestions= questions.map(q =>{
        if (q.id ===updatedQuiz.id) return updatedQuiz
        return q
      })
      setQuestions(updatedQuestions)
    })


  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qList}</ul>
    </section>
  );
}

export default QuestionList;
