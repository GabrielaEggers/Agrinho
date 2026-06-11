// Configuração do Gráfico usando Chart.js
const ctx = document.getElementById('meuGrafico').getContext('2d');
const meuGrafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Umidade do Solo (%)',
            data: [62, 65, 58, 55, 68, 70, 65],
            borderColor: '#52b788',
            backgroundColor: 'rgba(82, 183, 136, 0.1)',
            fill: true,
            tension: 0.3
        }, {
            label: 'Água Utilizada (Litros)',
            data: [140, 120, 150, 170, 90, 80, 110],
            borderColor: '#3a86c8',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        }
    }
});

// Função para simular sensores do campo e lógica de equilíbrio sustentável
function simularSensores() {
    // Gera valores aleatórios realistas
    const umidadeSolo = Math.floor(Math.random() * (75 - 45 + 1)) + 45; 
    let consumoAgua = 120;
    let score = 90;
    let recomendacao = "";

    // Lógica do Equilíbrio entre Produção e Preservação
    if (umidadeSolo < 50) {
        // Se o solo secar, precisa irrigar, mas sem desperdício
        consumoAgua = 180;
        score = 85; // Cai um pouco o score por estresse hídrico
        recomendacao = "⚠️ Solo seco detectado. Irrigação ativada no modo noturno para evitar a evaporação rápida da água, garantindo a produção sem desperdício.";
        document.getElementById('txt-status-alerta').innerText = "Atenção Solo";
    } else if (umidadeSolo > 70) {
        // Se estiver muito úmido (chuva), desliga a irrigação para poupar água
        consumoAgua = 0;
        score = 98; // Score alto por máxima economia de recurso
        recomendacao = "🌧️ Chuva ou solo muito úmido. Sistema de irrigação totalmente desligado. Economia de 100% de água e energia hoje.";
        document.getElementById('txt-status-alerta').innerText = "Monitorando";
    } else {
        // Estado de equilíbrio perfeito
        consumoAgua = 100;
        score = 95;
        recomendacao = "🌿 Equilíbrio Perfeito! Sensores indicam umidade ideal. O manejo biológico está ativo e a pegada de carbono da produção está reduzida.";
        document.getElementById('txt-status-alerta').innerText = "Manejo Preventivo";
    }

    // Atualiza os elementos na tela (DOM)
    document.getElementById('txt-umidade-solo').innerText = umidadeSolo + "%";
    document.getElementById('txt-consumo-agua').innerText = consumoAgua + "L/m²";
    document.getElementById('score-equilibrio').innerText = score + "/100";
    document.getElementById('recomendacao-texto').innerText = recomendacao;

    // Atualiza o gráfico em tempo real mudando o último ponto
    meuGrafico.data.datasets[0].data[6] = umidadeSolo;
    meuGrafico.data.datasets[1].data[6] = consumoAgua;
    meuGrafico.update();
}

// Simula uma nova leitura dos sensores a cada 5 segundos
setInterval(simularSensores, 5000);