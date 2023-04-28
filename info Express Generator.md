https://expressjs.com/pt-br/starter/generator.html

ferramenta chamada Express Application Generator que já cria um “esqueleto” para aplicações Express. A instalação é realizada via NPM (Node Package Manager ou seja, o Gerenciador de Pacotes do Node). Pode-se usar o parâmetro -g para instalar o pacote globalmente, ou seja, você pode acessá-lo de qualquer lugar do computador.

 npm install express-generator -g <!-- códiog -->

 Depois da instalação, vá até o local/pasta onde você deseja desenvolver o projeto e escreva a seguinte linha de comando abaixo, indicando express <nome do projeto a ser criado>:

 express olamundo <!-- códiog -->

 No caso do exemplo, estou criando um projeto chamado olamundo. Observe que já será criada a pasta olamundo com uma estrutura padrão de subpastas:

No terminal, já terá a orientação para navegar até a pasta criada e instalar os pacotes com npm install.

change directory:       <!-- códiog -->
    > cd olamundo       <!-- códiog -->
install dependencies:   <!-- códiog -->
    > npm install       <!-- códiog -->

Vamos fazer esses dois passos e depois iremos usar o comando npm start para iniciar a aplicação. Observe que ao digitar o endereço http://localhost:3000 no navegador, ele já vai exibir uma mensagem:

Ao digitar o endereço http://localhost:3000/users também podemos observar que já existe uma rota padrão cadastrada.

Essa implementação pode ser vista nos arquivos index.js e users.js dentro da pasta routes. Abaixo um exemplo de como está implementado o arquivo users.js.

Usar uma ferramenta que gera código automaticamente pode ser vantajoso e nos fazer ganhar tempo, porém é sempre importante analisar o código e entender se atende ao projeto/contexto que você está se propondo a desenvolver, pois não existe solução única e padronizada.

