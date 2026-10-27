import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Trash2, Send, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'output' | 'input' | 'prompt' | 'system' | 'result';
  text: string;
}

type SimulationState = 'CHOOSE_OPCAO' | 'ENTER_NUM1' | 'ENTER_NUM2' | 'EXITED';

export const TerminalSimulator: React.FC = () => {
  const initialOutput: TerminalLine[] = [
    { id: '1', type: 'system', text: '$ python calculadora.py' },
    { id: '2', type: 'output', text: '===================================' },
    { id: '3', type: 'output', text: '      CALCULADORA EM PYTHON        ' },
    { id: '4', type: 'output', text: '===================================' },
    { id: '5', type: 'output', text: '1 - Adição (+)' },
    { id: '6', type: 'output', text: '2 - Subtração (-)' },
    { id: '7', type: 'output', text: '3 - Multiplicação (*)' },
    { id: '8', type: 'output', text: '4 - Divisão (/)' },
    { id: '9', type: 'output', text: '0 - Sair' },
    { id: '10', type: 'output', text: '===================================' },
  ];

  const [lines, setLines] = useState<TerminalLine[]>(initialOutput);
  const [currentInput, setCurrentInput] = useState('');
  const [simState, setSimState] = useState<SimulationState>('CHOOSE_OPCAO');
  const [selectedOp, setSelectedOp] = useState<string>('');
  const [num1, setNum1] = useState<number | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines, simState]);

  const getPromptLabel = () => {
    switch (simState) {
      case 'CHOOSE_OPCAO':
        return 'Escolha a operação (0-4): ';
      case 'ENTER_NUM1':
        return 'Digite o primeiro número: ';
      case 'ENTER_NUM2':
        return 'Digite o segundo número: ';
      case 'EXITED':
        return 'Programa finalizado. ';
    }
  };

  const handleProcessInput = (rawValue: string) => {
    const value = rawValue.trim();
    const newLines = [...lines, { id: String(Date.now()), type: 'input' as const, text: `${getPromptLabel()}${rawValue}` }];

    if (simState === 'EXITED') {
      newLines.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: 'O programa já terminou. Clique em "Reiniciar Script" para rodar novamente.'
      });
      setLines(newLines);
      setCurrentInput('');
      return;
    }

    if (simState === 'CHOOSE_OPCAO') {
      if (value === '0') {
        newLines.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: '\nObrigado por usar a calculadora! Até logo.'
        });
        setSimState('EXITED');
        setLines(newLines);
        setCurrentInput('');
        return;
      }

      if (['1', '2', '3', '4'].includes(value)) {
        setSelectedOp(value);
        setSimState('ENTER_NUM1');
        setLines(newLines);
        setCurrentInput('');
        return;
      }

      newLines.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: 'Opção inválida! Por favor, escolha entre 0, 1, 2, 3 ou 4.'
      });
      setLines(newLines);
      setCurrentInput('');
      return;
    }

    if (simState === 'ENTER_NUM1') {
      const parsed = parseFloat(value.replace(',', '.'));
      if (isNaN(parsed)) {
        newLines.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'Valor inválido! Digite apenas números válidos.'
        });
        setSimState('CHOOSE_OPCAO');
        setLines(newLines);
        setCurrentInput('');
        return;
      }

      setNum1(parsed);
      setSimState('ENTER_NUM2');
      setLines(newLines);
      setCurrentInput('');
      return;
    }

    if (simState === 'ENTER_NUM2') {
      const parsed2 = parseFloat(value.replace(',', '.'));
      if (isNaN(parsed2)) {
        newLines.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'Valor inválido! Digite apenas números válidos.'
        });
        setSimState('CHOOSE_OPCAO');
        setLines(newLines);
        setCurrentInput('');
        return;
      }

      const first = num1 ?? 0;
      const second = parsed2;

      let resultText = '';
      let operatorChar = '';

      if (selectedOp === '1') {
        operatorChar = '+';
        const res = first + second;
        resultText = `>> ${first} ${operatorChar} ${second} = ${res}`;
      } else if (selectedOp === '2') {
        operatorChar = '-';
        const res = first - second;
        resultText = `>> ${first} ${operatorChar} ${second} = ${res}`;
      } else if (selectedOp === '3') {
        operatorChar = '*';
        const res = first * second;
        resultText = `>> ${first} ${operatorChar} ${second} = ${res}`;
      } else if (selectedOp === '4') {
        operatorChar = '/';
        if (second === 0) {
          resultText = '[Resultado] Erro: Divisão por zero não é permitida!';
        } else {
          const res = first / second;
          resultText = `>> ${first} ${operatorChar} ${second} = ${res}`;
        }
      }

      newLines.push({
        id: String(Date.now() + 1),
        type: 'result',
        text: resultText
      });

      // Loop continues!
      setSimState('CHOOSE_OPCAO');
      setSelectedOp('');
      setNum1(null);
      setLines(newLines);
      setCurrentInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput && simState !== 'EXITED') return;
    handleProcessInput(currentInput);
  };

  const handleRestart = () => {
    setLines(initialOutput);
    setSimState('CHOOSE_OPCAO');
    setSelectedOp('');
    setNum1(null);
    setCurrentInput('');
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setLines([]);
    setSimState('CHOOSE_OPCAO');
    setSelectedOp('');
    setNum1(null);
    setCurrentInput('');
  };

  const runPreset = (op: string, n1: string, n2: string) => {
    handleRestart();
    setTimeout(() => {
      setLines(prev => [
        ...prev,
        { id: String(Date.now()), type: 'input', text: `Escolha a operação (0-4): ${op}` }
      ]);
      setSelectedOp(op);
      setSimState('ENTER_NUM1');

      setTimeout(() => {
        const val1 = parseFloat(n1);
        setLines(prev => [
          ...prev,
          { id: String(Date.now() + 1), type: 'input', text: `Digite o primeiro número: ${n1}` }
        ]);
        setNum1(val1);
        setSimState('ENTER_NUM2');

        setTimeout(() => {
          const val2 = parseFloat(n2);
          let resText = '';
          if (op === '1') resText = `>> ${val1} + ${val2} = ${val1 + val2}`;
          if (op === '2') resText = `>> ${val1} - ${val2} = ${val1 - val2}`;
          if (op === '3') resText = `>> ${val1} * ${val2} = ${val1 * val2}`;
          if (op === '4') {
            resText = val2 === 0 
              ? '[Resultado] Erro: Divisão por zero não é permitida!' 
              : `>> ${val1} / ${val2} = ${val1 / val2}`;
          }

          setLines(prev => [
            ...prev,
            { id: String(Date.now() + 2), type: 'input', text: `Digite o segundo número: ${n2}` },
            { id: String(Date.now() + 3), type: 'result', text: resText }
          ]);
          setSimState('CHOOSE_OPCAO');
          setSelectedOp('');
          setNum1(null);
        }, 350);
      }, 350);
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* Scenario shortcuts */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cenários de Teste Rápidos (1 clique para simular):</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Reiniciar a execução do script"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reiniciar</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-700 rounded-md transition-colors"
              title="Limpar tela"
            >
              <Trash2 className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => runPreset('1', '15.5', '24.5')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Adição: 15.5 + 24.5
          </button>
          <button
            onClick={() => runPreset('2', '100', '42.3')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Subtração: 100 - 42.3
          </button>
          <button
            onClick={() => runPreset('3', '8', '9')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Multiplicação: 8 * 9
          </button>
          <button
            onClick={() => runPreset('4', '50', '0')}
            className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border border-rose-800/50 transition-colors font-medium"
          >
            Divisão por Zero: 50 / 0 (Teste de Erro)
          </button>
          <button
            onClick={() => runPreset('4', '100', '4')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Divisão: 100 / 4
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <div className="flex items-center gap-1.5 ml-2 text-slate-300 font-mono">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>bash - python3 calculadora.py</span>
            </div>
          </div>
          <span className="text-slate-500 text-xs">Simulador em Tempo Real</span>
        </div>

        {/* Terminal Body */}
        <div 
          className="flex-1 p-5 overflow-y-auto font-mono text-sm leading-relaxed space-y-1.5 text-slate-200 bg-slate-950 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line) => {
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-emerald-400 font-semibold pt-1 pb-1">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'result') {
              const isError = line.text.includes('Erro:');
              return (
                <div 
                  key={line.id} 
                  className={`py-1.5 px-3 my-1 rounded font-bold ${
                    isError 
                      ? 'bg-rose-950/60 border border-rose-800/80 text-rose-300' 
                      : 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-300'
                  }`}
                >
                  {line.text}
                </div>
              );
            }
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-cyan-300">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-300 whitespace-pre">
                {line.text}
              </div>
            );
          })}

          {/* Active Input Line */}
          {simState !== 'EXITED' ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-1 text-slate-200 pt-1">
              <span className="text-amber-400 font-medium shrink-0">
                {getPromptLabel()}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-mono text-white text-sm focus:ring-0 p-0"
                autoFocus
                placeholder={simState === 'CHOOSE_OPCAO' ? 'Digite 1, 2, 3, 4 ou 0...' : 'Digite o número...'}
              />
              <button 
                type="submit" 
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white"
                tabIndex={-1}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="pt-2 text-slate-400 text-xs italic">
              [Processo finalizado com código de saída 0. Clique em Reiniciar para rodar novamente.]
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Input Assistant Bar */}
        <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Dica: Digite o valor e pressione <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">Enter</kbd></span>
          </div>
          {simState === 'CHOOSE_OPCAO' && (
            <div className="flex items-center gap-1">
              <button onClick={() => handleProcessInput('1')} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">1 (+)</button>
              <button onClick={() => handleProcessInput('2')} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">2 (-)</button>
              <button onClick={() => handleProcessInput('3')} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">3 (*)</button>
              <button onClick={() => handleProcessInput('4')} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">4 (/)</button>
              <button onClick={() => handleProcessInput('0')} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">0 (Sair)</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
