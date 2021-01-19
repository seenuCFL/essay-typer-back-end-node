import express, { response } from 'express';
import fetch from 'node-fetch';
import bodyparser from 'body-parser';
import cors from 'cors';

const app = express();
const x = '9228';
let searchKey = "";

app.use(bodyparser.urlencoded({ extended:true }));
app.use(bodyparser.json());
app.use(cors());
app.post('/', (req, res) => {
    let a = req.body.searchKey.split(' ');
    if(!a.length){
        return res.status(404).json('Enter proper word!');
    }
    for(let i=0;i<a.length;i++){
        a[i] = a[i].charAt(0).toUpperCase() + a[i].slice(1).toLowerCase();
    }
    searchKey = a.join('_');
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${searchKey}&formatversion=2&exlimit=1&explaintext=1`)
    .then(response => response.json())
    .then(data => res.json(data.query.pages[0].extract))
    .catch(err => res.status(404).json('Oops! Try searching another word.'))
})


app.listen(3000);