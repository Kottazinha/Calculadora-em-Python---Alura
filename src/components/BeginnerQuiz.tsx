import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/pythonCalculatorCode';

export const BeginnerQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = QUIZ_QUESTIONS.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Teste de Fixação para Iniciantes</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Quiz: Você dominou os fundamentos da Calculadora em Python?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Responda às perguntas abaixo para validar se você entendeu como o código funciona nos bastidores.
        </p>
      </div>

      {/* Questions list */}
      <div className="space-y-5">
        {QUIZ_QUESTIONS.map((question: QuizQuestion, qIndex: number) => {
          const selected = selectedAnswers[question.id];
          const isCorrect = selected === question.correctIndex;

          return (
            <div
              key={question.id}
              className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <h3 className="text-base font-semibold text-white leading-snug">
                  {question.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2 pl-9">
                {question.options.map((option, optIdx) => {
                  const isSelected = selected === optIdx;
                  let optionStyle = 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700';

                  if (submitted) {
                    if (optIdx === question.correctIndex) {
                      optionStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200';
                    } else {
                      optionStyle = 'border-slate-800/60 bg-slate-950/40 text-slate-500';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-emerald-400 bg-emerald-950/30 text-white font-medium ring-1 ring-emerald-400/40';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(question.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {submitted && optIdx === question.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation after submit */}
              {submitted && (
                <div className={`ml-9 p-3 rounded-lg text-xs leading-relaxed border ${
                  isCorrect 
                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300' 
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}>
                  <strong className="font-semibold">{isCorrect ? 'Correto!' : 'Explicação:'}</strong> {question.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission & Results Bar */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {submitted ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Pontuação: {score} de {QUIZ_QUESTIONS.length} acertos
              </div>
              <div className="text-xs text-slate-400">
                {score === QUIZ_QUESTIONS.length 
                  ? 'Excelente! Você compreendeu todos os conceitos essenciais de Python.' 
                  : 'Bom trabalho! Revise os pontos onde teve dúvida para fixar ainda mais.'}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400">
            {allAnswered 
              ? 'Todas as questões respondidas. Clique para conferir suas respostas!' 
              : 'Selecione uma resposta para cada pergunta acima.'}
          </div>
        )}

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {submitted ? (
            <button
              onClick={handleResetQuiz}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors w-full sm:w-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tentar Novamente</span>
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm w-full sm:w-auto"
            >
              Conferir Respostas
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
