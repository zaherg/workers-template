import { type Context, type Env, Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import app from '@/lib/app';

app.get('/', (ctx: Context) => {
	return ctx.html('Hello World');
});

app.onError((err, ctx: Context) => {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	return ctx.json({ error: true, message: 'Something went wrong' }, 500);
});

export default app;
