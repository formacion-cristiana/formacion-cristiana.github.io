// prerender/AppServer.js
import React, { useEffect, useState } from "react";
import { StaticRouter } from "react-router-dom/server.cjs"; // server-side router
import { Routes, Route } from "react-router-dom";
import QuizLoader from "../src/components/QuizLoader.js";
import PrintableHome from "../src/components/PrintableHome.js";
import PrintableQuizPage from "../src/components/PrintableQuizPage.js";
import PrintableAllQuizzesPage from "../src/components/PrintableAllQuizzesPage.js";
import { qIds, qTitle } from "../src/data/quizInfo.js";
import { QuizButtons } from "../src/components/QuizButtons.js";

function Home({ preloadedQuizzes = [] }) {
  const [quizzes, setQuizzes] = useState(preloadedQuizzes);

  // Note: no fetch during prerender (server) — only for runtime
  useEffect(() => {
    if (preloadedQuizzes.length === 0) {
      const loadTitles = async () => {
        const loaded = await Promise.all(
          qIds.map(async (id) => {
            const res = await fetch(`/quizzes/${id}.json`);
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
    }
  }, [preloadedQuizzes]);

  return React.createElement(
    "div",
    null,
    React.createElement("ul", { style: { paddingLeft: "0rem" } }, QuizButtons(quizzes, "/quizzes/"))
  );
}

export default function AppServer({ url = "/" }) {
  return React.createElement(
    StaticRouter,
    { location: url },
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
      React.createElement(Route, { path: "/quizzes/:quizId", element: React.createElement(QuizLoader, null) }),
      React.createElement(Route, { path: "/printable", element: React.createElement(PrintableHome, null) }),
      React.createElement(Route, { path: "/printable/quizzes/:quizId", element: React.createElement(PrintableQuizPage, null) }),
      React.createElement(Route, { path: "/print-all", element: React.createElement(PrintableAllQuizzesPage, null) })
    )
  );
}
