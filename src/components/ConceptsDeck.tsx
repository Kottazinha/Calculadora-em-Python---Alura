import React, { useState } from 'react';
import { Copy, Check, Sparkles, Lightbulb, ShieldCheck } from 'lucide-react';
import { PYTHON_CONCEPTS, ConceptItem } from '../data/pythonCalculatorCode';

export const ConceptsDeck: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySnippet = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Pilares da Programação em Python Aplicados à Calculadora
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Construir uma calculadora é um dos melhores projetos para iniciantes porque reúne os principais conceitos que você usará pelo resto da sua jornada de programação: funções, tipos de dados, condicionais, repetições e tratamento de erros.
        </p>
      </div>

      {/* Grid of Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {PYTHON_CONCEPTS.map((concept: ConceptItem) => (
          <div
            key={concept.id}
            className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              {/* Card Title & Subtitle */}
              <div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  {concept.subtitle}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {concept.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {concept.description}
              </p>

              {/* Code Snippet Box */}
              <div className="relative group">
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{concept.codeSnippet}</code>
                </pre>
                <button
                  onClick={() => handleCopySnippet(concept.id, concept.codeSnippet)}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copiar trecho"
                >
                  {copiedId === concept.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Why it matters */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Por que isso é importante:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-5">
                  {concept.whyItMatters}
                </p>
              </div>
            </div>

            {/* Beginner tip footer */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/60 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-amber-300/90 leading-relaxed">
                  <strong className="text-amber-200">Dica:</strong> {concept.beginnerTip}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
