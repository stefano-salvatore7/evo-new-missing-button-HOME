// ==UserScript==
// @name          EVO - Bottone Timbrature Mancanti (HOME)
// @namespace     https://unibo.it/
// @version       1.1
// @description   Aggiunge il bottone "Timb. Mancanti" accanto a "TeleLavoro" (o al posto suo se assente) nel titolo "Timbrature di giornata" nella Home
// @author        Stefano
// @match         https://personale-unibo.hrgpi.it/*
// @icon          https://www.unibo.it/favicon.ico
// @grant         none
// @run-at        document-end
// ==/UserScript==

(function () {
    'use strict';

    /**
     * Crea e inserisce il bottone "Timb. Mancanti"
     */
    function addTimbMacantiButton() {
        // Trova il titolo "Timbrature di giornata"
        const h4Elements = document.querySelectorAll('h4');
        let clockingsTitle = null;

        for (const h4 of h4Elements) {
            if (h4.textContent.includes('Timbrature di giornata')) {
                clockingsTitle = h4;
                break;
            }
        }

        if (!clockingsTitle) {
            console.log('Titolo "Timbrature di giornata" non trovato');
            return;
        }

        // Verifica che il bottone non sia già stato aggiunto
        if (clockingsTitle.querySelector('#TimbMacantiBtn')) {
            console.log('Bottone già presente');
            return;
        }

        // Recupera i dati dal form Dashboard esistente
        const dashboardForm = document.querySelector('form[name="Dashboard"]');
        if (!dashboardForm) {
            console.log('Form Dashboard non trovato');
            return;
        }

        // Crea il form nascosto necessario per il submit
        const form = document.createElement('form');
        form.name = 'MissingClockingsList';
        form.method = 'POST';
        form.action = '/jt-employee-portal/movimentimenu.do';
        form.style.display = 'inline-block';
        form.style.marginLeft = '5px';

        // Copia i campi hidden necessari dal Dashboard
        const fieldsToClone = ['jwtToken', 'theme', 'matricola', 'fullname', 'selectedRuolo', 'roleDescr'];
        fieldsToClone.forEach(fieldName => {
            const originalField = dashboardForm.querySelector(`input[name="${fieldName}"]`);
            if (originalField) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = fieldName;
                hiddenInput.value = originalField.value;
                form.appendChild(hiddenInput);
            }
        });

        // Campo origin
        const originInput = document.createElement('input');
        originInput.type = 'hidden';
        originInput.name = 'origin';
        originInput.value = 'dashboard.do';
        form.appendChild(originInput);

        // Crea il bottone "Timb. Mancanti"
        const button = document.createElement('button');
        button.id = 'TimbMacantiBtn';
        button.type = 'submit';
        button.className = 'bottone bottone-plus';
        button.name = 'event_Create';
        button.value = 'Nuovo';
        button.setAttribute('data-bs-toggle', 'tooltip');
        button.setAttribute('data-bs-custom-class', 'custom-tooltip');
        button.setAttribute('data-bs-title', 'Timbratura Manuale');
        button.style.padding = '0.4rem 0.8rem';
        button.style.fontSize = '0.9rem';
        button.style.marginLeft = '0.5rem';

        // Aggiungi l'icona e il testo
        button.innerHTML = `
            <i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">add</i>
            <i class="material-symbols-outlined align-middle" style="font-size: 1.2rem;">touch_app</i>
            <span class="evo-btn-label-timb-mancanti">&nbsp;Manuale</span>
        `;

        form.appendChild(button);

        // Controlla se il bottone TeleLavoro è già presente
        const teleLavoroForm = clockingsTitle.querySelector('form[name="OnlineClockingRequestList"]');

        if (teleLavoroForm) {
            // TeleLavoro presente → inserisci dopo di lui
            teleLavoroForm.insertAdjacentElement('afterend', form);
            console.log('Bottone "Timb. Mancanti" aggiunto accanto a TeleLavoro');
        } else {
            // TeleLavoro NON presente → ripetere la logica di TeleLavoro per preparare l'h4

            // Trasforma l'h4 in un flex container (se non lo è già)
            clockingsTitle.style.display = 'flex';
            clockingsTitle.style.alignItems = 'center';
            clockingsTitle.style.justifyContent = 'space-between';
            clockingsTitle.style.width = '100%';

            // Wrappa il contenuto esistente in uno span (solo se non è già stato fatto)
            if (!clockingsTitle.querySelector('span > .material-symbols-outlined') && 
                !clockingsTitle.querySelector('span > span')) {
                const titleContent = clockingsTitle.innerHTML;
                clockingsTitle.innerHTML = '';

                const titleSpan = document.createElement('span');
                titleSpan.innerHTML = titleContent;
                clockingsTitle.appendChild(titleSpan);
            }

            // Aggiungi il form con il bottone alla fine
            clockingsTitle.appendChild(form);
            console.log('Bottone "Timb. Mancanti" aggiunto al posto di TeleLavoro');
        }

        // Inizializza il tooltip di Bootstrap se disponibile
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            new bootstrap.Tooltip(button);
        }
    }

    // Aspetta che la pagina sia completamente caricata
    // Aggiunge un piccolo delay extra per dare tempo allo script TeleLavoro di eseguirsi prima
    const waitForPageElements = setInterval(() => {
        const isDashboardPage = document.querySelector('form[name="Dashboard"]') !== null;
        const clockingsCard = document.querySelector('.card h4');
        const isClockingsCard = clockingsCard && clockingsCard.textContent.includes('Timbrature di giornata');

        if (isDashboardPage && isClockingsCard) {
            clearInterval(waitForPageElements);
            // Attendi 1 secondo extra per assicurarti che TeleLavoro sia già stato inserito
            setTimeout(() => {
                addTimbMacantiButton();
                console.log('Script Bottone Timbrature Mancanti caricato');
            }, 1000);
        }
    }, 500);

    // Timeout di sicurezza dopo 15 secondi
    setTimeout(() => {
        clearInterval(waitForPageElements);
    }, 15000);

})();
