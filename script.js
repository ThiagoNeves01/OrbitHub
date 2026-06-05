let donutChart;
let barChart;

const form =
    document.getElementById("carbonForm");

form.addEventListener("submit", calcularCarbono);

function calcularCarbono(event) {

    event.preventDefault();

    const funcionarios =
        Number(
            document.getElementById("funcionarios").value
        ) || 1;

    const energia =
        Number(
            document.getElementById("energia").value
        ) || 0;

    const veiculos =
        Number(
            document.getElementById("veiculos").value
        ) || 0;

    const km =
        Number(
            document.getElementById("km").value
        ) || 0;

    const residuos =
        Number(
            document.getElementById("residuos").value
        ) || 0;

    const emissaoEnergia =
        energia * 0.0004;

    const emissaoTransporte =
        (veiculos * km) * 0.00008;

    const emissaoResiduos =
        residuos * 0.0003;

    const emissaoTotal =
        emissaoEnergia +
        emissaoTransporte +
        emissaoResiduos;

    atualizarCards(
        emissaoTotal,
        funcionarios
    );

    atualizarGraficos(
        emissaoEnergia,
        emissaoTransporte,
        emissaoResiduos
    );
}

function atualizarCards(total, funcionarios) {

    document.getElementById(
        "resultadoCarbono"
    ).textContent =
        total.toFixed(2);

    document.getElementById(
        "arvores"
    ).textContent =
        Math.round(total * 8.4);

    document.getElementById(
        "intensidade"
    ).textContent =
        (total / funcionarios).toFixed(2);

    document.getElementById(
        "compensacao"
    ).textContent =
        `R$ ${(total * 25).toFixed(0)}`;
}

function atualizarGraficos(
    energia,
    transporte,
    residuos
) {

    if (donutChart) {
        donutChart.destroy();
    }

    if (barChart) {
        barChart.destroy();
    }

    donutChart =
        new Chart(
            document.getElementById("donutChart"),
            {
                type: "doughnut",

                data: {
                    labels: [
                        "Energia",
                        "Transporte",
                        "Resíduos"
                    ],

                    datasets: [
                        {
                            data: [
                                energia,
                                transporte,
                                residuos
                            ],

                            backgroundColor: [
                                "#002EF4",
                                "#27DDDF",
                                "#7C3AED"
                            ],

                            borderWidth: 0
                        }
                    ]
                }
            }
        );

    barChart =
        new Chart(
            document.getElementById("barChart"),
            {
                type: "bar",

                data: {
                    labels: [
                        "Energia",
                        "Transporte",
                        "Resíduos"
                    ],

                    datasets: [
                        {
                            label: "tCO₂e",

                            data: [
                                energia,
                                transporte,
                                residuos
                            ],

                            backgroundColor: [
                                "#002EF4",
                                "#27DDDF",
                                "#7C3AED"
                            ]
                        }
                    ]
                },

                options: {

                    responsive: true,

                    plugins: {
                        legend: {
                            display: false
                        }
                    },

                    scales: {

                        x: {
                            ticks: {
                                color: "#FFFFFF"
                            }
                        },

                        y: {
                            ticks: {
                                color: "#FFFFFF"
                            }
                        }

                    }
                }
            }
        );
}