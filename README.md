# EVO - Bottone Timbratura Manuale (HOME)

Questo script Tampermonkey/Greasemonkey è progettato per il sistema di gestione delle presenze EVO (usato su `https://personale-unibo.hrgpi.it/`). Aggiunge un bottone **"+ 👆 Manuale"** nella card **"Timbrature di giornata"** nella pagina HOME/Dashboard, permettendo di accedere rapidamente alla creazione di una nuova timbratura manuale senza dover navigare attraverso il menu laterale.

**(Versione Script: 1.0)**

## Caratteristiche

* **Accesso Rapido alla Timbratura Manuale:**
    * Aggiunge un bottone **"Manuale"** direttamente nella pagina HOME, nella riga del titolo "Timbrature di giornata".
    * Elimina la necessità di cliccare sulla sidebar → "Le mie presenze" → "Timbrature mancanti" → bottone "Nuovo".
    * **Un solo click** per accedere alla pagina di creazione di una nuova timbratura manuale.
* **Posizionamento Intelligente e Condizionale:**
    * Se lo script **"EVO - Bottone Marcatempo Virtuale (HOME)"** (TeleLavoro) è presente, il bottone "Manuale" viene inserito **accanto a lui**, nella stessa riga.
    * Se lo script TeleLavoro **non è presente**, il bottone "Manuale" viene inserito **al suo posto**, nell'unica posizione disponibile.
    * Un delay di 1 secondo garantisce che lo script TeleLavoro abbia il tempo di eseguirsi prima, evitando conflitti di posizionamento.
* **Design Integrato:**
    * Il bottone utilizza lo **stesso stile** dei bottoni nativi del portale EVO (classe `bottone bottone-plus`).
    * Icone chiare e distinte per differenziare i bottoni:
        * **TeleLavoro**: icona `home_work` (casa + ufficio)
        * **Manuale**: icona `touch_app` (dito che tocca uno schermo, come se timbri a mano)
    * Entrambi i bottoni hanno il prefisso **"+"** (`add`) per indicare la creazione di un nuovo elemento.
    * Tooltip **"Timbratura Manuale"** al passaggio del mouse (o tenendo premuto su mobile).
* **Comportamento su Mobile:**
    * Su smartphone il testo **"Manuale"** viene nascosto automaticamente, restando visibile solo le icone **+ 👆**.
    * Questo evita che i bottoni vadano a capo nel titolo per mancanza di spazio.
    * Il testo resta sempre leggibile nel **tooltip**.
    * La gestione del testo su mobile è affidata al CSS iniettato dallo script TeleLavoro (`evo-btn-mobile-css`). Se TeleLavoro non è presente, il testo resta visibile anche su mobile.
* **Funzionamento Nativo:**
    * Crea un form nascosto con tutti i parametri necessari (jwtToken, matricola, ruolo, ecc.).
    * Copia automaticamente i dati dal form Dashboard esistente.
    * Effettua il submit corretto verso la pagina delle Timbrature Mancanti (`anomalieTimbratureElenco.do`).
    * Si comporta esattamente come il bottone "Nuovo" originale presente nella pagina dedicata.
* **Compatibilità con la Dashboard HOME:**
    * Lo script funziona esclusivamente sulla **pagina Dashboard/Home** del portale EVO.
    * Si attiva automaticamente quando rileva la presenza della card "Timbrature di giornata".
    * Non interferisce con altre pagine del portale.
* **Prevenzione Duplicati:**
    * Controlla che il bottone non venga aggiunto più volte.
    * Gestisce correttamente il caricamento asincrono della pagina.
    * Timeout di sicurezza dopo 15 secondi per evitare loop infiniti.

## Installazione su Smartphone Android

Per utilizzare questo script su smartphone, è necessario installare Firefox per Android e Tampermonkey. Ecco la procedura completa:

### 1. Installa Firefox per Android

Se non l'hai già installato:

* Apri il **Google Play Store**
* Cerca **"Firefox Browser"**
* Installa l'app ufficiale di Mozilla Firefox

### 2. Abilita le Estensioni su Firefox Android

Firefox per Android supporta le estensioni, ma devi prima abilitarle:

