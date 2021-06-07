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



## Calculo Desconto IRRF

Ao realizar o map() dos funcionários, no campo `descontoirrf` faço chamada de uma *function* passando o resultado do cálculo: `descontoirrf: calculaDescontoIRRF(salario - desconto - (deducaoDependente * dependentes))`

Dentro da *function* `calculaDescontoIRRF` é chamado uma nova *function* `formataValorMonetario` para formatar o valor que será retornado com tipo *currency: 'BRL'* 


## Executar o projeto

* Em seu *VSCODE*, abra duas abas do terminal.

[1°] - Na primeira aba rode o server para disponibilizar os dados: `npm run server`

[2°] - Na segunda aba suba a aplicação `npm run start`