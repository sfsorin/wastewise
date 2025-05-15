# Roadmap pentru Dezvoltarea WasteWise

Acest document prezintă planul detaliat de dezvoltare a aplicației WasteWise, cu priorități, termene și responsabilități.

## Faza 1: Fundația (Săptămânile 1-2)

### 1.1 Autentificare și Autorizare (Prioritate: ÎNALTĂ)

| Task  | Descriere                                                     | Termen      | Status       |
| ----- | ------------------------------------------------------------- | ----------- | ------------ |
| 1.1.1 | Finalizarea implementării autentificării cu JWT în backend    | Săptămâna 1 | În așteptare |
| 1.1.2 | Implementarea autorizării bazate pe roluri                    | Săptămâna 1 | În așteptare |
| 1.1.3 | Implementarea recuperării parolei                             | Săptămâna 1 | În așteptare |
| 1.1.4 | Testarea și validarea funcționalităților de autentificare     | Săptămâna 1 | În așteptare |
| 1.1.5 | Integrarea autentificării în frontend                         | Săptămâna 2 | În așteptare |
| 1.1.6 | Implementarea protecției rutelor bazate pe roluri în frontend | Săptămâna 2 | În așteptare |

### 1.2 Module Geografice (Prioritate: ÎNALTĂ)

| Task  | Descriere                                               | Termen      | Status       |
| ----- | ------------------------------------------------------- | ----------- | ------------ |
| 1.2.1 | Finalizarea implementării entităților pentru județe     | Săptămâna 1 | În așteptare |
| 1.2.2 | Finalizarea implementării entităților pentru localități | Săptămâna 1 | În așteptare |
| 1.2.3 | Finalizarea implementării entităților pentru UAT-uri    | Săptămâna 1 | În așteptare |
| 1.2.4 | Implementarea relațiilor între entitățile geografice    | Săptămâna 2 | În așteptare |
| 1.2.5 | Implementarea validării datelor geografice              | Săptămâna 2 | În așteptare |
| 1.2.6 | Testarea și validarea modulelor geografice              | Săptămâna 2 | În așteptare |

## Faza 2: Entități și Operațiuni (Săptămânile 3-4)

### 2.1 Module de Entități (Prioritate: MEDIE)

| Task  | Descriere                                                        | Termen      | Status       |
| ----- | ---------------------------------------------------------------- | ----------- | ------------ |
| 2.1.1 | Finalizarea implementării entităților pentru clienți             | Săptămâna 3 | În așteptare |
| 2.1.2 | Finalizarea implementării entităților pentru puncte de colectare | Săptămâna 3 | În așteptare |
| 2.1.3 | Implementarea relațiilor între entități și entitățile geografice | Săptămâna 3 | În așteptare |
| 2.1.4 | Implementarea validării datelor pentru entități                  | Săptămâna 3 | În așteptare |
| 2.1.5 | Testarea și validarea modulelor de entități                      | Săptămâna 3 | În așteptare |

### 2.2 Module Operaționale (Prioritate: MEDIE)

| Task  | Descriere                                              | Termen      | Status       |
| ----- | ------------------------------------------------------ | ----------- | ------------ |
| 2.2.1 | Implementarea modulelor pentru categorii de deșeuri    | Săptămâna 3 | În așteptare |
| 2.2.2 | Implementarea modulelor pentru servicii                | Săptămâna 4 | În așteptare |
| 2.2.3 | Implementarea modulelor pentru colectări               | Săptămâna 4 | În așteptare |
| 2.2.4 | Implementarea relațiilor între entitățile operaționale | Săptămâna 4 | În așteptare |
| 2.2.5 | Implementarea validării datelor operaționale           | Săptămâna 4 | În așteptare |
| 2.2.6 | Testarea și validarea modulelor operaționale           | Săptămâna 4 | În așteptare |

## Faza 3: Interfața Utilizator (Săptămânile 5-6)

### 3.1 Pagini pentru Module Geografice (Prioritate: MEDIE)

| Task  | Descriere                                                                    | Termen      | Status       |
| ----- | ---------------------------------------------------------------------------- | ----------- | ------------ |
| 3.1.1 | Implementarea paginilor pentru județe                                        | Săptămâna 5 | În așteptare |
| 3.1.2 | Implementarea paginilor pentru localități                                    | Săptămâna 5 | În așteptare |
| 3.1.3 | Implementarea paginilor pentru UAT-uri                                       | Săptămâna 5 | În așteptare |
| 3.1.4 | Implementarea formularelor pentru crearea și editarea entităților geografice | Săptămâna 5 | În așteptare |
| 3.1.5 | Implementarea vizualizărilor pentru relațiile între entitățile geografice    | Săptămâna 5 | În așteptare |
| 3.1.6 | Testarea și validarea paginilor pentru module geografice                     | Săptămâna 5 | În așteptare |

### 3.2 Pagini pentru Entități (Prioritate: MEDIE)

| Task  | Descriere                                                         | Termen      | Status       |
| ----- | ----------------------------------------------------------------- | ----------- | ------------ |
| 3.2.1 | Implementarea paginilor pentru clienți                            | Săptămâna 6 | În așteptare |
| 3.2.2 | Implementarea paginilor pentru puncte de colectare                | Săptămâna 6 | În așteptare |
| 3.2.3 | Implementarea formularelor pentru crearea și editarea entităților | Săptămâna 6 | În așteptare |
| 3.2.4 | Implementarea vizualizărilor pentru relațiile între entități      | Săptămâna 6 | În așteptare |
| 3.2.5 | Testarea și validarea paginilor pentru entități                   | Săptămâna 6 | În așteptare |

