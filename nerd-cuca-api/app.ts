import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { recipeRoutes } from './src/routes/recipes'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors());

app.use(recipeRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('nerd-cuca-api it\'s working correctly')
})



app.listen(port, () => console.log(`nerd-cuca-api running on port ${port}`))