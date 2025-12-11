import { useState } from "react";
import pawImg from "./assets/paw.jpeg";

type ScreenId = "intro" | "quiz" | "result";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: Question[] = [
  // SECTION 1: Analytical Reasoning
  {
    id: "q1",
    text: "Which pair of numbers completes the pattern? 3, 9, 27, ?, ?",
    options: ["54, 108", "81, 243", "36, 72", "90, 270"],
    correctIndex: 1,
  },
  {
    id: "q2",
    text: "Which figure does NOT belong to the group?",
    options: ["Square", "Rectangle", "Parallelogram", "Circle"],
    correctIndex: 3,
  },
  {
    id: "q3",
    text:
      "If all Bloops are Razzos and all Razzos are Lazzis, which statement is TRUE?",
    options: [
      "All Lazzis are Bloops",
      "All Bloops are Lazzis",
      "All Razzos are Bloops",
      "No Bloop is a Razzo",
    ],
    correctIndex: 1,
  },
  {
    id: "q4",
    text: "A train travels 60 km in 1 hour and 30 minutes. What is its speed?",
    options: ["30 km/h", "40 km/h", "45 km/h", "60 km/h"],
    correctIndex: 2,
  },
  {
    id: "q5",
    text: "Find the missing number: 14 → 5, 19 → 8, 23 → 10, 29 → ?",
    options: ["12", "11", "13", "14"],
    correctIndex: 0,
  },

  // SECTION 2: Critical Reasoning
  {
    id: "q6",
    text:
      "Some engineers are gamers. All gamers are logical thinkers. What conclusion follows?",
    options: [
      "Some logical thinkers are engineers",
      "All engineers are logical thinkers",
      "All logical thinkers are gamers",
      "No engineer is a logical thinker",
    ],
    correctIndex: 0,
  },
  {
    id: "q7",
    text:
      "If the server is down, the website won’t load. The website loaded. Which is TRUE?",
    options: [
      "Server must be down",
      "Server must be up",
      "Website loaded automatically",
      "Statement is irrelevant",
    ],
    correctIndex: 1,
  },
  {
    id: "q8",
    text:
      "Which assumption is required? \"Online learning improves results because students can review videos multiple times.\"",
    options: [
      "All offline classes have no revision",
      "Reviewing helps learning",
      "Students dislike offline classes",
      "Online classes are free",
    ],
    correctIndex: 1,
  },
  {
    id: "q9",
    text: "If A is older than B and B is older than C, who is the youngest?",
    options: ["A", "B", "C", "Cannot be determined"],
    correctIndex: 2,
  },
  {
    id: "q10",
    text:
      "In a meeting, everyone shook hands with everyone else. Total handshakes = 45. How many people were there?",
    options: ["9", "10", "12", "15"],
    correctIndex: 1,
  },

  // SECTION 3: Technical (CS + Logic)
  {
    id: "q11",
    text: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctIndex: 2,
  },
  {
    id: "q12",
    text: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctIndex: 1,
  },
  {
    id: "q13",
    text: "Which protocol is used to send email?",
    options: ["HTTP", "SMPT", "POP", "SMTP"],
    correctIndex: 3,
  },
  {
    id: "q14",
    text: "Which SQL command is used to remove a table completely?",
    options: ["DELETE", "DROP", "REMOVE", "ERASE"],
    correctIndex: 1,
  },
  {
    id: "q15",
    text: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Program Instruction",
      "Applied Programming Input",
      "Application Process Integration",
    ],
    correctIndex: 0,
  },
];

