import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, ArrowDown, Database, Cpu } from 'lucide-react';

interface Step {
  stepNum: number;
  title: string;
  codeLine: string;
  lineNum: number;
  scope: string;
  description: string;
  variables: Record<string, { val: string; type: string }>;
  callStack: string[];
}

export const StepByStepVisualizer: React.FC = () => {
  const [selectedOp, setSelectedOp] = useState<'1' | '2' | '3' | '4'>('1');
  const [inputVal1, setInputVal1] = useState<number>(20);
  const [inputVal2, setInputVal2] = useState<number>(4);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const getFunctionName = () => {
    switch (selectedOp) {
      case '1': return 'adicionar';
      case '2': return 'subtrair';
      case '3': return 'multiplicar';
      case '4': return 'dividir';
    }
  };

  const getOpSymbol = () => {
    switch (selectedOp) {
      case '1': return '+';
      case '2': return '-';
      case '3': return '*';
      case '4': return '/';
    }
  };

  // Generate steps dynamically based on inputs
  const computeSteps = (): Step[] => {
    const fnName = getFunctionName();
    const opSym = getOpSymbol();
    const isDivByZero = selectedOp === '4' && inputVal2 === 0;

    let mathResult: number | string = 0;
    if (selectedOp === '1') mathResult = inputVal1 + inputVal2;
    if (selectedOp === '2') mathResult = inputVal1 - inputVal2;
    if (selectedOp === '3') mathResult = inputVal1 * inputVal2;
    if (selectedOp === '4') {
      mathResult = isDivByZero ? "Erro: Divisão por zero não é permitida!" : inputVal1 / inputVal2;
    }

    const steps: Step[] = [
      {
        stepNum: 1,
        title: "1. Entrada no laço 'while True'",
        codeLine: "while True:",
        lineNum: 38,
        scope: "calculadora()",
        description: "O laço infinito inicia. Ele garante que a calculadora continue rodando para novas operações.",
        variables: {
          "status_loop": { val: "Ativo (True)", type: "bool" }
        },
        callStack: ["<module>", "calculadora()"]
      },
      {
        stepNum: 2,
        title: "2. Leitura da Opção do Usuário",
        codeLine: 'opcao = input("\\nEscolha a operação (0-4): ").strip()',
        lineNum: 39,
        scope: "calculadora()",
        description: `O usuário escolhe a operação. O valor recebido via input() é sempre do tipo texto (str).`,
        variables: {
          "opcao": { val: `"${selectedOp}"`, type: "str" }
        },
        callStack: ["<module>", "calculadora()"]
      },
      {
        stepNum: 3,
        title: "3. Captura e conversão dos números com float()",
        codeLine: 'num1 = float(input(...))  # e num2',
        lineNum: 47,
        scope: "calculadora()",
        description: `A função float() converte o texto digitado em números com ponto flutuante na memória.`,
        variables: {
          "opcao": { val: `"${selectedOp}"`, type: "str" },
          "num1": { val: `${inputVal1}.0`, type: "float" },
          "num2": { val: `${inputVal2}.0`, type: "float" }
        },
        callStack: ["<module>", "calculadora()"]
      },
      {
        stepNum: 4,
        title: `4. Desvio condicional e chamada da função '${fnName}()'`,
        codeLine: `resultado = ${fnName}(num1, num2)`,
        lineNum: selectedOp === '1' ? 54 : selectedOp === '2' ? 57 : selectedOp === '3' ? 60 : 63,
        scope: "calculadora()",
        description: `O if/elif correspondente é acionado. Os valores num1 e num2 são passados como argumentos para ${fnName}.`,
        variables: {
          "opcao": { val: `"${selectedOp}"`, type: "str" },
          "num1": { val: `${inputVal1}.0`, type: "float" },
          "num2": { val: `${inputVal2}.0`, type: "float" },
          "operador": { val: `"${opSym}"`, type: "str" }
        },
        callStack: ["<module>", "calculadora()", `${fnName}(a=${inputVal1}, b=${inputVal2})`]
      },
      {
        stepNum: 5,
        title: `5. Execução interna de '${fnName}()'`,
        codeLine: selectedOp === '4' 
          ? (isDivByZero ? 'if b == 0: return "Erro..."' : 'return a / b')
          : `return a ${opSym} b`,
        lineNum: selectedOp === '1' ? 9 : selectedOp === '2' ? 13 : selectedOp === '3' ? 17 : (isDivByZero ? 22 : 23),
        scope: `${fnName}(a, b)`,
        description: isDivByZero 
          ? "Atenção! A condição 'if b == 0' foi satisfeita. A função desvia do cálculo e retorna o aviso seguro de erro sem travar."
          : `A função calcula a operação matemática '${inputVal1} ${opSym} ${inputVal2}' e prepara a resposta.`,
        variables: {
          "a (parâmetro)": { val: `${inputVal1}.0`, type: "float" },
          "b (parâmetro)": { val: `${inputVal2}.0`, type: "float" },
          "retorno_calculado": { 
            val: typeof mathResult === 'string' ? `"${mathResult}"` : `${mathResult}`, 
            type: typeof mathResult === 'string' ? "str" : "float" 
          }
        },
        callStack: ["<module>", "calculadora()", `${fnName}(a=${inputVal1}, b=${inputVal2})`]
      },
      {
        stepNum: 6,
        title: "6. Retorno à calculadora() e Exibição do Resultado",
        codeLine: 'print(f">> {num1} {operador} {num2} = {resultado}")',
        lineNum: 69,
        scope: "calculadora()",
        description: `A função ${fnName}() devolveu a resposta para 'resultado'. O print formata os dados com f-string para o usuário.`,
        variables: {
          "num1": { val: `${inputVal1}.0`, type: "float" },
          "num2": { val: `${inputVal2}.0`, type: "float" },
          "operador": { val: `"${opSym}"`, type: "str" },
          "resultado": { 
            val: typeof mathResult === 'string' ? `"${mathResult}"` : `${mathResult}`, 
            type: typeof mathResult === 'string' ? "str" : "float" 
          }
        },
        callStack: ["<module>", "calculadora()"]
      }
    ];

    return steps;
  };

  const steps = computeSteps();
  const currentStep = steps[Math.min(currentStepIdx, steps.length - 1)];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Parameter Control Deck */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">Configurar Exemplo para Visualização</h3>
            <p className="text-xs text-slate-400">Escolha a operação e os números para acompanhar o ponteiro de execução do Python</p>
          </div>

          {/* Operation selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => { setSelectedOp('1'); setCurrentStepIdx(0); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedOp === '1' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              + Adição
            </button>
            <button
              onClick={() => { setSelectedOp('2'); setCurrentStepIdx(0); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedOp === '2' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              - Subtração
            </button>
            <button
              onClick={() => { setSelectedOp('3'); setCurrentStepIdx(0); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedOp === '3' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              * Multiplicação
            </button>
            <button
              onClick={() => { setSelectedOp('4'); setCurrentStepIdx(0); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedOp === '4' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              / Divisão
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Número 1 (num1):</label>
            <input
              type="number"
              value={inputVal1}
              onChange={(e) => { setInputVal1(Number(e.target.value) || 0); setCurrentStepIdx(0); }}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Número 2 (num2):</label>
            <input
              type="number"
              value={inputVal2}
              onChange={(e) => { setInputVal2(Number(e.target.value) || 0); setCurrentStepIdx(0); }}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          {selectedOp === '4' && (
            <div className="col-span-1 sm:col-span-2 flex items-center gap-2">
              <button
                onClick={() => { setInputVal2(0); setCurrentStepIdx(0); }}
                className="px-3 py-1.5 text-xs font-medium bg-rose-950/40 text-rose-300 border border-rose-800/60 rounded-lg hover:bg-rose-900/40 transition-colors"
              >
                Definir num2 = 0 (Ver tratamento de erro)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Visual Execution Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step Progression & Code Tracker (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            {/* Header with Step indicator and Playback Controls */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                Passo {currentStep.stepNum} de {steps.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIdx === 0}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  title="Passo Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Reproduzir</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStepIdx === steps.length - 1}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  title="Próximo Passo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Voltar ao início"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Current Step Description */}
            <div>
              <h4 className="text-lg font-bold text-white mb-1.5">
                {currentStep.title}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Active Line in Python */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Instrução Python em Execução:</span>
                <span className="font-mono text-emerald-400">Linha {currentStep.lineNum}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-emerald-500/30 font-mono text-sm text-emerald-300 overflow-x-auto shadow-inner flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                <code>{currentStep.codeLine}</code>
              </div>
            </div>

            {/* Stepper Timeline Dots */}
            <div className="pt-2">
              <div className="flex items-center justify-between gap-1">
                {steps.map((st, idx) => (
                  <button
                    key={st.stepNum}
                    onClick={() => { setIsPlaying(false); setCurrentStepIdx(idx); }}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      idx === currentStepIdx
                        ? 'bg-emerald-400 ring-2 ring-emerald-400/40'
                        : idx < currentStepIdx
                          ? 'bg-emerald-700'
                          : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    title={`Ir para Passo ${st.stepNum}: ${st.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Memory & Call Stack Inspector (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Variables in Memory */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Database className="w-3.5 h-3.5" />
              <span>Memória do Python (Variáveis Ativas)</span>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Variável</th>
                    <th className="py-2 px-3">Tipo</th>
                    <th className="py-2 px-3 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {Object.entries(currentStep.variables).map(([key, data]) => (
                    <tr key={key} className="hover:bg-slate-900/40">
                      <td className="py-2 px-3 font-semibold text-purple-300">{key}</td>
                      <td className="py-2 px-3 text-slate-400">{data.type}</td>
                      <td className="py-2 px-3 text-right text-emerald-400 font-bold tabular-nums">
                        {data.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500">
              * Variáveis são criadas e atualizadas à medida que o interpretador lê cada linha.
            </p>
          </div>

          {/* Call Stack Inspector */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>Pilha de Chamadas (Call Stack)</span>
            </div>

            <div className="space-y-1.5">
              {currentStep.callStack.map((frame, index) => {
                const isTop = index === currentStep.callStack.length - 1;
                return (
                  <div
                    key={index}
                    className={`p-2 rounded-lg font-mono text-xs flex items-center justify-between border ${
                      isTop 
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 font-bold' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{frame}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-75">
                      {isTop ? 'Ativo' : 'Aguardando'}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-500">
              O escopo superior é onde o código está executando agora.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
