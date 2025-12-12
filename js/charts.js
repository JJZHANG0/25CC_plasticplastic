/* ========================================
   Chart.js Data Visualizations for Impact Page
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the impact page
    if (!document.getElementById('removalChart')) return;
    
    // Common chart configuration
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    },
                    padding: 15,
                    usePointStyle: true
                }
            }
        }
    };
    
    // Color palette
    const colors = {
        aqua: 'rgba(78, 205, 196, 1)',
        aquaLight: 'rgba(78, 205, 196, 0.2)',
        teal: 'rgba(68, 160, 141, 1)',
        tealLight: 'rgba(68, 160, 141, 0.2)',
        oceanBlue: 'rgba(61, 126, 166, 1)',
        grey: 'rgba(108, 117, 125, 1)',
        greyLight: 'rgba(108, 117, 125, 0.2)'
    };
    
    // Chart 1: Microplastic Removal Efficiency Over Time
    const removalCtx = document.getElementById('removalChart').getContext('2d');
    new Chart(removalCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 6', 'Week 8', 'Week 10', 'Week 12'],
            datasets: [{
                label: 'AquaPure System',
                data: [92, 94, 95, 96, 96, 96, 96, 96],
                borderColor: colors.aqua,
                backgroundColor: colors.aquaLight,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7
            }, {
                label: 'Traditional Filtration',
                data: [45, 48, 42, 40, 38, 35, 32, 30],
                borderColor: colors.grey,
                backgroundColor: colors.greyLight,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderDash: [5, 5]
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Removal Efficiency (%)',
                        font: {
                            size: 14,
                            weight: 600
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time Period',
                        font: {
                            size: 14,
                            weight: 600
                        }
                    }
                }
            },
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Chart 2: Energy Consumption Comparison
    const energyCtx = document.getElementById('energyChart').getContext('2d');
    new Chart(energyCtx, {
        type: 'bar',
        data: {
            labels: ['AquaPure', 'Membrane Filtration', 'Chemical Treatment', 'UV + Filtration', 'Centrifuge System'],
            datasets: [{
                label: 'Energy Consumption (W/hour)',
                data: [300, 1200, 950, 1500, 1800],
                backgroundColor: [
                    colors.aqua,
                    colors.grey,
                    colors.grey,
                    colors.grey,
                    colors.grey
                ],
                borderColor: [
                    colors.aqua,
                    colors.grey,
                    colors.grey,
                    colors.grey,
                    colors.grey
                ],
                borderWidth: 2
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Power Consumption (Watts)',
                        font: {
                            size: 14,
                            weight: 600
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Technology Type',
                        font: {
                            size: 14,
                            weight: 600
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Energy: ' + context.parsed.y + 'W/hour';
                        }
                    }
                }
            }
        }
    });
    
    // Chart 3: Economic Impact Analysis
    const economicCtx = document.getElementById('economicChart').getContext('2d');
    new Chart(economicCtx, {
        type: 'doughnut',
        data: {
            labels: ['Product Value Increase', 'Contamination Loss Reduction', 'Energy Cost Savings', 'Maintenance Savings', 'Regulatory Compliance'],
            datasets: [{
                data: [35, 28, 15, 12, 10],
                backgroundColor: [
                    colors.aqua,
                    colors.teal,
                    colors.oceanBlue,
                    'rgba(102, 126, 234, 1)',
                    'rgba(116, 75, 162, 1)'
                ],
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 20
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        },
                        padding: 12,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '% of total ROI';
                        }
                    }
                }
            }
        }
    });
});
