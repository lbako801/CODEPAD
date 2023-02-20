const express = require('express')
// const apiRoutes = require('./routes/api/api')
const viewRouter = require('./routes/view/view')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// app.use('/api', apiRoutes);
app.use('/', viewRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
