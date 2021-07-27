const express = require('express');
const path = require('path'); const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.send('Api is working')
});

app.use('/api/v1', require('./routes/v1'));


app.listen(5000);