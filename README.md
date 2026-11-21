# Você Merece

Site com cinco partes, fotos, uma carta, música de fundo e uma animação do buquê.
Os arquivos são estáticos e não precisam de instalação ou compilação.
A composição se adapta a celular, tablet e computador, incluindo telas na horizontal.

## Colocar no GitHub

Crie um repositório e envie o conteúdo extraído deste ZIP para a raiz.
O arquivo `index.html` deve ficar diretamente na raiz, ao lado da pasta `_assets`.
Envie também os arquivos CSS e JavaScript.

Para conferir no computador, execute `python -m http.server 8080` na raiz
e abra `http://localhost:8080/?movimento=1`. O parâmetro ativa as animações
na prévia mesmo com a preferência de movimento reduzido ligada no sistema.

No Vercel, importe o repositório, selecione **Other** e deixe os comandos de
instalação e compilação vazios. O diretório de saída é a própria raiz (`.`).

## Conteúdo

- `index.html`: conteúdo, fotos e carta.
- `estilo.css`, `posicoes.css`, `ajuste-tamanho.css`: aparência e posições.
- `experiencia.js`: animações e ajuste da carta ao texto.
- `musica.js`: reprodução do áudio em repetição.
- `buque/`: composição editável do buquê em HyperFrames.
- `_assets/`: imagens, fontes e música.

Quando o navegador bloquear som automático, a música começa no primeiro toque,
clique ou interação pelo teclado.
