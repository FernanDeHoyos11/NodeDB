import app from './index';
import { connectDB } from './db'
import {PORT} from './config'

async function main() {
    
    try {
        await connectDB(),
        app.listen(PORT);
        console.log('en el puerto ', PORT) 
    } catch (error) {
        console.error(error)
    }
}
main();