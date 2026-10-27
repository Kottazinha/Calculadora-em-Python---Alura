# ==========================================
# CALCULADORA SIMPLES EM PYTHON
# As quatro operações básicas da matemática
# ==========================================

# 1. FUNÇÕES MATEMÁTICAS
def adicionar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do primeiro pelo segundo número."""
    return a - b

def multiplicar(a, b):
    """Retorna a multiplicação de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão ou um aviso caso o divisor seja zero."""
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

# 2. FUNÇÃO PRINCIPAL DA CALCULADORA
def calculadora():
    print("=" * 35)
    print("      CALCULADORA EM PYTHON        ")
    print("=" * 35)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("0 - Sair")
    print("=" * 35)

    # 3. LAÇO DE REPETIÇÃO
    while True:
        opcao = input("\nEscolha a operação (0-4): ").strip()

        # Condição de saída
        if opcao == "0":
            print("\nObrigado por usar a calculadora! Até logo.")
            break

        # Validação da opção
        if opcao in ("1", "2", "3", "4"):
            try:
                # 4. ENTRADA E CONVERSÃO DOS NÚMEROS
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))
            except ValueError:
                print("Valor inválido! Digite apenas números.")
                continue

            # 5. ESTRUTURA CONDICIONAL (IF / ELIF)
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

            # 6. EXIBIÇÃO DO RESULTADO
            if isinstance(resultado, str):
                print(f"\n[Aviso] {resultado}")
            else:
                print(f"\n>> {num1} {operador} {num2} = {resultado}")
        else:
            print("Opção inválida! Escolha entre 0, 1, 2, 3 ou 4.")

# 7. PONTO DE ENTRADA DO PROGRAMA
if __name__ == "__main__":
    calculadora()
