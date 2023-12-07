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
    writeFile('./data/en/gdrive/lunch_menu_events.json', contents)
}

fetchData()