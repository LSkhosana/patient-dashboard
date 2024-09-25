const username = 'coalition';
const password = 'skills-test';
const credentials = btoa(`${username}:${password}`); 

fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${credentials}`
    }
})
.then(response => response.json())  
.then(data => {
    const jessicaTaylor = data.find(patient => patient.name === "Jessica Taylor");
    
    // Display patient info
    displayPatientData(jessicaTaylor);  
    
    createBloodPressureGraph(jessicaTaylor.diagnosis_history);  
    
    updatePatientVitals(jessicaTaylor);  
    
    displayDiagnosticList(jessicaTaylor.diagnostic_list); 

    displayLabResults(jessicaTaylor.lab_results);

    displayBloodPressure(jessicaTaylor.diagnosis_history[0].blood_pressure);
})
.catch(error => console.error('Error:', error));

// Display patient data
const displayPatientData = (patient) => {
    document.getElementById('profile-picture').src = patient.profile_picture;
    document.getElementById('patient-name').textContent = patient.name;
    document.getElementById('patient-gender').innerHTML = `<img src="./assets/gender.png" alt="Gender Icon" class="gender-icon">Gender: <span class="gender-text">${patient.gender}</span>`;
    document.getElementById('patient-date-of-birth').innerHTML = `<img src="./assets/calander.png" alt="Gender Icon" class="gender-icon">Date of birth <span class="gender-text"> ${patient.date_of_birth}</span>`;
    document.getElementById('contact-info').innerHTML = `<img src="./assets/phone.png" alt="Gender Icon" class="gender-icon">Contact Info <span class="gender-text"> ${patient.phone_number}</span>`;
    document.getElementById('emergency-contact').innerHTML = `<img src="./assets/phone.png" alt="Gender Icon" class="gender-icon">Emergency Contacts <span class="gender-text"> ${patient.emergency_contact}</span>`;
    document.getElementById('insurance').innerHTML = `<img src="./assets/tick.png" alt="Gender Icon" class="gender-icon">Insurance Provider <span class="gender-text">${patient.insurance_type}</span>`;
};

// Create blood pressure graph
function createBloodPressureGraph(diagnosisHistory) {
    const filteredData = diagnosisHistory.filter(entry => {
        const year = entry.year;
        const month = entry.month;

        const monthsToInclude = ["October", "November", "December", "January", "February", "March"];
        return (year === 2023 && ["October", "November", "December"].includes(month)) || 
               (year === 2024 && ["January", "February", "March"].includes(month));
    }).reverse();

const months = filteredData.map(entry => `${entry.month} ${entry.year}`);
const systolicData = filteredData.map(entry => entry.blood_pressure.systolic.value);
const diastolicData = filteredData.map(entry => entry.blood_pressure.diastolic.value);

const ctx = document.getElementById('bloodPressureChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [
            {
                label: 'Systolic Pressure',
                data: systolicData,
                borderColor: '#E66FD2',
                fill: false,
                tension: 0.4 
            },
            {
                label: 'Diastolic Pressure',
                data: diastolicData,
                borderColor: '#8C6FE6',
                fill: false,
                tension: 0.4 
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                min: 60,
                ticks: {
                    font: {
                        size: 8
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 8
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
}

// Update heart rate, respiratory rate, and temperature
const updatePatientVitals = (patient) => {
    const diagnosisHistory = patient.diagnosis_history[0];

    document.getElementById('heart-rate').textContent = `${diagnosisHistory.heart_rate.value} bpm`;
    document.getElementById('heart-rate-levels').textContent = diagnosisHistory.heart_rate.levels;

    document.getElementById('respiratory-rate').textContent = `${diagnosisHistory.respiratory_rate.value} breaths/min`;
    document.getElementById('respiratory-rate-levels').textContent = diagnosisHistory.respiratory_rate.levels;

    document.getElementById('temperature').textContent = `${diagnosisHistory.temperature.value} °F`;
    document.getElementById('temperature-levels').textContent = diagnosisHistory.temperature.levels;
};

//function to display diagnostic list
const displayDiagnosticList = (diagnosticList) => {
    const tableBody = document.querySelector('.diagnostics tbody'); 

    diagnosticList.forEach(diagnostic => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${diagnostic.name}</td>
            <td>${diagnostic.description}</td>
            <td>${diagnostic.status}</td>
        `;
        
        tableBody.appendChild(row);
    });
};



// Function to display lab results 
const displayLabResults = (labResults) => {
    document.getElementById('result-1').textContent = labResults[0];
    document.getElementById('result-2').textContent = labResults[1];
    document.getElementById('result-3').textContent = labResults[2];
    document.getElementById('result-4').textContent = labResults[3];
};

const labResultsFromAPI = ["Blood Tests", "CT Scans", "Radiology Reports", "X-Rays"];
displayLabResults(labResultsFromAPI);




