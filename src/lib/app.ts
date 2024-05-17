import { type Context, Hono } from 'hono';
import { cache } from 'hono/cache';
import { cors } from 'hono/cors';
import { etag } from 'hono/etag';
import { ratelimit } from '@/lib/middlewares/ratelimit';

const app = new Hono();

// middlewares
app.use(ratelimit())
	.use(cors())
	.use(etag())
	.use(
		cache({
			cacheName: 'wrkrs-project',
			cacheControl: 'max-age=86400, stale-while-revalidate',
		}),
	);

export default app;
