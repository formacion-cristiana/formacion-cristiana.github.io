// src/App.jsx
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import QuizLoader from "./components/QuizLoader";
import { qIds, qTitle } from "./data/quizInfo";
import PrintableHome from "./components/PrintableHome";
import PrintableQuizPage from "./components/PrintableQuizPage";
import PrintableAllQuizzesPage from "./components/PrintableAllQuizzesPage";

import {QuizButtons} from "./components/QuizButtons"



function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadTitles = async () => {
      const loaded = await Promise.all(
        qIds.map(async (id) => {
          const res = await fetch(`${import.meta.env.BASE_URL}quizzes/${id}.json`);
          const data = await res.json();
          return {
            id: data.id,
            title: data.title,
            date: data.date,
            comment: data.comment,
          };
        })
      );
      setQuizzes(loaded);
    };

    loadTitles();
  }, []);

  return (
    <>
      <ul style={{ paddingLeft: "0rem" }}>
        {QuizButtons(quizzes,'/quizzes/')}
      </ul>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link to="/printable" style={{ textDecoration: "underline", fontSize: "1.1rem" }}>
          📄 Imprimir
        </Link>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Helmet>
        <title>{qTitle}</title>
        <meta name="description" content="Preguntas para repasar lo estudiado." />
      </Helmet>

      <Router basename="/">
        <div className="App" style={{ marginBottom: "3rem" }}>
          <a href={import.meta.env.BASE_URL}>
            <img
              src={import.meta.env.BASE_URL + "logo-titulo.png"}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
                marginBottom: "1rem",
                borderRadius: "10px",
              }}
            />
          </a>
          <h4>{qTitle}</h4>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes/:quizId" element={<QuizLoader />} />
            <Route path="/printable" element={<PrintableHome />} />
            <Route path="/printable/quizzes/:quizId" element={<PrintableQuizPage />} />
            <Route path="/print-all" element={<PrintableAllQuizzesPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
