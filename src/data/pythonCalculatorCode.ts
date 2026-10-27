export interface CodeLine {
  lineNum: number;
  text: string;
  section: 'functions' | 'menu' | 'loop' | 'input' | 'conditions' | 'entrypoint';
  annotation?: string;
}

export const RAW_PYTHON_CODE = `# ==========================================
# CALCULADORA SIMPLES EM PYTHON
# As quatro operacoes basicas da matematica
# ==========================================

# 1. DEFINICAO DAS FUNCOES MATEMATICAS
def adicionar(a, b):
    """Retorna a soma de dois numeros"""
    return a + b

def subtrair(a, b):
    """Retorna a subtracao do primeiro pelo segundo numero"""
    return a - b

def multiplicar(a, b):
    """Retorna a multiplicacao de dois numeros"""
    return a * b

def dividir(a, b):
    """Retorna a divisao ou mensagem de erro caso o divisor seja zero"""
    if b == 0:
        return "Erro: Divisao por zero nao e permitida!"
    return a / b

# 2. FUNCAO PRINCIPAL DA CALCULADORA
def calculadora():
    print("=" * 35)
    print("      CALCULADORA EM PYTHON        ")
    print("=" * 35)
    print("1 - Adicao (+)")
    print("2 - Subtracao (-)")
    print("3 - Multiplicacao (*)")
    print("4 - Divisao (/)")
    print("0 - Sair")
    print("=" * 35)

    # 3. LACO DE REPETICAO PARA PERMITIR VARIOS CALCULOS
    while True:
        opcao = input("\\nEscolha a operacao (0-4): ").strip()

        # Verifica se o usuario quer encerrar o programa
        if opcao == "0":
            print("\\nObrigado por usar a calculadora! Ate logo.")
            break

        # Verifica se a opcao digitada e valida
        if opcao in ("1", "2", "3", "4"):
            try:
                # 4. CAPTURA E CONVERSAO DOS NUMEROS
                num1 = float(input("Digite o primeiro numero: "))
                num2 = float(input("Digite o segundo numero: "))
            except ValueError:
                print("Valor invalido! Digite apenas numeros validos.")
                continue

            # 5. EXECUCAO DA OPERACAO ESCOLHIDA
            if opcao == "1":
                resultado = adicionar(num1, num2)
                operador = "+"
            elif opcao == "2":
                resultado = subtrair(num1, num2)
                operador = "-"
            elif opcao == "3":
                resultado = multiplicar(num1, num2)
                operador = "*"
            elif opcao == "4":
                resultado = dividir(num1, num2)
                operador = "/"

            # 6. EXIBICAO DO RESULTADO
            if isinstance(resultado, str):
                print(f"\\n[Resultado] {resultado}")
            else:
                print(f"\\n>> {num1} {operador} {num2} = {resultado}")
        else:
            print("Opcao invalida! Por favor, escolha entre 0, 1, 2, 3 ou 4.")

# 7. PONTO DE ENTRADA DO SCRIPT
if __name__ == "__main__":
    calculadora()
`;

