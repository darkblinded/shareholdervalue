const diagramTypes = [
    { type: 'doughnut', metatype: 'comparison', datasetMinSize: 3, datasetMaxSize: 7 },
    { type: 'doughnut', metatype: 'binary', datasetMinSize: 2, datasetMaxSize: 2 },
    { type: 'bar', metatype: 'binary', datasetMinSize: 2, datasetMaxSize: 2 },
    { type: 'bar', metatype: 'comparison', datasetMinSize: 4, datasetMaxSize: 10 },
    { type: 'bar', metatype: 'development', datasetMinSize: 4, datasetMaxSize: 10 },
    { type: 'line', metatype: 'development', datasetMinSize: 5, datasetMaxSize: 10 }
];

const yMetric = [
    'Shareholder Value',
    'EBIT',
    'Market Share',
    'Business',
    'Revenue',
    'Value'
];

const diagramTitle = [
    'Quarterly report',
    'Prospects',
    'KPIs',
    'New Development',
    'Acquisition',
    'Sales',
    'Vertical Sales',
    'Inside Sales',
    'Business Division',
    'Business Unit'
];

const binarySets = [
    ['We', 'Our competitors'],
    ['Import', 'Export']
]

const comparisonSets = [
    ['Berlin', 'Tokyo', 'New York', 'Bejing', 'Sydney', 'Rio de Janairo', 'Quebec', 'Kapstadt', 'Madrid', 'London']
]

function getRandomSubset(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

function getRandomChartContent() {
    let content = {}
    let diagramMeta = getRandomElement(diagramTypes);

    content.title = getRandomElement(diagramTitle);

    content.type = diagramMeta.type;
    content.metatype = diagramMeta.metatype;

    content.data = {};
    content.options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    let dataset = {}

    dataset.data = Array.from({length: Math.floor(Math.random() * (diagramMeta.datasetMaxSize - diagramMeta.datasetMinSize) + diagramMeta.datasetMinSize)}, () => Math.floor(Math.random() * 40));

    content.data.datasets = [dataset];

    switch (diagramMeta.metatype) {
        case 'binary':
            content.data.labels = getRandomSubset(getRandomElement(binarySets), dataset.data.length)
            break;
        case 'development':
            let startYear = Math.floor(Math.random() * (2050-1960) + 1960)
            let increment = Math.floor(Math.random() * 10 + 1)
            content.data.labels = Array.from(new Array(dataset.data.length), (x,i) => i * increment + startYear)
            break;
        default:
            content.data.labels = getRandomSubset(getRandomElement(comparisonSets), dataset.data.length)
            break;
    }

    switch (diagramMeta.type) {
        case 'line':
        case 'bar':
            content.data.datasets[0].label = '';
            content.options.legend = { display: false }
            break;
        default:
            break;
    }

    content.options.scales.yAxes = [{
        scaleLabel: {
            display: true,
            labelString: getRandomElement(yMetric)
        }
    }]

    dataset.backgroundColor = palette('tol-rainbow', dataset.data.length).map(function(hex) {
        return '#' + hex;
    });

    return content;
}


function renderDiagram() {
    let content = getRandomChartContent();

    document.title = content.title;
    document.getElementById('diagramTitle').innerHTML = content.title;

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: content.type,
        data: content.data,
        options: content.options
    });
}

renderDiagram();

setInterval(function(){
    renderDiagram();
}, 5000);
