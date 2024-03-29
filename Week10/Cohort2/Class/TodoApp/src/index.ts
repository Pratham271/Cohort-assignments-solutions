import express from 'express'; 
import todoRouter from './routes/todo';
import userRouter from './routes/user';

const app = express();  
app.use(express.json());


app.use('/todos',todoRouter)
app.use('/user',userRouter)

app.listen(3000, ()=> {
    console.log("Server started on port 3000")
})