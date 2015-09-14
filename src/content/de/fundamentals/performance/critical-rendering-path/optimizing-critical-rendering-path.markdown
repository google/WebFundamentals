---
title: "Kritischen Rendering-Pfad optimieren"
description: "Im Sinne der kürzestmöglichen Zeit bis zum ersten Rendern sind drei Variablen zu optimieren. Konkret muss die Anzahl der kritischen Ressourcen, die Zahl der kritischen Bytes und die Länge des kritischen Pfads minimiert werden."
updated_on: 2014-04-28
---

Im Sinne der kürzestmöglichen Zeit bis zum ersten Rendern sind drei Variablen zu optimieren:

* **Minimieren Sie die Anzahl der kritischen Ressourcen.**
* **Minimieren Sie die Anzahl der kritischen Bytes.**
* **Minimieren Sie die Länge des kritischen Pfads.**

Kritische Ressourcen sind Ressourcen, die das erste Rendern der Seite blockieren könnten. Je weniger Ressourcen sich auf der Seite befinden, desto weniger aufwendig ist es für den Browser, Inhalte auf dem Bildschirm darzustellen, und desto weniger Konflikte treten zwischen der CPU und anderen Ressourcen auf.

Außerdem kann der Browser umso schneller zur Verarbeitung der Inhalte und zu ihrer Darstellung auf dem Bildschirm übergehen, je weniger kritische Bytes herunterzuladen sind. Zur Reduzierung der Anzahl der Bytes können wir die Zahl der Ressourcen verringern, d. h., eliminieren oder nicht-kritisch machen, und zudem die Übertragungsmenge durch Komprimieren und Optimieren der einzelnen Ressourcen minimieren.

Die kritische Pfadlänge schließlich ist eine Funktion des Abhängigkeitsgraphen zwischen allen kritischen Ressourcen, die für die Seite und ihre Bytemengen erforderlich sind. Manche Ressourcen können nur heruntergeladen werden, nachdem eine vorherige Ressource verarbeitet wurde, und je größer die Ressource ist, umso mehr Paketumläufe werden zum Herunterladen benötigt.

In anderen Worten: Die Anzahl der Ressourcen, ihre Bytemenge und die Länge des kritischen Pfads hängen miteinander zusammen, können aber separat bearbeitet werden. So können Sie möglicherweise die Anzahl der kritischen Ressourcen nicht reduzieren und den kritischen Pfad nicht verkürzen, aber die Verringerung der Zahl der kritischen Bytes wäre dennoch eine wichtige Optimierungsoption und dies gilt auch für die anderen Kombinationen.

**Die Abfolge der Schritte zur Optimierung des kritischen Rendering-Pfads:**

1. Analysieren und beschreiben Sie den kritischen Pfad: Anzahl der Ressourcen, Bytes, Länge.
2. Minimieren Sie die Anzahl der kritischen Ressourcen: eliminieren, Download zurückstellen, als asynchron kennzeichnen usw.
3. Optimieren Sie die Reihenfolge, in der die übrigen kritischen Ressourcen geladen werden: Alle kritischen Inhalte sollen so frühzeitig wie möglich heruntergeladen werden, um die Länge des kritischen Pfads zu verkürzen.
4. Optimieren Sie die Anzahl der kritischen Bytes, um die Download-Zeit, d. h. die Zahl der Paketumläufe, zu verringern.



