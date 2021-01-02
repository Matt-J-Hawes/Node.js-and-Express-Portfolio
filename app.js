/**********************************************************************************
*                                                                                 *                      
*                    Static Node.js and Express - Portfolio                       *
*                                                                                 *
*                                 Matt Hawes                                      *
*                                                                                 *
/**********************************************************************************/
//NECESSARY DEPENDENCIES
const express = require('express');
const data = require('./data.json').projects;

//MODULE APPLICATIONS
const app = express();

//SET VIEW ENGINE TO PUG
app.set('view engine', 'pug');

//STATIC ROUTE TO SERVE STATIC FILES LOCATED IN PUBLIC FOLDER - (CSS AND JS)
app.use('/static', express.static('public'));

//******** MY ROUTES *********//
//HOME PAGE
app.get('/', (req,res) => {
	res.render('index', { data })
});

//ABOUT PAGE
app.get('/about', (req,res) => {
	res.render('about')
});

//PROJECT PAGES
data.map(project => app.get(`/projects/${project.id}`, (req, res) => {
	  res.render('project', { project })
	})
);

//******* ERROR HANDLERS *******//
app.use((req,res,next) => {
	const err = new Error("I'm sorry... this page does not exist!");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if(err.status === 404){
        res.status(404).render('page-not-found', { err })
	} else {
		err.message = err.message || 'There seems to be a problem on the server, please try again!';
		return res.status(err.status || 500).render('error', { err })
	}

	console.log(err.status);
    console.log(err.message)
});

//DEV SERVER TO RUN ON LOCAL HOST (PORT:3000)
app.listen(3000);