export const ANNOTATED_CODE_LINES: CodeLine[] = [
  { lineNum: 1, text: "# ==========================================", section: 'functions' },
  { lineNum: 2, text: "# CALCULADORA SIMPLES EM PYTHON", section: 'functions' },
  { lineNum: 3, text: "# As quatro operações básicas da matemática", section: 'functions' },
  { lineNum: 4, text: "# ==========================================", section: 'functions' },
  { lineNum: 5, text: "", section: 'functions' },
  { lineNum: 6, text: "# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS", section: 'functions', annotation: "Funções agrupam blocos de código reutilizáveis." },
  { lineNum: 7, text: "def adicionar(a, b):", section: 'functions', annotation: "Declara a função 'adicionar' recebendo dois parâmetros: a e b." },
  { lineNum: 8, text: '    """Retorna a soma de dois números"""', section: 'functions' },
  { lineNum: 9, text: "    return a + b", section: 'functions', annotation: "A palavra 'return' devolve o cálculo da soma para quem chamou." },
  { lineNum: 10, text: "", section: 'functions' },
  { lineNum: 11, text: "def subtrair(a, b):", section: 'functions' },
  { lineNum: 12, text: '    """Retorna a subtração entre dois números"""', section: 'functions' },
  { lineNum: 13, text: "    return a - b", section: 'functions' },
  { lineNum: 14, text: "", section: 'functions' },
  { lineNum: 15, text: "def multiplicar(a, b):", section: 'functions' },
  { lineNum: 16, text: '    """Retorna a multiplicação de dois números"""', section: 'functions' },
  { lineNum: 17, text: "    return a * b", section: 'functions' },
  { lineNum: 18, text: "", section: 'functions' },
  { lineNum: 19, text: "def dividir(a, b):", section: 'functions', annotation: "Atenção: na divisão devemos verificar se o divisor é 0." },
  { lineNum: 20, text: '    """Retorna a divisão ou aviso de erro"""', section: 'functions' },
  { lineNum: 21, text: "    if b == 0:", section: 'functions', annotation: "Verifica se b é igual a zero para evitar falha fatal no programa." },
  { lineNum: 22, text: '        return "Erro: Divisão por zero não é permitida!"', section: 'functions' },
  { lineNum: 23, text: "    return a / b", section: 'functions' },
  { lineNum: 24, text: "", section: 'menu' },
  { lineNum: 25, text: "# 2. FUNÇÃO PRINCIPAL", section: 'menu' },
  { lineNum: 26, text: "def calculadora():", section: 'menu', annotation: "Função que orquestra a interação com o usuário." },
  { lineNum: 27, text: '    print("=" * 35)', section: 'menu', annotation: 'O operador * repete o caractere "=" 35 vezes.' },
  { lineNum: 28, text: '    print("      CALCULADORA EM PYTHON        ")', section: 'menu' },
  { lineNum: 29, text: '    print("=" * 35)', section: 'menu' },
  { lineNum: 30, text: '    print("1 - Adição (+)")', section: 'menu' },
  { lineNum: 31, text: '    print("2 - Subtração (-)")', section: 'menu' },
  { lineNum: 32, text: '    print("3 - Multiplicação (*)")', section: 'menu' },
  { lineNum: 33, text: '    print("4 - Divisão (/)")', section: 'menu' },
  { lineNum: 34, text: '    print("0 - Sair")', section: 'menu' },
  { lineNum: 35, text: '    print("=" * 35)', section: 'menu' },
  { lineNum: 36, text: "", section: 'loop' },
  { lineNum: 37, text: "    # 3. LAÇO DE REPETIÇÃO", section: 'loop' },
  { lineNum: 38, text: "    while True:", section: 'loop', annotation: "Cria um loop infinito que mantém a calculadora aberta até o usuário sair." },
  { lineNum: 39, text: '        opcao = input("\\nEscolha a operação (0-4): ").strip()', section: 'input', annotation: "input() recebe texto do teclado; .strip() remove espaços extras." },
  { lineNum: 40, text: "", section: 'conditions' },
  { lineNum: 41, text: '        if opcao == "0":', section: 'conditions', annotation: "Compara se a opção digitada é o zero para encerrar." },
  { lineNum: 42, text: '            print("\\nObrigado por usar a calculadora! Até logo.")', section: 'conditions' },
  { lineNum: 43, text: "            break", section: 'loop', annotation: "O comando 'break' interrompe e sai do loop while imediatamente." },
  { lineNum: 44, text: "", section: 'conditions' },
  { lineNum: 45, text: '        if opcao in ("1", "2", "3", "4"):', section: 'conditions', annotation: "Verifica se a opção escolhida está na tupla de opções aceitas." },
  { lineNum: 46, text: "            try:", section: 'input', annotation: "try / except previne que o programa feche se o usuário digitar texto ao invés de números." },
  { lineNum: 47, text: '                num1 = float(input("Digite o primeiro número: "))', section: 'input', annotation: "float() converte o texto lido em número decimal." },
  { lineNum: 48, text: '                num2 = float(input("Digite o segundo número: "))', section: 'input' },
  { lineNum: 49, text: "            except ValueError:", section: 'input', annotation: "Captura o erro se a conversão float falhar." },
  { lineNum: 50, text: '                print("Valor inválido! Digite apenas números válidos.")', section: 'input' },
  { lineNum: 51, text: "                continue", section: 'loop', annotation: "continue pula para a próxima volta do while." },
  { lineNum: 52, text: "", section: 'conditions' },
  { lineNum: 53, text: '            if opcao == "1":', section: 'conditions' },
  { lineNum: 54, text: "                resultado = adicionar(num1, num2)", section: 'conditions', annotation: "Chama a função adicionar passando os 2 números digitados." },
  { lineNum: 55, text: '                operador = "+"', section: 'conditions' },
  { lineNum: 56, text: '            elif opcao == "2":', section: 'conditions' },
  { lineNum: 57, text: "                resultado = subtrair(num1, num2)", section: 'conditions' },
  { lineNum: 58, text: '                operador = "-"', section: 'conditions' },
  { lineNum: 59, text: '            elif opcao == "3":', section: 'conditions' },
  { lineNum: 60, text: "                resultado = multiplicar(num1, num2)", section: 'conditions' },
  { lineNum: 61, text: '                operador = "*"', section: 'conditions' },
  { lineNum: 62, text: '            elif opcao == "4":', section: 'conditions' },
  { lineNum: 63, text: "                resultado = dividir(num1, num2)", section: 'conditions' },
  { lineNum: 64, text: '                operador = "/"', section: 'conditions' },
  { lineNum: 65, text: "", section: 'conditions' },
  { lineNum: 66, text: "            if isinstance(resultado, str):", section: 'conditions', annotation: "isinstance verifica se o retorno foi uma mensagem de erro em texto." },
  { lineNum: 67, text: '                print(f"\\n[Resultado] {resultado}")', section: 'conditions' },
  { lineNum: 68, text: "            else:", section: 'conditions' },
  { lineNum: 69, text: '                print(f"\\n>> {num1} {operador} {num2} = {resultado}")', section: 'conditions', annotation: "f-string permite interpolar variáveis dentro de texto com {variavel}." },
  { lineNum: 70, text: "        else:", section: 'conditions' },
  { lineNum: 71, text: '            print("Opção inválida! Por favor, escolha entre 0, 1, 2, 3 ou 4.")', section: 'conditions' },
  { lineNum: 72, text: "", section: 'entrypoint' },
  { lineNum: 73, text: '# 4. PONTO DE ENTRADA DO SCRIPT', section: 'entrypoint' },
  { lineNum: 74, text: 'if __name__ == "__main__":', section: 'entrypoint', annotation: "Garante que a calculadora só execute se o script for executado diretamente." },
  { lineNum: 75, text: "    calculadora()", section: 'entrypoint' },
];

