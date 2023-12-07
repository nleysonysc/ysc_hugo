const fs = require('fs/promises');

async function getGdriveFile(id){
    let res = await fetch(`https://drive.google.com/uc?export=download&id=${id}`)
    let contents = await res.text()
    return contents
}

async function writeFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content);
    } catch (error) {
        console.error(`Error writing to file "${filePath}": ${error.message}`);
    }
}

async function fetchData(){
    let lunchEvents = await getGdriveFile('1mPPpTnLjS3VDErnFfS_PTUupVbvE4E-R')
    let minutes = await getGdriveFile('16bHeSR0TlN6_G7IxyXJqp3aJQmGW3V1W')
    let agendas = await getGdriveFile('1Yl9DjXZEzERJLrZGJHL3hraB-7KnO8SC')
    writeFile('./data/en/gdrive/lunch_menu_events.json', lunchEvents)
    writeFile('./data/en/gdrive/minutes.json', minutes)
    writeFile('./data/en/gdrive/agendas.json', agendas)
}

fetchData()