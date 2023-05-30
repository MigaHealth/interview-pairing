import { router } from '../trpc';
import { consumerRouter } from './consumer';

export const appRouter = router({
  consumer: consumerRouter,
});

export type AppRouter = typeof appRouter;
