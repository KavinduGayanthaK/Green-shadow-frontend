const incomeData = [10, 12, 8, 15, 20, 18, 16, 22, 25, 21, 18, 20];

const ctx = $('#myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Crops in Season',
            data: incomeData,
            // backgroundColor:[
            //     '#cce5ff'
            // ],
            borderColor: [
                '#66b0ff'
            ],
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true
    }
});