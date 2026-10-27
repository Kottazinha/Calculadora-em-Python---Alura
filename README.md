# 🐍 Calculadora Didática em Python

> Uma calculadora desenvolvida especialmente para quem está começando a aprender programação, unindo um **script Python puro comentado** e uma **interface web interativa com laboratório de aprendizagem em tempo real**.

---

## 📌 Visão Geral

Este projeto foi criado com fins didáticos para desmistificar a lógica de programação. Ele ensina como estruturar um programa limpo e modular a partir das 4 operações aritméticas básicas da matemática:

- ➕ **Adição** (`adicionar`)
- ➖ **Subtração** (`subtrair`)
- ✖️ **Multiplicação** (`multiplicar`)
- ➗ **Divisão** (`dividir`, com proteção contra divisão por zero)

O repositório oferece duas formas de uso:
1. **Script de Terminal (`calculadora.py`):** Código Python 3 puro, sem dependências externas, pronto para rodar em qualquer terminal ou editor (VS Code, Thonny, PyCharm, Replit).
2. **Aplicação Web Interativa (`React + Vite + Tailwind CSS`):** Um laboratório didático completo com:
   - Visualizador de código com explicação interativa linha a linha;
   - Terminal Python simulado no próprio navegador;
   - Inspetor de fluxo e variáveis na memória do computador passo a passo;
   - Quiz de fixação com feedback imediato.

---

## 🚀 Como Executar o Projeto

### Opção 1: Rodar o Script Python no Terminal (Recomendado para Iniciantes)

