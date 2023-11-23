import { Request, Response, Router } from 'express'
import { chatGPT } from '../../controllers/recipes'

const basePath = '/v1/recipes'

export const recipeRoutes = Router()

recipeRoutes.post(basePath, chatGPT)