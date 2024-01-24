const muscles = {
    biceps: document.querySelector('#biceps'),
    abs: document.querySelector('#abs'),
    delts: document.querySelector('#delts'),
    // ... (other muscles)
};

const button = document.querySelector('.buttons');
const url = 'https://energyflow.b.goit.study/api/exercises';
let currentPage = 1;
let totalPages = 1;
const perPage = 10;
const allData = [];


async function searchBodyPart() {
    try {
        while (currentPage <= totalPages) {
            const params = new URLSearchParams({ page: currentPage, perPage });

            const response = await fetch(`${url}?${params}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            totalPages = data.totalPages;


            const relevantObjects = data.results.filter(obj => obj.bodyPart === 'waist');  // replace '' with what you search 
            allData.push(...relevantObjects);

            currentPage++;
            console.log(currentPage);
        }
        return allData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
    }
}

searchBodyPart()
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error outside fetchAllData function:', error);
    });