Certifique-se de ter o **Python 3** instalado em sua máquina ([Download no python.org](https://www.python.org/downloads/)).

1. Abra o seu terminal ou prompt de comando na pasta do projeto.
2. Execute o comando:
   ```bash
   python calculadora.py
   ```
   *(Em alguns sistemas operacionais como Linux/macOS, use `python3 calculadora.py`)*

3. Siga as instruções do menu interativo no terminal!

---

### Opção 2: Rodar a Interface Web Interativa

Se você quiser explorar o laboratório visual interativo no seu navegador:

1. Instale o [Node.js](https://nodejs.org/) (versão 18 ou superior).
2. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra o link gerado no terminal (geralmente `http://localhost:3000` ou `http://localhost:5173`).

---

## 🧠 Principais Componentes do Código Explicados

Se você é iniciante em programação, aqui está o que cada parte do arquivo `calculadora.py` faz:

### 1. A Palavra-Chave `def` (Definição de Funções)
```python
def adicionar(a, b):
    return a + b
```
- **O que é:** Uma função é um bloco de instruções com um nome próprio que pode ser executado várias vezes sem precisar reescrever o código.
- **`def`:** Avisa ao interpretador Python: *"aqui começa a definição de uma nova função"*.
- **`adicionar`:** É o nome que escolhemos para a função.

### 2. Parâmetros e Argumentos `(a, b)`
- **Parâmetros (`a, b`):** São as variáveis temporárias na declaração da função que esperam receber valores.
- **Argumentos:** São os números reais que você envia ao chamar a função (exemplo: ao chamar `adicionar(10, 5)`, `a` assume o valor `10` e `b` assume o valor `5`).

### 3. O Comando `return`
- O `return` entrega a resposta calculada de volta para quem chamou a função. Sem o `return`, o cálculo seria realizado na memória, mas o resultado seria perdido e a função retornaria `None`.

### 4. Proteção contra Divisão por Zero (`if b == 0:`)
```python
def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b
```
- Na matemática não existe divisão por zero. Em Python, tentar fazer `10 / 0` gera uma falha fatal chamada `ZeroDivisionError`.
- Usando o teste condicional `if b == 0:`, verificamos o divisor antes de realizar o cálculo, garantindo que o programa continue estável e mostre uma mensagem amigável ao usuário.

### 5. Conversão para Decimal (`float()`)
```python
num1 = float(input("Digite o primeiro número: "))
```
- O comando `input()` sempre lê o que o usuário digita como **texto** (`string`).
- A função `float()` converte esse texto em um número com casas decimais (exemplo: `4.5`), permitindo que a calculadora aceite números inteiros e fracionários.

### 6. Tratamento de Erros com `try ... except`
```python
try:
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
except ValueError:
    print("Valor inválido! Digite apenas números.")
    continue
```
- Se o usuário digitar letras acidentalmente (como `"abc"`), a conversão `float()` falharia.
- O bloco `try ... except ValueError` captura essa falha com segurança, avisa o usuário e usa `continue` para reiniciar o laço sem travar o programa.

### 7. Laço Contínuo com `while True` e `break`
```python
while True:
    opcao = input(...)
    if opcao == "0":
        break
```
- O `while True` cria uma repetição contínua para que você possa fazer várias contas seguidas.
- A instrução `break` interrompe a repetição imediatamente quando o usuário decide digitar `"0"`.

### 8. O que significa `if __name__ == "__main__":`?
```python
if __name__ == "__main__":
    calculadora()
```
- Essa instrução garante que a função `calculadora()` só comece a rodar se o arquivo for executado diretamente pelo usuário (`python calculadora.py`), e não se ele for apenas importado como módulo por outro script.

---

## 📂 Estrutura de Arquivos

```text
├── calculadora.py          # Script Python puro educativo para terminal
├── index.html              # Ponto de entrada da aplicação Web
├── metadata.json           # Metadados e título da aplicação
├── package.json            # Dependências e scripts do projeto Web
├── README.md               # Este arquivo de documentação completa
├── src/
│   ├── App.tsx             # Componente central e navegação por abas
│   ├── components/
│   │   ├── BeginnerQuiz.tsx         # Quiz interativo para fixação de conceitos
│   │   ├── CodeViewer.tsx           # Visualizador de código com anotações dinâmicas
│   │   ├── ConceptsDeck.tsx         # Cartões explicativos dos pilares do Python
│   │   ├── Navbar.tsx               # Barra de navegação e download do script
│   │   ├── StepByStepVisualizer.tsx # Inspetor de memória e fluxo passo a passo
│   │   └── TerminalSimulator.tsx    # Emulador do terminal Python no navegador
│   ├── data/
│   │   └── pythonCalculatorCode.ts  # Código, dados e perguntas do quiz
│   ├── index.css           # Estilização com Tailwind CSS e fontes Google
│   └── main.tsx            # Inicialização da aplicação React
├── tsconfig.json           # Configuração do TypeScript
└── vite.config.ts          # Configuração de build do Vite
```

---

## 📤 Como Publicar no seu GitHub

Se você deseja subir este projeto para a sua própria conta do GitHub:

### Passo 1: Crie um Repositório Vazio no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Dê um nome ao repositório (por exemplo: `calculadora-python-didatica`).
3. Deixe o repositório como **Público** e **NÃO** marque a opção de adicionar README (já temos este pronto aqui).
4. Clique em **Create repository**.

### Passo 2: Inicialize e Envie pelo Terminal
No terminal da pasta deste projeto, execute a seguinte sequência de comandos:

```bash
# 1. Inicia o repositório Git local
git init

# 2. Adiciona todos os arquivos ao controle de versão
git add .

# 3. Cria o primeiro commit
git commit -m "feat: calculadora didatica em python e interface web interativa"

# 4. Define a branch principal como main
git branch -M main

# 5. Conecte ao seu repositório no GitHub (substitua SEU-USUARIO e SEU-REPOSITORIO pela sua URL)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# 6. Envie os arquivos para o GitHub!
git push -u origin main
```

Pronto! Seu projeto estará publicado no GitHub com toda a documentação, o script Python independente pronto para rodar e a aplicação web completa.

---

## 📄 Licença

Este projeto é de código aberto e está licenciado sob a licença [Apache 2.0](LICENSE) — sinta-se à vontade para estudar, modificar e compartilhar!
