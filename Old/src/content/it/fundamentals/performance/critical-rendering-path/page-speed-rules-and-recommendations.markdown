---
title: "Regole e consigli per PageSpeed"
description: "Regole di PageSpeed Insights nel contesto: a cosa prestare attenzione quando si ottimizza il percorso di rendering critico e perché."
updated_on: 2014-04-28
---
<p class="intro">
  Regole di PageSpeed Insights nel contesto: a cosa prestare attenzione quando si ottimizza il percorso di rendering critico e perché.
</p>

## Eliminazione del JavaScript con blocco del rendering e CSS

Per fornire il tempo più rapido per il primo rendering, dovrai ridurre e (ove possibile) eliminare il numero di risorse critiche sulla pagina, diminuire il numero di byte critici scaricati e ottimizzare la lunghezza del percorso critico.

## Ottimizzazione utilizzo JavaScript

Le risorse JavaScript bloccano il parser per impostazione predefinita, a meno che non siano indicate come _async_ o aggiunte tramite speciale snippet JavaScript. Il JavaScript con blocco parser forza il browser ad attendere CSSOM e a sospendere la costruzione di DOM, che a sua volta può ridurre in modo significativo il tempo per il primo rendering.

### **Preferire le risorse async di JavaScript**

Le risorse async sbloccano il parser del documento e consentono al browser di evitare il blocco di CSSOM prima dell'esecuzione dello script. Spesso, se lo script può essere reso async significa anche che non è essenziale per il primo rendering; considera dunque il caricamento degli script async dopo il rendering iniziale.

### **Rinvio analisi JavaScript**

Qualsiasi script non essenziale che non sia critico per la costruzione del contenuto visibile per il rendering iniziale deve essere rinviato per ridurre la quantità di lavoro che il browser deve effettuare per eseguire il rendering della pagina.

### **Evitare il JavaScript a esecuzione prolungata**

Il JavaScript a esecuzione prolungata impedisce al browser di costruire DOM, CSSOM e di eseguire il rendering della pagina. Di conseguenza, qualsiasi logica di inizializzazione e funzionalità che non è essenziale al primo rendering dovrà essere reinviata a un secondo momento. Se è necessario eseguire una lunga sequenza di inizializzazione, considera la suddivisione in numerose fasi così da consentire al browser di elaborare altri eventi intermedi.

## Ottimizzazione utilizzo CSS

CSS è necessario per la costruzione della struttura di rendering e spesso JavaScript bloccherà CSS durante la costruzione iniziale della pagina. Devi assicurarti che qualsiasi CSS non essenziale sia indicato come non critico (ad esempio query di stampa e di altri supporti) e che la quantità di CSS critico e il tempo per fornirlo siano il minimo possibile.

### **Inserimento CSS nell'intestazione del documento**

Tutte le risorse CSS devono essere specificate il prima possibile all'interno del documento HTML, così che il browser possa rilevare i tag `<link>` e inviare la richiesta per CSS il prima possibile.

### **Evitare importazioni CSS**

La direttiva dell'importazione CSS (@import) consente a un foglio di stile di importare le regole da un altro foglio di stile. Tuttavia, queste direttive devono essere evitate perché inseriscono altri roundtrip nel percorso critico: le risorse CSS importate sono individuate solo dopo che è stato ricevuto e analizzato il foglio di stile CSS con la regola @import.

### **CSS con blocco rendering inline**

Per prestazioni migliori, potresti voler considerare l'incorporamento del CSS critico direttamente nel documento HTML. Questo elimina roundtrip aggiuntivi nel percorso critico e, se eseguiti correttamente, possono essere utilizzati per fornire una lunghezza del percorso critico a 'unico roundtrip' dove solo l'HTML è una risorsa che blocca.



