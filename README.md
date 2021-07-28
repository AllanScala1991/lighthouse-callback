# LIGHTHOUSE CALLBACK

## Como instalar:
    - yarn add ou npm install lighthouse-callback

## Como utilizar:
    - Instale o Cypress
    - Instale o cypress-audit
    
    Acesse o seguinte arquivo: "cypress/plugins/index.js",
    faça o import do cypress audit e do lighthouse-calback,
    confome abaixo:
    
    const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');
    const { lighthouseCallback } = require('lighthouse-callback');

    module.exports = (on, config) => {
        on('before:browser:launch', (browser, launchOptions) => {

            prepareAudit(launchOptions); 
            if (browser.name === 'chrome' && browser.isHeadless) {
            launchOptions.args.push('--disable-gpu');
            return launchOptions;
            }
        });

        on('task', {
            lighthouse: lighthouse((itens) => new lighthouseCallback(itens))
        });
    };

### Nos scripts .spec dentro da pasta integration o lighthouse é executado através do comando 
### cy.lighthouse(options), passando as opções do teste via parâmetro.
    
