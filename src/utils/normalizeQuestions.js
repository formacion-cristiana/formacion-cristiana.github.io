export function normalizeQuestions(questions) {
  return questions.map((q,idx) => {
    if (q.type === "true-false") {
      return {
        type: "multiple-choice",
        questionText: q.questionText,
        num:idx,
        answerOptions: [
          { answerText: "Verdadero", isCorrect: q.correctAnswer === true },
          { answerText: "Falso", isCorrect: q.correctAnswer === false },
        ],
        ...(q.image && { image: q.image }), // include image only if it exists
        };
    }
    q.num=idx;
    return q;
  });
}
