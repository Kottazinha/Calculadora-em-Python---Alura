import React, { useState } from 'react';
import { Copy, Check, Play, BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import { RAW_PYTHON_CODE, ANNOTATED_CODE_LINES, CodeLine } from '../data/pythonCalculatorCode';

interface CodeViewerProps {
  onRunInTerminal: () => void;
  onExploreStepByStep: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onRunInTerminal, onExploreStepByStep }) => {
  const [copied, setCopied] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedLine, setSelectedLine] = useState<CodeLine | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(RAW_PYTHON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: 'all', label: 'Código Completo' },
    { id: 'functions', label: '1. Funções (def)' },
    { id: 'menu', label: '2. Menu & Interface' },
    { id: 'loop', label: '3. Repetição (while)' },
    { id: 'input', label: '4. Entrada (input / float)' },
    { id: 'conditions', label: '5. Decisão (if / elif)' },
  ];

  // Simple syntax tokenizer for Python display
  const renderHighlightedLine = (text: string) => {
    if (text.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{text}</span>;
    }

    // Split keeping delimiters for basic syntax highlighting
    const parts = text.split(/([ \t]+|[(),:"]|\bdef\b|\breturn\b|\bif\b|\belif\b|\belse\b|\bwhile\b|\bbreak\b|\bcontinue\b|\btry\b|\bexcept\b|\bfloat\b|\binput\b|\bprint\b|\bstrip\b|\bisinstance\b|\bstr\b|\bTrue\b|\bFalse\b|\bin\b)/g);

    let inString = false;
    let stringDelimiter = '';

    return parts.map((part, idx) => {
      if (!part) return null;

      if ((part === '"' || part === "'") && !inString) {
        inString = true;
        stringDelimiter = part;
        return <span key={idx} className="text-amber-300">{part}</span>;
      }
      if (inString) {
        if (part === stringDelimiter) {
          inString = false;
          return <span key={idx} className="text-amber-300">{part}</span>;
        }
        return <span key={idx} className="text-amber-300">{part}</span>;
      }

      if (['def', 'return', 'if', 'elif', 'else', 'while', 'break', 'continue', 'try', 'except', 'in'].includes(part)) {
        return <span key={idx} className="text-purple-400 font-semibold">{part}</span>;
      }
      if (['True', 'False'].includes(part)) {
        return <span key={idx} className="text-amber-400 font-semibold">{part}</span>;
      }
      if (['print', 'input', 'float', 'isinstance', 'str', 'strip'].includes(part)) {
        return <span key={idx} className="text-cyan-400">{part}</span>;
      }
      if (/^\d+(\.\d+)?$/.test(part)) {
        return <span key={idx} className="text-emerald-400">{part}</span>;
      }
      if (['+', '-', '*', '/', '==', '='].includes(part)) {
        return <span key={idx} className="text-rose-400 font-medium">{part}</span>;
      }

      return <span key={idx} className="text-slate-200">{part}</span>;
    });
  };

  const filteredLines = selectedSection === 'all' 
    ? ANNOTATED_CODE_LINES 
    : ANNOTATED_CODE_LINES.filter(l => l.section === selectedSection || l.section === 'entrypoint');

  return (
    <div className="space-y-6">
      {/* Top action strip and filter controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 mr-1.5 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Filtrar componente:
          </span>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedSection === sec.id
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Código Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </>
            )}
          </button>
          <button
            onClick={onRunInTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Testar no Terminal</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Code on the left/main, Interactive Line Inspector on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code Block Container */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-slate-300">calculadora.py</span>
              <span className="text-slate-500">· Python 3.x</span>
            </div>
            <div className="text-slate-400 text-xs">
              Clique em qualquer linha com dica para ver a explicação
            </div>
          </div>

          {/* Code lines */}
          <div className="p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed max-h-[640px] overflow-y-auto">
            {filteredLines.map((line) => {
              const isSelected = selectedLine?.lineNum === line.lineNum;
              const hasAnnotation = Boolean(line.annotation);

              return (
                <div
                  key={line.lineNum}
                  onClick={() => line.annotation && setSelectedLine(line)}
                  className={`flex items-start group px-2 py-0.5 rounded transition-colors ${
                    hasAnnotation ? 'cursor-pointer' : ''
                  } ${
                    isSelected 
                      ? 'bg-emerald-950/40 border border-emerald-500/30' 
                      : hasAnnotation 
                        ? 'hover:bg-slate-900/80' 
                        : 'hover:bg-slate-900/40'
                  }`}
                >
                  {/* Line Number */}
                  <span className="w-8 shrink-0 text-right pr-3 select-none text-slate-600 font-mono text-xs">
                    {line.lineNum}
                  </span>

                  {/* Marker if annotated */}
                  <span className="w-4 shrink-0 text-center select-none text-xs">
                    {hasAnnotation ? (
                      <span className="text-emerald-400/80 group-hover:text-emerald-300">●</span>
                    ) : (
                      <span className="text-transparent">·</span>
                    )}
                  </span>

                  {/* Code text */}
                  <div className="flex-1 whitespace-pre font-mono">
                    {renderHighlightedLine(line.text)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Explanatory & Guided Deck */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Line Inspector Card */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explicação Interativa</span>
            </div>

            {selectedLine ? (
              <div className="space-y-3">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                  <span className="text-slate-500 mr-2">Linha {selectedLine.lineNum}:</span>
                  {selectedLine.text.trim()}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedLine.annotation}
                </p>
                <div className="text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50">
                  <span className="font-semibold text-slate-300">Dica para iniciante:</span> Em Python, você pode testar esse comando digitando diretamente no terminal interativo ou no interpretador Python.
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400 text-sm space-y-2">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-600" />
                <p>Clique em qualquer linha marcada com <span className="text-emerald-400 font-bold">●</span> no código ao lado para entender o que o Python está fazendo naquele momento!</p>
              </div>
            )}
          </div>

          {/* Quick Summary Cards of the 4 Operations */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-sm font-semibold text-slate-100">
              As 4 Operações Básicas no Código:
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/70 flex items-start gap-3">
                <span className="font-mono font-bold text-emerald-400 text-sm w-4 text-center shrink-0">+</span>
                <div>
                  <span className="font-semibold text-slate-200">Adição:</span> Retorna <code className="text-emerald-300">a + b</code>. Soma números inteiros ou decimais.
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/70 flex items-start gap-3">
                <span className="font-mono font-bold text-cyan-400 text-sm w-4 text-center shrink-0">-</span>
                <div>
                  <span className="font-semibold text-slate-200">Subtração:</span> Retorna <code className="text-cyan-300">a - b</code>. Subtrai o segundo valor do primeiro.
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/70 flex items-start gap-3">
                <span className="font-mono font-bold text-amber-400 text-sm w-4 text-center shrink-0">*</span>
                <div>
                  <span className="font-semibold text-slate-200">Multiplicação:</span> Retorna <code className="text-amber-300">a * b</code>. O símbolo no teclado é o asterisco <code className="text-amber-300">*</code>.
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/70 flex items-start gap-3">
                <span className="font-mono font-bold text-rose-400 text-sm w-4 text-center shrink-0">/</span>
                <div>
                  <span className="font-semibold text-slate-200">Divisão:</span> Retorna <code className="text-rose-300">a / b</code>. Contém validação para evitar <code className="text-rose-300">b == 0</code>.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreStepByStep}
                className="w-full py-2 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 text-center"
              >
                Ver fluxo de execução visual &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
