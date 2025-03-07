const fs = require('fs');
const path = require('path');

async function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    const eventFolders = fs.readdirSync(eventsPath);

    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(path.join(eventsPath, folder))
            .filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(path.join(eventsPath, folder, file));
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

module.exports = { loadEvents };