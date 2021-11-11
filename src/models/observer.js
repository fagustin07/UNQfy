class Observer {
    update(action, data) {
        console.log(`[NOTIFICADO] ACCION: ${action} DATA: ${data}`);
    }
}

module.exports = Observer;
