# Gerenciador de funcionários

* Listar todos os funcionário em tabela
* Ações como Cadastrar, Editar e Excluir funcionário


## Utilizados

* Ant Design - é uma biblioteca de design do React UI para criar interfaces elegantes.
* Toastify - é uma lib para retornar erros de forma amigavel (popup aparece superior direito).
* JSON-Server - simular servidor e disponibilizando fonte de dados para ser consultada via API.
* AXIOS - lib utilizada para fazer fetch API.


## Desenvolvimento

Para facilitar e agilizar, escrever menos HTML e SASS, disponibilizar e permitir dedicar mais tempo no dev da lógica e do script, utilizei a biblioteca Ant Design.

Em alguns casos, pode ser mais verboso em momentos de aprendizado, mas com entendimento do componente que vai chamar, pode ter mais agilidade, principalmente por não ter a necessidade de escrever CSS em boa parte.

### Layout

Tela com Header onde tem espaço para aplicar o logo e nome da tela e Body onde é renderizada conteúdo.

* Botão "Novo Funcionário" - abre modal com campos para entrar com as informações, ao clicar no botão "Salvar" do modal, as informações vai para localStorage.

* Tabela renderizando todas as informações que está no arquivo `./server.json`

Campos/Colunas:
- id
- nome
- cpf
- salario
- desconto
- dependentes

E também além dessas colunas, temos uma última coluna com botões ***Editar*** e ***Excluir***

***Editar*** - abre modal carregando as informações do funcionário clicado - Ainda não estou conseguindo digitar e salvar as informações no Modal.

***Excluir*** - Exclui o funcionário da tabela - Funcionamento OK

## Exemplo das Tabelas

### Telas principal
![tabela-calculo-irrf](https://user-images.githubusercontent.com/17436856/121071245-140fa400-c7a6-11eb-8ebd-af9ad6b6111e.png)

### Tela de popup avisando funcionário excluido
![popup-aviso-funcionario-excluido](https://user-images.githubusercontent.com/17436856/121072056-1aeae680-c7a7-11eb-8700-b7413e8101d5.png)

### Modal de Cadastrar Funcionário
![modal-cadastrar-funcionario](https://user-images.githubusercontent.com/17436856/121072272-5c7b9180-c7a7-11eb-86e5-6ba6ed7e8e24.png)

### Modal com Dados nos inputs
![form-com-dados](https://user-images.githubusercontent.com/17436856/121072427-95b40180-c7a7-11eb-8b97-6659a7e34481.png)


## Calculo Desconto IRRF

Ao realizar o map() dos funcionários, no campo `descontoirrf` faço chamada de uma *function* passando o resultado do cálculo: `descontoirrf: calculaDescontoIRRF(salario - desconto - (deducaoDependente * dependentes))`

Dentro da *function* `calculaDescontoIRRF` é chamado uma nova *function* `formataValorMonetario` para formatar o valor que será retornado com tipo *currency: 'BRL'* 


## Executar o projeto

* Em seu *VSCODE*, abra duas abas do terminal.

[1°] - Na primeira aba rode o server para disponibilizar os dados: `npm run server`

[2°] - Na segunda aba suba a aplicação `npm run start`