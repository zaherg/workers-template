import { type Context, Hono } from 'hono';
import { cache } from 'hono/cache';
import { cors } from 'hono/cors';
import { etag } from 'hono/etag';
import { ratelimit } from '@/lib/middlewares/ratelimit';

type Bindings = {
	[key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

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
