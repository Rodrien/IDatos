import cron from 'node-cron';

class jobsManger {
    constructor() { }

    static usePythonJob() {
        cron.schedule('*/10 * * * *', () => {
            console.log('running a task every 10 minutes');

            // TODO: Agregar ejecucion de script python aca para que ejecute cada 10 minutos.
        });
    }

    static ejemplo() {
        // Ejemplo para verlo en consola nomas.
        cron.schedule('*/2 * * * * *', () => {
            console.log('running a task every 2 seconds');
        });
    }
}

export default jobsManger;