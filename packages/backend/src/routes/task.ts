import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

router.get('/task', async (req, res: Response) => {
    try {
        const task = await prisma.task.findMany()

        res.status(200).json({ tasks: task })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  res.status(200).json({ message: 'Task endpoint' })
})

export default router
