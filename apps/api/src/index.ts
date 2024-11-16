import cors from 'cors'
import express, { Response } from 'express'

import { Api, Workspace } from '@mono/types'
import { todoRouter } from './todo/todo.router'
import { errorHandler, notFound } from './middleware/errorHandler'

const app = express()
const port = 5000

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todo', todoRouter);

app.get('/', (_, res: Response<Api.Message>) => {
  res.json({
    message: "Welcome to todo v1"
  });
})

app.get('/workspaces', (_, response) => {
  const workspaces: Workspace[] = [
    { name: 'api', version: '1.0.0' },
    { name: 'types', version: '1.0.0' },
    { name: 'web', version: '1.0.0' },
  ]
  response.json({ data: workspaces })
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))