## Faza 4: Infrastructură și Testare (Săptămânile 7-8)

### 4.1 Configurarea CI/CD (Prioritate: ÎNALTĂ)

| Task  | Descriere                                                        | Termen      | Status       |
| ----- | ---------------------------------------------------------------- | ----------- | ------------ |
| 4.1.1 | Configurarea GitHub Actions pentru a rula testele automat        | Săptămâna 7 | În așteptare |
| 4.1.2 | Configurarea deployment automat pentru mediul de dezvoltare      | Săptămâna 7 | În așteptare |
| 4.1.3 | Configurarea deployment automat pentru mediul de producție       | Săptămâna 7 | În așteptare |
| 4.1.4 | Configurarea verificării calității codului (linting, formatting) | Săptămâna 7 | În așteptare |
| 4.1.5 | Testarea și validarea pipeline-urilor CI/CD                      | Săptămâna 7 | În așteptare |

### 4.2 Îmbunătățirea Dockerizării (Prioritate: MEDIE)

| Task  | Descriere                                                      | Termen      | Status       |
| ----- | -------------------------------------------------------------- | ----------- | ------------ |
| 4.2.1 | Actualizarea Dockerfile-urilor pentru backend                  | Săptămâna 8 | În așteptare |
| 4.2.2 | Actualizarea Dockerfile-urilor pentru frontend                 | Săptămâna 8 | În așteptare |
| 4.2.3 | Actualizarea Dockerfile-urilor pentru ml-service               | Săptămâna 8 | În așteptare |
| 4.2.4 | Optimizarea imaginilor Docker pentru performanță și securitate | Săptămâna 8 | În așteptare |
| 4.2.5 | Configurarea volume-urilor pentru persistența datelor          | Săptămâna 8 | În așteptare |
| 4.2.6 | Testarea și validarea configurației Docker                     | Săptămâna 8 | În așteptare |

## Faza 5: Documentație și Optimizare (Săptămânile 9-10)

### 5.1 Documentație (Prioritate: MEDIE)

| Task  | Descriere                                                           | Termen      | Status       |
| ----- | ------------------------------------------------------------------- | ----------- | ------------ |
| 5.1.1 | Actualizarea documentației Swagger pentru toate endpoint-urile      | Săptămâna 9 | În așteptare |
| 5.1.2 | Adăugarea exemplelor de request și response pentru fiecare endpoint | Săptămâna 9 | În așteptare |
| 5.1.3 | Documentarea autorizării și autentificării                          | Săptămâna 9 | În așteptare |
| 5.1.4 | Actualizarea documentației pentru structura proiectului             | Săptămâna 9 | În așteptare |
| 5.1.5 | Documentarea arhitecturii aplicației                                | Săptămâna 9 | În așteptare |
| 5.1.6 | Documentarea fluxurilor de date și proceselor de business           | Săptămâna 9 | În așteptare |

### 5.2 Testare și Optimizare (Prioritate: MEDIE)

| Task  | Descriere                                              | Termen       | Status       |
| ----- | ------------------------------------------------------ | ------------ | ------------ |
| 5.2.1 | Realizarea testelor de performanță pentru backend      | Săptămâna 10 | În așteptare |
| 5.2.2 | Realizarea testelor de performanță pentru frontend     | Săptămâna 10 | În așteptare |
| 5.2.3 | Realizarea testelor de securitate pentru backend       | Săptămâna 10 | În așteptare |
| 5.2.4 | Verificarea vulnerabilităților cunoscute în dependențe | Săptămâna 10 | În așteptare |
| 5.2.5 | Optimizarea performanței backend-ului și frontend-ului | Săptămâna 10 | În așteptare |
| 5.2.6 | Optimizarea consumului de resurse                      | Săptămâna 10 | În așteptare |

## Priorități Imediate (Săptămâna 1)

1. **Implementarea autentificării cu JWT în backend** - Aceasta este fundația pentru toate celelalte funcționalități care necesită autentificare și autorizare.
2. **Implementarea autorizării bazate pe roluri** - Esențială pentru a controla accesul la diferite funcționalități ale aplicației.
3. **Implementarea recuperării parolei** - Funcționalitate critică pentru experiența utilizatorului.
4. **Finalizarea implementării entităților geografice** - Acestea sunt fundamentale pentru restul aplicației, deoarece multe alte entități depind de ele.

## Dependențe și Riscuri

### Dependențe

- Implementarea autentificării trebuie finalizată înainte de a începe implementarea autorizării bazate pe roluri.
- Implementarea entităților geografice trebuie finalizată înainte de a începe implementarea relațiilor cu alte entități.
- Implementarea backend-ului pentru fiecare modul trebuie finalizată înainte de a începe implementarea frontend-ului corespunzător.

### Riscuri

- Întârzieri în implementarea autentificării pot afecta toate celelalte funcționalități care depind de aceasta.
- Probleme de performanță cu interogările complexe pentru relațiile între entități.
- Dificultăți în implementarea validării datelor pentru entitățile cu relații complexe.

## Monitorizarea Progresului

Progresul va fi monitorizat prin:

1. Actualizarea săptămânală a statusului fiecărui task în acest document.
2. Întâlniri săptămânale pentru a discuta progresul și a rezolva blocajele.
3. Revizuirea codului pentru fiecare task finalizat.
4. Testarea continuă a funcționalităților implementate.
