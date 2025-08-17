// src/components/QuizLoader.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
import { qTitle } from "../data/quizInfo";
import { Helmet } from "react-helmet";

function QuizLoader() {

  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}quizzes/${quizId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading quiz:", err);
        setLoading(false);
      });
  }, [quizId]);

  if (loading) return <div>Loading...</div>;
  if (!quizData) return <div>Quiz not found</div>;

  return (
    <>
        <Helmet>
        <title>{qTitle}</title>
        <meta name="description" content={`Preguntas del quiz: ${quizData.title}`} />
      </Helmet>

    <div className="App">
      <h2 >{quizData.title}</h2>
      <h3 style={{          marginBottom: "4rem",}}>{quizData.comment}</h3>
      <Quiz quiz={quizData} />
    </div>
    </>
  );
}

export default QuizLoader;