const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/twitter-clone');
const mews = db.get('mews');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Meower!',
    });
});

function isValidMew(mew) {
    return (
        mew.name &&
        mew.name.toString().trim() !== '' &&
        mew.content &&
        mew.content.toString().trim() !== ''
    );
}

app.post('/mews', (req, res) => {
    console.log(req.body);
    if (isValidMew(req.body)) {
        const mew = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date(),
        };
        mews.insert(mew).then((createdMEw) => {
            res.json(createdMEw);
        });
    } else {
        res.json({
            message: 'Hey, nom et message sont requis !',
        });
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});
