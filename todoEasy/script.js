let functions = [];
let myChart;

// Initialisiere QR-Code beim Laden
window.onload = function() {
    new QRCode(document.getElementById("qrcode"), {
        text: window.location.href, // Nimmt automatisch die URL deiner GitHub Page
        width: 100,
        height: 100
    });
    initChart();
};

function initChart() {
    const ctx = document.getElementById('valueChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Value Index (Wichtigkeit / Kosten)',
                data: [],
                backgroundColor: 'rgba(52, 152, 219, 0.6)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function addFunction() {
    const name = document.getElementById('funcName').value;
    const importance = parseFloat(document.getElementById('importance').value);
    const cost = parseFloat(document.getElementById('cost').value);

    if (name && importance > 0 && cost > 0) {
        const valueIndex = (importance / cost).toFixed(3);
        functions.push({ name, importance, cost, valueIndex });
        updateUI();
        clearInputs();
    }
}

function updateUI() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    let total = 0;

    // Tabelle und Chart-Daten
    const labels = [];
    const values = [];

    functions.forEach((item, index) => {
        total += item.cost;
        labels.push(item.name);
        values.push(item.valueIndex);

        tbody.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>${item.importance}</td>
            <td>${item.cost} €</td>
            <td>${item.valueIndex}</td>
            <td><button onclick="deleteItem(${index})">X</button></td>
        </tr>`;
    });

    document.getElementById('totalCost').innerText = total.toFixed(2);
    
    // Chart aktualisieren
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = values;
    myChart.update();
}

function deleteItem(index) {
    functions.splice(index, 1);
    updateUI();
}

function clearInputs() {
    document.getElementById('funcName').value = '';
    document.getElementById('importance').value = '';
    document.getElementById('cost').value = '';
}
