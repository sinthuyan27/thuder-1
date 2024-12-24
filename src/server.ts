import express from 'express';
import router from './routs/routs';

const app = express();
const PORT = 3000



app. use(express.json());

app.use('/api', router);

app.listen(PORT,() =>{
    console.log(`server contect ${PORT}`)
})
