---
title: "Regras e recomendações de PageSpeed"
description: "Regras do PageSpeed Insights em contexto: em que prestar atenção ao otimizar o caminho de processamento essencial e por quê."
updated_on: 2014-04-28
---
<p class="intro">
  Regras do PageSpeed Insights em contexto: em que prestar atenção ao otimizar o caminho de processamento essencial e por quê.
</p>

## Eliminar JavaScript e CSS que bloqueiam a renderização

Para que a primeira renderização aconteça o mais rápido possível, é necessário minimizar e (quando possível) eliminar o número de recursos essenciais da página, minimizar o número de bytes essenciais transferidos e otimizar a extensão do caminho essencial.

## Otimizar o uso de JavaScript

Os recursos de JavaScript bloqueiam o analisador por padrão, a menos que sejam marcados como _async_ ou adicionados por meio de um snippet especial de JavaScript. O JavaScript que bloqueia o analisador força o navegador a esperar pelo CSSOM, e pausa a construção do DOM, que por sua vez pode atrasar significativamente a primeira renderização.

### **Prefira recursos JavaScript assíncronos**

Os recursos assíncronos desbloqueiam o analisador do documento e permitem que o navegador evite o bloqueio no CSSOM antes da execução do script. Muitas vezes, se o script puder se tornar assíncrono, isso também significa que ele não é essencial para a primeira renderização. Considere carregar os scripts assíncronos depois da primeira renderização.

### **Adie a análise do JavaScript**

Todos os scripts não essenciais que não sejam críticos para a construção do conteúdo visível para a renderização inicial devem ser adiados para minimizar o trabalho do navegador para renderizar a página.

### **Evite executar JavaScript por muito tempo**

A execução de JavaScript por muito tempo impede que o navegador construa o DOM, o CSSOM e que faça a renderização da página. Como resultado, qualquer lógica de inicialização e funcionalidade que não seja essencial para a primeira renderização deve ser adiada para mais tarde. Se for necessário executar uma longa sequência de inicialização, considere dividi-la em várias etapas para que o navegador processe outros eventos nesse meio-tempo.

## Otimizar o uso de CSS

O CSS é necessário para construir a árvore de renderização, e muitas vezes o JavaScript bloqueia o CSS durante a construção da página. Todos os CSS que não sejam essenciais devem ser marcados como não críticos (por exemplo, imprimir e outras consultas de mídia). Além disso, o número de CSS críticos e o tempo de entrega devem ser os menores possíveis.

### **Coloque o CSS no cabeçalho do documento**

Todos os recursos de CSS devem ser especificados o mais cedo possível dentro do documento HTML, de forma que o navegador possa detectar as `<link>` tags e enviar a solicitação ao CSS o mais rápido possível.

### **Evite importações de CSS**

A diretiva importar CSS (@import) permite que uma folha de estilos importe regras de outro arquivo de folhas de estilos. No entanto, essas diretivas devem ser evitadas porque introduzem idas e voltas adicionais no caminho essencial: os recursos de CSS importados só são detectados depois que a folha de estilos do CS com a própria regra @import é recebida e analisada.

### **CSS bloqueador de renderização in-line**

Para obter o melhor desempenho, pode ser necessário considerar embutir o CSS crítico diretamente no documento HTML. Essa operação elimina idas e voltas adicionais no caminho essencial e, se feita corretamente, pode ser usada para proporcionar uma extensão de caminho essencial com `uma ida e volta`, onde apenas o HTML é um recurso bloqueador.



