/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CodeViewer } from './components/CodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { StepByStepVisualizer } from './components/StepByStepVisualizer';
import { ConceptsDeck } from './components/ConceptsDeck';
import { BeginnerQuiz } from './components/BeginnerQuiz';
import { ReadmeViewer } from './components/ReadmeViewer';
import { README_MD_CONTENT } from './data/pythonCalculatorCode';
import { Code, Terminal, Cpu, BookOpen, CheckSquare, Sparkles, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('code');

  const tabs = [
    { id: 'code', label: 'Código Fonte & Explicações', icon: Code },
    { id: 'terminal', label: 'Terminal Interativo', icon: Terminal },
    { id: 'visualizer', label: 'Execução Passo a Passo', icon: Cpu },
    { id: 'concepts', label: 'Conceitos Fundamentais', icon: BookOpen },
    { id: 'quiz', label: 'Desafios & Quiz', icon: CheckSquare },
    { id: 'readme', label: 'README do GitHub', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Bar Contract Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="p-6 sm:p-8 bg-slate-900/60 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guia Didático para Iniciantes em Programação</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
              Calculadora em Python: As Quatro Operações Básicas
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Aprenda a estruturar um programa em Python do zero. Explore o código comentado, teste as operações diretamente no terminal interativo do navegador e visualize o que acontece na memória do computador passo a passo.
            </p>

            {/* Quick stats / metadata without pill enclosures */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
              <span>Python 3.x</span>
              <span aria-hidden="true">·</span>
              <span>Adição, Subtração, Multiplicação e Divisão</span>
              <span aria-hidden="true">·</span>
              <span>Proteção ZeroDivisionError</span>
              <span aria-hidden="true">·</span>
              <span>Estrutura com Funções Modulares</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab View */}
        <section className="transition-opacity duration-200">
          {activeTab === 'code' && (
            <CodeViewer
              onRunInTerminal={() => setActiveTab('terminal')}
              onExploreStepByStep={() => setActiveTab('visualizer')}
            />
          )}

          {activeTab === 'terminal' && (
            <TerminalSimulator />
          )}

          {activeTab === 'visualizer' && (
            <StepByStepVisualizer />
          )}

          {activeTab === 'concepts' && (
            <ConceptsDeck />
          )}

          {activeTab === 'quiz' && (
            <BeginnerQuiz />
          )}

          {activeTab === 'readme' && (
            <ReadmeViewer content={README_MD_CONTENT} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-400 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span>Calculadora em Python · Guia Didático para Iniciantes</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Desenvolvido com Python 3 e boas práticas da PEP 8</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
