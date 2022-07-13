import app from './index';
import { connectDB } from './db'

async function main() {
    const puerto = 3000
    try {
        await connectDB(),
        app.listen(puerto);
        console.log('en el puerto ', puerto) 
    } catch (error) {
        console.error(error)
    }
}
main();