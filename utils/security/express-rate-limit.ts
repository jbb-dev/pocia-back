import rateLimit from 'express-rate-limit';

export const globalApiRateLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 200, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    message: {
		message: "You have reached the maximum allowed number of requests within 10 minutes."
	}, 
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const loginRateLimiter = rateLimit({
	windowMs: 60 * 60 * 1000 * 24, // 1 day
	max: 10, // Limit each IP to 10 requests per `window` (here, per day)
	message: {
		message: "You have reached the maximum number of login attempts in one day, please try again tomorrow.", 
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
