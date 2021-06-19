const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const HttpException = require('./src/utils/HttpException');
const errorMiddleware = require('./src/middleware/error');
const userRouter = require('./src/routes/users');
//const { default: axios } = require('axios');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.options('*', cors());

const port = Number(process.env.PORT || 3000);

// Error Route
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Page Not Found!');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// axios({
//     method: 'post',
//     url: 'https://api.igdb.com/v4/games',
//     headers: {
//         'Client-ID': process.env.TWITCH_CLIENT_ID,
//         'Authorization': `Bearer ${process.env.TWITCH_APP_ACCESS_TOKEN}`,
//         'Accept': 'application/json'
//     },
//     data: 'fields cover.*; limit 5;'
// })
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err))