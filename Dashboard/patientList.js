document.addEventListener('DOMContentLoaded', function() {
    const patients = [
        { name: "Emily Williams", age: 18, gender: "Female", profile_picture: "./patients/emily.png" },
        { name: "Ryan Johnson", age: 45, gender: "Male", profile_picture: "./patients/ryan.png" },
        { name: "Brandon Mitchell", age: 36, gender: "Male", profile_picture: "./patients/brandon.png" },
        { name: "Jessica Taylor", age: 28, gender: "Female", profile_picture: "./patients/jessica.png" },
        { name: "Samantha Johnson", age: 56, gender: "Female", profile_picture: "./patients/samantha.png" },
        { name: "Ashley Martinez", age: 54, gender: "Female", profile_picture: "./patients/ashley.png" },
        { name: "Olivia Brown", age: 32, gender: "Female", profile_picture: "./patients/olivia.png" },
        { name: "Tyler Davis", age: 19, gender: "Male", profile_picture: "./patients/tyler.png" },
        { name: "Kevin Anderson", age: 30, gender: "Male", profile_picture: "./patients/kevin.png" },
        { name: "Dylan Thompson", age: 36, gender: "Male", profile_picture: "./patients/dylan.png" },
        { name: "Nathan Evans", age: 58, gender: "Male", profile_picture: "./patients/nathan.png" },
        { name: "Mike Nolan", age: 31, gender: "Male", profile_picture: "./patients/mike.png" },
    ];

    const displayPatients = (patients) => {
        const patientsListContainer = document.querySelector('.patients-list'); // Target `.patients-list` div

        if (!patientsListContainer) {
            console.error("Container '.patients-list' not found");
            return;
        }

        // Clear existing patient list content 
        patientsListContainer.innerHTML = ''; 

        patients.forEach(patient => {
            const patientDiv = document.createElement('div');
            patientDiv.classList.add('li');

            const imgDiv = document.createElement('div');
            imgDiv.classList.add('li-img');
            const img = document.createElement('img');
            img.src = patient.profile_picture;
            img.alt = `Image of ${patient.name}`;
            img.onerror = function() {
                this.src = './assets/default-avatar.png'; 
            };
            imgDiv.appendChild(img);

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('list-info');
            const nameP = document.createElement('p');
            nameP.textContent = patient.name;
            const ageP = document.createElement('p');
            ageP.textContent = `${patient.gender}, ${patient.age}`;

            infoDiv.appendChild(nameP);
            infoDiv.appendChild(ageP);

            const dotsDiv = document.createElement('div');
            dotsDiv.classList.add('side-img');
            const dotsImg = document.createElement('img');
            dotsImg.src = './assets/dots-h.png';
            dotsImg.alt = 'More options';
            dotsDiv.appendChild(dotsImg);

            patientDiv.appendChild(imgDiv);
            patientDiv.appendChild(infoDiv);
            patientDiv.appendChild(dotsDiv);

            patientsListContainer.appendChild(patientDiv);
        });
    };

    displayPatients(patients);
});
