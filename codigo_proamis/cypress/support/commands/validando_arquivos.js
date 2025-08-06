    import { normalizarCampo } from '../utils.js';

    Cypress.Commands.add('validarArquivosExportados', (caminhoTxt, caminhoPdf, caminhoExcel, dadosEsperados) => {
    const camposEsperadosNormalizados = Array.isArray(dadosEsperados)
        ? dadosEsperados.flat().map(normalizarCampo)
        : [dadosEsperados].map(normalizarCampo);

    // TXT
    if (caminhoTxt) {
        cy.task('readTXT', caminhoTxt).then((txtText) => {
        const textoNormalizado = normalizarCampo(txtText);
        camposEsperadosNormalizados.forEach((campo) => {
            expect(textoNormalizado).to.include(campo);
        });
        });
    }

    // PDF
    if (caminhoPdf) {
        cy.task('readPDF', caminhoPdf).then((pdfText) => {
            const textoNormalizado = normalizarCampo(pdfText);
            camposEsperadosNormalizados.forEach((campo) => {
        expect(textoNormalizado).to.include(campo);
        });
    }, (err) => {
        cy.log('Erro ao ler PDF:', err.message);
        throw err;
    });
}


    // Excel
    if (caminhoExcel) {
        cy.task('readExcel', caminhoExcel).then((excelData) => {
        const textoNormalizado = normalizarCampo(excelData.flat().join(' '));
        camposEsperadosNormalizados.forEach((campo) => {
            expect(textoNormalizado).to.include(campo);
        });
        });
    }

    // Cleanup
    cy.task('deleteDownloads');
    });