function App() {
  const [screen, setScreen] = useState<ScreenId>("intro");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>(
    () =>
      QUESTIONS.reduce((acc, q) => {
        acc[q.id] = null;
        return acc;
      }, {} as Record<string, number | null>)
  );
  const [scorePercent, setScorePercent] = useState(0);

  const handleStart = () => {
    if (!name.trim() || !regNo.trim()) return;
    setScreen("quiz");
    setCurrentIndex(0);
  };

  const handleSelectOption = (questionId: string, index: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const goNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    QUESTIONS.forEach((q) => {
      const chosen = answers[q.id];
      if (chosen === q.correctIndex) correct += 1;
    });
    const percent = Math.round((correct / QUESTIONS.length) * 100);
    setScorePercent(percent);
    setScreen("result");
  };

  const restart = () => {
    setScreen("intro");
    setCurrentIndex(0);
    setAnswers(
      QUESTIONS.reduce((acc, q) => {
        acc[q.id] = null;
        return acc;
      }, {} as Record<string, number | null>)
    );
    setScorePercent(0);
  };

  const progressPercent =
    screen === "intro"
      ? 0
      : screen === "result"
      ? 100
      : ((currentIndex + 1) / QUESTIONS.length) * 100;

  const renderQuestion = () => {
    const q = QUESTIONS[currentIndex];
    const selected = answers[q.id];

    return (
      <>
        <p className="text-sm tracking-[0.25em] uppercase text-sky-500 text-center mb-2">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </p>
        <h1 className="text-2xl font-semibold text-[#1c567f] text-center mb-6">
          Test Your Knowledge
        </h1>

        <div className="mx-auto max-w-xl">
          <p className="mb-6 text-lg font-medium text-[#1c567f] text-center">
            {q.text}
          </p>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption(q.id, idx)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                    isSelected
                      ? "border-[#6bb7ff] bg-[#e3f2ff] text-[#1b5788]"
                      : "border-transparent bg-[#e9f6ff] text-[#3b5f7a] hover:bg-[#d9efff]"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={`rounded-full px-4 py-2 text-sm font-semibold border shadow-sm transition ${
                currentIndex === 0
                  ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                  : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
              }`}
            >
              ← Prev
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={selected === null}
              className={`rounded-full px-8 py-2 text-sm font-semibold text-white shadow-sm transition ${
                selected === null
                  ? "bg-slate-300 cursor-not-allowed"
                  : currentIndex === QUESTIONS.length - 1
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-sky-500 hover:bg-sky-600"
              }`}
            >
              {currentIndex === QUESTIONS.length - 1 ? "Submit" : "Next →"}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b8e4ff] via-[#f5fbff] to-[#67c4ff]">
      <div className="w-[900px] max-w-[95vw] rounded-[32px] bg-[#f7fcff] shadow-[0_20px_60px_rgba(15,23,42,0.16)] border border-[#d3ecff] px-16 py-10">
        <div className="relative">
          {/* Decorative Best of Luck block bottom-left */}
          <div className="absolute -left-32 -bottom-10 flex flex-col items-center gap-2">
            {/* Speech bubble above */}
            <div className="relative mb-1">
              <div className="rounded-[999px] bg-white shadow-md border border-[#51b3d9] px-5 py-2 text-xs font-semibold text-[#1aa3c8]">
                Best of Luck !
              </div>
              <div className="absolute left-8 -bottom-2 h-3 w-3 rotate-45 bg-white border-b border-r border-[#51b3d9]" />
            </div>

            {/* Paw image box below */}
            <div className="h-20 w-20 rounded-[26px] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.25)] border border-[#ffb7cf] flex items-center justify-center overflow-hidden paw-blink">
              <img src={pawImg} alt="Paw" className="h-16 w-16 object-contain" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6 max-w-xl mx-auto">
            <div className="h-1 w-full rounded-full bg-[#dbeafe]">
              <div
                className="h-1 rounded-full bg-[#111827] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* INTRO SCREEN */}
          {screen === "intro" && (
            <>
              <header className="text-center mb-8">
                <p className="text-sm tracking-[0.25em] uppercase text-sky-500">
                  Quiz
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-wide text-[#1c567f]">
                  Test Your Knowledge
                </h1>
                <p className="mt-2 text-xs text-slate-500">
                  Answer all questions to see your results.
                </p>
              </header>

              <main className="mx-auto max-w-xl">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">
                      Register Number
                    </label>
                    <input
                      type="text"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                      placeholder="e.g. RA2211XXXXXXX"
                    />
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleStart}
                    disabled={!name.trim() || !regNo.trim()}
                    className={`rounded-full px-8 py-2 text-sm font-semibold text-white shadow-sm transition ${
                      !name.trim() || !regNo.trim()
                        ? "bg-slate-300 cursor-not-allowed"
                        : "bg-sky-500 hover:bg-sky-600"
                    }`}
                  >
                    Start Quiz
                  </button>
                </div>
              </main>
            </>
          )}

          {/* QUIZ SCREEN */}
          {screen === "quiz" && renderQuestion()}

          {/* RESULT SCREEN */}
          {screen === "result" && (
            <>
              <header className="text-center mb-10">
                <p className="text-sm tracking-[0.25em] uppercase text-sky-500">
                  Result
                </p>
                <h1 className="mt-4 text-3xl font-semibold text-[#1c567f]">
                  Your Score is
                </h1>
                <p className="mt-6 text-6xl font-bold text-sky-600">
                  {scorePercent}
                  <span className="text-3xl align-top">%</span>
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  {name || "Student"}, you answered {scorePercent}% of questions
                  correctly.
                </p>
              </header>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={restart}
                  className="rounded-full bg-sky-500 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 transition"
                >
                  Retry Quiz
                </button>
              </div>
            </>
          )}

          <footer className="mt-6 text-center text-xs text-slate-400">
            © 2025 SRM Institute of Science and Technology. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