export interface ConceptItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  codeSnippet: string;
  whyItMatters: string;
  beginnerTip: string;
}

export const PYTHON_CONCEPTS: ConceptItem[] = [
  {
    id: 'functions',
    title: '1. Funções com "def"',
    subtitle: 'Modularização e Reutilização',
    description: 'Em Python, criamos funções usando a palavra-chave def seguida do nome e parênteses. Funções recebem parâmetros (entradas) e utilizam return para devolver uma resposta.',
    codeSnippet: `def adicionar(a, b):\n    return a + b`,
    whyItMatters: 'Evita repetição de código (princípio DRY - Don\'t Repeat Yourself) e torna o projeto fácil de testar e dar manutenção.',
    beginnerTip: 'O que está indentado (4 espaços para a direita) pertence ao corpo da função.'
  },
  {
    id: 'input_float',
    title: '2. Entrada de Dados: input() e float()',
    subtitle: 'Captura de Valores e Conversão de Tipos',
    description: 'A função input() sempre lê dados como texto (string). Para fazer cálculos matemáticos, é obrigatório converter esse texto para número com float() ou int().',
    codeSnippet: `texto = input("Digite um número: ")  # "10"\nnumero = float(texto)                # 10.0`,
    whyItMatters: 'Se você somar duas strings ("5" + "5"), o Python resultará em "55" (concatenação) em vez de 10.',
    beginnerTip: 'Usamos float() em vez de int() porque calculadoras precisam aceitar números com vírgula/ponto (ex: 7.5).'
  },
  {
    id: 'conditionals',
    title: '3. Estruturas Condicionais: if, elif, else',
    subtitle: 'Tomada de Decisão Lógica',
    description: 'Permitem que o computador execute caminhos diferentes conforme a escolha do usuário ou o valor das variáveis.',
    codeSnippet: `if opcao == "1":\n    resultado = adicionar(num1, num2)\nelif opcao == "2":\n    resultado = subtrair(num1, num2)\nelse:\n    print("Opção inválida")`,
    whyItMatters: 'O elif (abreviação de "else if") testa condições subsequentes somente se a anterior tiver sido falsa.',
    beginnerTip: 'Use == (dois iguais) para comparar igualdade e = (um igual) para atribuir valor a uma variável.'
  },
  {
    id: 'zero_division',
    title: '4. Proteção contra Divisão por Zero',
    subtitle: 'Tratamento de Casos Críticos',
    description: 'Na matemática, divisão por zero é indefinida. Em Python, tentar fazer 10 / 0 dispara um erro fatal chamado ZeroDivisionError que derruba o programa se não for tratado.',
    codeSnippet: `if b == 0:\n    return "Erro: Divisão por zero não é permitida!"\nreturn a / b`,
    whyItMatters: 'Softwares profissionais antecipam entradas inesperadas do usuário e exibem mensagens amigáveis.',
    beginnerTip: 'Sempre teste os "casos limites" (edge cases) ao programar.'
  },
  {
    id: 'loops',
    title: '5. Laço de Repetição: while True e break',
    subtitle: 'Execução Contínua',
    description: 'O while True cria um laço que continua rodando até encontrar um break. Isso permite ao usuário realizar várias contas sem precisar reabrir o programa toda vez.',
    codeSnippet: `while True:\n    opcao = input("Opção: ")\n    if opcao == "0":\n        break  # Sai do loop`,
    whyItMatters: 'Sem o laço, a calculadora faria uma única conta e fecharia imediatamente.',
    beginnerTip: 'Cuidado para sempre garantir que exista uma condição de saída (break) para não travar em loop infinito.'
  },
  {
    id: 'entrypoint',
    title: '6. Ponto de Entrada: if __name__ == "__main__"',
    subtitle: 'Boas Práticas de Engenharia Python',
    description: 'Essa linha verifica se o script foi executado diretamente pelo terminal (por exemplo, python calculadora.py) ou se foi importado como módulo em outro arquivo.',
    codeSnippet: `if __name__ == "__main__":\n    calculadora()`,
    whyItMatters: 'Permite que outras pessoas importem suas funções matemáticas sem que o menu interativo dispare sozinho.',
    beginnerTip: 'É a convenção padrão da comunidade Python para iniciar scripts.'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "O que a função input() do Python sempre retorna por padrão?",
    options: [
      "Um número inteiro (int)",
      "Uma cadeia de texto (str)",
      "Um número decimal (float)",
      "Um valor booleano (True ou False)"
    ],
    correctIndex: 1,
    explanation: "input() sempre devolve o que o usuário digitou como texto (string). Por isso usamos float() para converter em número!"
  },
  {
    id: 2,
    question: "Qual o operador utilizado em Python para verificar se dois valores são iguais em uma condicional?",
    options: [
      "= (igual simples)",
      "== (dois iguais)",
      "=== (três iguais)",
      "equals()"
    ],
    correctIndex: 1,
    explanation: "Em Python, = é usado para atribuição de variáveis (x = 10) e == é usado para comparação de igualdade (if x == 10)."
  },
  {
    id: 3,
    question: "O que acontece se executarmos a operação 15 / 0 em Python sem nenhuma proteção?",
    options: [
      "O Python retorna infinito (inf)",
      "O Python retorna 0",
      "O programa trava e lança um erro ZeroDivisionError",
      "O Python arredonda para 1"
    ],
    correctIndex: 2,
    explanation: "O Python interrompe a execução com a exceção ZeroDivisionError. Por isso colocamos a verificação 'if b == 0:'."
  },
  {
    id: 4,
    question: "Qual a função da instrução 'break' dentro de um laço 'while True'?",
    options: [
      "Pausar o programa por 5 segundos",
      "Interromper e sair imediatamente do laço",
      "Voltar ao início do laço ignorando o resto",
      "Reiniciar o computador"
    ],
    correctIndex: 1,
    explanation: "A instrução 'break' quebra a repetição do laço e continua a execução do código logo após o bloco while."
  }
];
