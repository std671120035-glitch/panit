import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

router.get('/task', async (req, res: Response) => {
    try {
        const task = await prisma.task.findMany()

        res.status(200).json({ tasks: task })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error } )
    }
})

router.post('/task', async (req, res: Response) => {
    const { title, description } = req.body
    if (!title || !description) return res.status(400).json({ error: 'Title and description are required' })

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
            },
        })

        res.status(201).json({ task: newTask })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error } )
    }
})

export default router
