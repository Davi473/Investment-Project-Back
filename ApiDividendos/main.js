const yf = require('yahoo-finance2').default;

function parseData(dataStr) {
    const match = dataStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!match) {
        throw new Error("Formato inválido.");
    }
    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10) - 1;
    const ano = parseInt(match[3], 10);
    const data = new Date(Date.UTC(ano, mes, dia));
    if (data.getUTCFullYear() !== ano || data.getUTCMonth() !== mes || data.getUTCDate() !== dia) {
        throw new Error("Data inválida.");
    }
    return data;
}

async function obterDividendos() {
    let ativo = "VALE";
    dataInicialDate = parseData("10/10/2024".trim());
    try {
        // Formato YYYY-MM-DD para a API
        const dataInicialFormatada = dataInicialDate.toISOString().split('T')[0];
        // 🌟 CORREÇÃO APLICADA AQUI: O valor 'div' foi trocado pelo valor válido 'dividends'
        const acoes = await yf.historical(ativo, {
            events: 'dividends', // CORREÇÃO: Usar 'dividends'
            period1: dataInicialFormatada // Passa a data inicial para a API filtrar
        });
        if (!acoes || acoes.length === 0) {
            console.log("⚠️ Nenhum provento (dividendo/JCP) encontrado para este ativo.");
            rl.close();
            return;
        }
        // --- 4. Processamento e Filtragem ---
        const proventos = acoes
            .filter(acao => acao.dividends > 0)
            // Ordena pela data mais recente no topo (decrescente)
            .sort((a, b) => b.date.getTime() - a.date.getTime());
        if (proventos.length === 0) {
            console.log("📭 Nenhum provento (dividendo/JCP) pago a partir dessa data.");
            return;
        }
        // --- 5. Exibição dos Resultados ---
        console.log("💰 Proventos encontrados:");
        for (const provento of proventos) {
            const dataProvento = provento.date;
            // Formatar a data para DD/MM/AAAA usando UTC
            const dataFormatada = dataProvento.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'UTC'
            });
            // O valor do provento é o campo 'dividends'
            const valorFormatado = provento.dividends.toFixed(2);
            console.log(`📅 ${dataFormatada} — R$ ${valorFormatado}`);
        }
    } catch (error) {
        // Trata erro de ativo não encontrado ou de conexão
        if (error.code === 'ENOTFOUND' || (error.message && error.message.includes('404'))) {
            console.log(`⚠️ Ativo não encontrado. Verifique o código: ${ativo}`);
        } else {
            // Exibe a mensagem de erro detalhada
            console.log(`❌ Ocorreu um erro inesperado: ${error.message}`);
        }
    } 
}

obterDividendos();