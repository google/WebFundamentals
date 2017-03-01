project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Visão geral do foco na tela em acessibilidade


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Introdução a Foco {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



Nesta lição falaremos sobre *Foco* e como você pode controlá-lo em seu
aplicativo. Foco refere-se a qual controle na tela (um item de interação, como um
campo, caixa de seleção, botão ou link) recebe entrada do teclado no momento, e da
área de transferência quando se cola conteúdo.

Este é um ótimo ponto para começar a aprender sobre a acessibilidade, porque todos sabem
como usar um teclado, é fácil de se identifica e de testar, e beneficia
praticamente todos os usuários.

Usuários com deficiências motoras, que podem ser qualquer coisa, de paralisia permanente
a um pulso torcido, podem contar com um teclado ou dispositivo de switch
para navegar na sua página, por isso uma boa estratégia de foco é fundamental
para lhes proporcionar uma boa experiência.

E, quanto aos usuários avançados que conhecem todos os atalhos de teclado em suas máquinas,
e conseguem navegar rapidamente seu site pelo teclado isso certamente os
tornará mais produtivos.

Assim, uma estratégia de foco bem implementada garante que todos que usam
seu aplicativo tenham uma experiência melhor. Veremos, nas próximas lições, que
o esforço dedicado ao foco é uma base importante para suportar usuários de
tecnologia assistiva e, certamente, todos os usuários.

## O que é foco?

O foco determina para onde os eventos de teclado vão na página em um momento qualquer. Por
exemplo, se você se focar um campo de entrada de texto e começar a digitar, o
campo de entrada recebe os eventos de teclado e exibe os caracteres que você digita. Embora tenha o
foco, ele também receberá entrada colada a partir da área de transferência.

![oco do teclado em um campo de texto](imgs/keyboard-focus.png)

O item atualmente em foco frequentemente é indicado por um *anel de foco*, cujo
estilo depende tanto do navegador e de qualquer estilo que o autor da página
tenha aplicado. O Chrome, por exemplo, geralmente realça elementos focados com uma borda
azul, enquanto o Firefox utiliza uma borda tracejada.

![botão sign up](imgs/sign-up.png)

Alguns usuários operam seus computadores quase que inteiramente com o teclado
ou outro dispositivo de interação. Para esses usuários, o foco é crucial; pois é seu
principal meio de alcançar tudo que há na tela. Por este motivo, a lista de verificação Web AIM afirma,
na seção 2.1.1 que [todas as funcionalidades da página devem estar disponíveis usando
o teclado](http://webaim.org/standards/wcag/checklist#sc2.1.1){: .external },
a menos que seja algo impossível de se fazer com um teclado, como desenhar à mão livre.

Como usuário, você pode controlar qual elemento está atualmente focado usando `Tab`,
`Shift+Tab` ou as teclas de seta. No Mac OSX isso funciona de forma um pouco diferente:
enquanto o Chrome sempre permita a navegação com `Tab`, é preciso pressionar `Option+Tab`
para alterar o foco em outros navegadores, como o Safari. (Você pode alterar essa configuração na seção
Teclado das Preferências do Sistema).

![caixa de diálogo de preferências](imgs/system-prefs2.png)

A ordem em que o foco passa para a frente e para trás através de elementos
interativos via `Tab` é chamada de *ordem de tab*. Certificar-se de
projetar sua página com uma ordem lógica de tab é uma etapa importante da qual
trataremos mais tarde.

## O que é focalizável?

Elementos HTML integrados interativos, como campos de texto, botões e listas de seleção
são *implicitamente focalizáveis*, o que significa que eles são inseridos automaticamente na guia
ordem e têm o manuseio integrado de eventos de teclado sem a intervenção do desenvolvedor.

![campos implicitamente focalizáveis](imgs/implicitly-focused.png)

Porém, nem todos os elementos são focalizáveis; parágrafos, divs e vários outros 
elementos de página não são focados conforme você tabula pela página, e isso
é projetado assim. Geralmente não há necessidade de focar em alguma coisa, se o usuário não pode interagir com ela.

![nem todos os elementos são focalizáveis](imgs/not-all-elements.png)

## Experimentando o foco

Vamos experimentar algumas das técnicas de foco que acabamos de discutir. Usando o Chrome, vá para este
[simulação de página
de companhia aérea](http://udacity.github.io/ud891/lesson2-focus/01-basic-form/){: .external }
e procure uma passagem específica **usando apenas interação pelo teclado**. A página não aceita
interação por mouse, então você não pode trapacear no exercício (não pense que não confiamos em você
;-).

![simulação de página de companhia aérea](imgs/airlinesite2.png)

Os parâmetros da passagem que você deve especificar são:

 - só ida
 - para Melbourne
 - partida em 12 de outubro de 2017 (12/10/2017)
 - retorno em 23 de outubro de 2017 (23/10/2017)
 - assento na janela
 - não desejo receber ofertas promocionais

Quando você completar o formulário sem erros de interação e ativar o botão
Search, o formulário simplesmente terá os dados apagados e será redefinido. Vá completar o formulário,
e volte em seguida.

Vamos examinar como o formulário usa a interação de seu teclado. Começando com seus primeiros
toques em `Tab`, o navegador destaca os itens de navegação para Voos,
Hotéis e Locação de Veículos. À medida que continua a pressionar `Tab`, você avança para o
grupo radiobutton, onde pode escolher entre Ida e Volta, Só Ida, ou
Várias Cidades usando as teclas de seta.

Continue pelos campos de nome e endereço, preenchendo as informações
necessárias. Quando chegar ao elemento de seleção de destino, você pode usar as
teclas de seta para escolher uma cidade, ou pode começar a digitar para completar automaticamente o campo.
Da mesma forma, nos campos de data, você pode usar as teclas de seta ou simplesmente digitar uma data.

Selecionar um tipo de assento também requer as setas do teclado, ou você pode digitar "w", "a"
ou "n" para saltar para uma opção de assento. Depois, você pode desativar as ofertas promocionais
padrão pressionando a barra de espaço enquanto a caixa de seleção está focada. Finalmente, foque
no botão Search e pressione `Enter` para enviar o formulário.

É muito útil interagir com um formulário usando apenas o teclado e não ter que
alternar para o mouse e voltar para completar uma tarefa. Como todos os elementos utilizados
no formulário são tags HTML nativas com foco implícito, o formulário funciona bem
com o teclado, e você não tem que escrever nenhum código para adicionar ou gerenciar
o comportamento de foco.



{# wf_devsite_translation #}
