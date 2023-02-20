const express = require('express')
const apiRouter = require('./routes/api/api')
// viewRouter imports the router from view.js
const viewRouter = require('./routes/view/view')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//app uses backend API routing, apiRouter.
app.use('/api', apiRouter);

//when url has a / parameter, use viewRouter.
app.use('/', viewRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));