1. Apri **Firefox** sul tuo smartphone
2. Tocca il menu (tre puntini in basso a destra)
3. Vai in **"Impostazioni"**
4. Scorri fino in fondo e tocca **"Informazioni su Firefox"**
5. **Tocca ripetutamente (5 volte) sul logo di Firefox** che appare nella pagina
6. Vedrai comparire un messaggio che conferma l'attivazione della modalità debug
7. Torna indietro alle Impostazioni
8. Ora vedrai apparire una nuova voce **"Componenti aggiuntivi"** nel menu
9. Tocca **"Componenti aggiuntivi"**
10. Tocca **"Gestione componenti aggiuntivi"**

### 3. Installa Tampermonkey

1. Nella sezione "Gestione componenti aggiuntivi" che hai appena aperto
2. Cerca **"Tampermonkey"** nella barra di ricerca
3. Tocca su **Tampermonkey** nei risultati
4. Tocca **"+ Aggiungi"** per installarlo
5. Conferma l'installazione toccando **"Aggiungi"** nel popup

### 4. Installazione dello Script per Aggiornamenti Automatici

Ora puoi installare lo script:

[**Clicca qui per installare/aggiornare EVO - Bottone Timbratura Manuale (HOME)**](https://github.com/stefano-salvatore7/evo-timb-manuale-home/raw/refs/heads/main/timb-mancanti-home.user.js)

* Dopo aver cliccato sul link dal tuo smartphone Firefox, Tampermonkey ti mostrerà il codice dello script e ti chiederà di **"Installa"** (se è la prima volta) o **"Aggiorna"** (se stai aggiornando una versione precedente). Conferma l'azione toccando il pulsante **"Installa"**.

### 5. Verifica Aggiornamenti Automatici

Una volta installato tramite il link RAW, Tampermonkey dovrebbe gestire automaticamente gli aggiornamenti:

* Tocca l'icona di Tampermonkey nella barra degli strumenti di Firefox
* Seleziona **"Dashboard"**
* Trova "EVO - Bottone Timbrature Mancanti (HOME)" nell'elenco
* Verifica che la casella "Controlla aggiornamenti" sia spuntata
* Tampermonkey controllerà periodicamente il repository per nuove versioni

## Installazione su PC

Per installare lo script su desktop/laptop, segui questi passaggi:

### 1. Installare l'estensione [Tampermonkey](https://www.tampermonkey.net/)

Se non l'hai già fatto, installa l'estensione Tampermonkey nel tuo browser:

* **[Tampermonkey per Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**
* **[Tampermonkey per Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)**
* **[Tampermonkey per Firefox](https://addons.mozilla.org/it/firefox/addon/tampermonkey/)** (o Greasemonkey se preferisci)

### 2. Configurazione del Browser (Importante per l'esecuzione)

Per consentire l'esecuzione corretta dello script, potrebbero essere necessari alcuni passaggi di configurazione nel tuo browser:

#### Per Google Chrome:

1.  Apri Chrome e digita `chrome://extensions/` nella barra degli indirizzi, poi premi Invio.
2.  In alto a destra, attiva la **"Modalità sviluppatore"** (interruttore).
3.  Individua Tampermonkey nell'elenco delle estensioni.
4.  Clicca su **"Dettagli"** sotto Tampermonkey.
5.  Assicurati che l'opzione **"Consenti script utente"** sia attiva.
6.  Assicurati che l'opzione **"Consenti l'accesso agli URL del file"** sia attiva.

#### Per Microsoft Edge:

1.  Apri Edge e digita `edge://extensions/` nella barra degli indirizzi, poi premi Invio.
2.  In alto a destra, attiva la **"Modalità sviluppatore"** (interruttore). Potrebbe comparire un avviso di sicurezza nella parte superiore del browser; è normale quando si usa questa modalità.
3.  Individua Tampermonkey nell'elenco delle estensioni.
4.  Clicca su **"Dettagli"** sotto Tampermonkey.
5.  Assicurati che l'opzione **"Consenti estensioni da altri archivi"** sia attiva.
6.  **Assicurati che l'opzione "Consenti l'accesso agli URL del file" sia attiva.**

### 3. Installazione dello Script per Aggiornamenti Automatici (PC)

Ora che il tuo browser è configurato, puoi installare lo script:

[**Clicca qui per installare/aggiornare EVO - Bottone Timbratura Manuale (HOME)**](https://github.com/stefano-salvatore7/evo-new-missing-button-HOME/raw/refs/heads/main/new-missing-home.user.js)

* Dopo aver cliccato, Tampermonkey (o Greasemonkey) ti mostrerà il codice dello script e ti chiederà di **"Installa"** (se è la prima volta) o **"Aggiorna"** (se stai aggiornando una versione precedente). Conferma l'azione.

### 4. Verifica Aggiornamenti Automatici (Tampermonkey - PC)

Una volta installato tramite il link RAW, Tampermonkey dovrebbe gestire automaticamente gli aggiornamenti. Puoi verificare le impostazioni:

* Clicca sull'icona di Tampermonkey nel tuo browser e seleziona **"Dashboard"**.
* Trova "EVO - Bottone Timbrature Mancanti (HOME)" nell'elenco.
* Verifica che la casella "Controlla aggiornamenti" sia spuntata. L'URL di aggiornamento dovrebbe essere corretto (quello RAW che hai usato per l'installazione).
* Tampermonkey controllerà periodicamente il repository per nuove versioni e ti notificherà se è disponibile un aggiornamento. Puoi anche forzare un controllo cliccando sull'icona delle frecce circolari (Aggiorna) accanto al nome dello script.

## Utilizzo

Una volta installato, lo script si attiverà automaticamente quando visiterai la pagina Dashboard/Home di EVO su `https://personale-unibo.hrgpi.it/*`.

1.  Naviga alla **pagina Dashboard/Home** (quella con la card "Timbrature di giornata").
2.  Vedrai apparire il bottone **"+ 👆 Manuale"** nel titolo della card, accanto al bottone TeleLavoro (se presente).
3.  **Clicca sul bottone "Manuale"** per accedere rapidamente alla pagina di creazione di una nuova timbratura manuale.
4.  Verrai reindirizzato alla pagina dove potrai inserire la timbratura a mano.

## Compatibilità Script

Questo script è stato testato e funziona perfettamente insieme a:

* **[EVO Exit Time Calculator (HOME)](https://github.com/stefano-salvatore7/evo-exit-time-calc-home)** - v2.1 o superiore
* **[EVO Responsive Sidebar (HOME)](https://github.com/stefano-salvatore7/evo-responsive-sidebar-HOME)** - v2.4 o superiore
* **[EVO - Bottone Marcatempo Virtuale (HOME)](https://github.com/stefano-salvatore7/evo-new-virtual-button-HOME)** - v1.4 o superiore ⚠️ **Raccomandato**: per avere la gestione completa del testo su mobile (solo icone) e il posizionamento corretto dei due bottoni affiancati

Gli script sono completamente indipendenti e non entrano in conflitto tra loro.

## Contributi

Se desideri contribuire a migliorare questo script, sentiti libero di aprire una "Issue" o proporre una "Pull Request" sul repository GitHub.

## Log delle Versioni

### Versione 1.0 (Gennaio 2026)
* Release iniziale
* Aggiunto bottone "+ 👆 Manuale" nella card "Timbrature di giornata"
* Posizionamento condizionale: accanto a TeleLavoro se presente, al suo posto se assente
* Delay di 1 secondo per compatibilità con lo script TeleLavoro
* Icona `touch_app` per indicare la timbratura a mano
* Tooltip "Timbratura Manuale"
* Prevenzione duplicati e timeout di sicurezza
* Testo nascosto su mobile (solo icone), gestito dal CSS dello script TeleLavoro

---

**Nota:** Questo script è progettato per funzionare sulla pagina HOME/Dashboard. Non modifica il comportamento della pagina "Timbrature mancanti" dedicata, ma fornisce solo un accesso rapido ad essa.

**Link Utili:**
* [Repository GitHub](https://github.com/stefano-salvatore7/evo-timb-manuale-home)
* [Segnala un problema](https://github.com/stefano-salvatore7/evo-timb-manuale-home/issues)
* [Portale EVO UniBo](https://personale-unibo.hrgpi.it/)
