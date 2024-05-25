import express from 'express';

import userRouter from './routes/user.route';

const app = express();

app.use(express.json())
app.use('/user',userRouter)

const port: number = 3000
app.listen(port,() => {
    console.log(`App listening on port ${port}`)
})
