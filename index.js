const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const winston = require('winston');

const PORT = 3000;

const logger = winston.createLogger({
	transports: [new (winston.transports.Console)()],
});

const app = express();

// Static assets.
app.use(express.static(path.join(__dirname, 'public')));

// Logger.
app.use(morgan(':method :url :status :response-time ms', {
	stream: {
		write: message => logger.info(message.trim()),
	},
}));

// Configure templating engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
nunjucks.configure(app.get('views'), {
	autoescape: true,
	express: app,
});

app.get('/', (request, response) => {
	const options = {
		pageTitle: 'Homepage',
		currentYear: new Date().getFullYear(),
		comments: {
			arbitraryID0: {
				userName: 'mistergoomba',
				content: 'Hooray!',
			},
			arbitraryID1: {
				userName: 'Meowtin',
				content: 'Hi, there!',
			},
			arbitraryID2: {
				userName: 'Goombalicious',
				content: 'Oh, man I\'ve got lots to say! First of all, I want to say the first thing, then I\'m going to say the second thing.',
			},
		},
	};
	return response.render('home', options);
});

app.listen(PORT, () => {
	logger.log({ level: 'info', message: `listening on ${PORT}` });
});
