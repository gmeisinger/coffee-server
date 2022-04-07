const MAX_HISTORY = 100;

module.exports = function () {
    this.clients = [];
    this.messages = [];

    this.addMessage = (message) => {
        this.messages.push(message);
        if(this.messages.length > MAX_HISTORY) {
            this.messages = this.messages.slice(1);
        }
    }

    this.addClient = (client) => {
        this.clients.push(client);
    }

    this.generateUsername = () => {
        return `user${Date.now().toString()}`;
    }

    this.setClientName = (oldName, newName) => {
        let client = this.clients.find(c => c.username === oldName);

        if(client) {
            client.username = newName;
            this.messages.map((message, i) => {
                if(message.sender === oldName) {
                    message.sender = newName;
                }
            });
        }
    }
}