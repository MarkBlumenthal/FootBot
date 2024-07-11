// footbot-backend/src/app.ts
// import express from 'express';
// import cors from 'cors';
// import { scoresRouter } from './routes/scores';
// import { tablesRouter } from './routes/tables';

// const app = express();

// app.use(cors());
// app.use('/api/scores', scoresRouter);
// app.use('/api/tables', tablesRouter);

// export default app;



// footbot-backend/src/app.ts
import express from 'express';
import cors from 'cors';
import { scoresRouter } from './routes/scores';
import { tablesRouter } from './routes/tables';

const app = express();

// Allow requests from all origins (adjust as needed for security)
app.use(cors());

app.use('/api/scores', scoresRouter);
app.use('/api/tables', tablesRouter);

export default app;
