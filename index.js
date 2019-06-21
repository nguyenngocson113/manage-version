const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const lo = require('lodash');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/getList', (req,res) => {
    Promise.all([
        readVersionsFromFile(),
        getVersionsFromAPI()
    ])
    .then(result => {
        const dataLocal = result[0];
        const dataAPI = result[1];
        data = lo.merge(dataAPI, dataLocal)
        res.send(data.data)
    })
    .catch(error => {
        console.log(error)
    });

});

const readVersionsFromFile = async() => {
    return new Promise((resolve, reject) => {
        fs.readFile('build-version.json', (err, data) => {  
            if (err) throw err;
            const dataLocal = JSON.parse(data) || {};
            resolve(dataLocal);
        })
    });
};

const getVersionsFromAPI = () => {
    return axios.get('http://sentry.dinovative.com/api/0/organizations/dinovative/releases/', {
        headers: {'Authorization': "bearer " + 'dacc310722f2407ba9b8eadc2ab186227556b986887646b293a99870ce97e924'}
    })
    .then(response => response.data)
    .then((response) => {
        return {data: response}
    })
    .catch(error => {
      console.log(error);
    });
};


app.post('/api/update', async (req,res) => {
    let data = {
        data: req.body
    };
    data = JSON.stringify(data);
    try {
        await fs.writeFile('build-version.json', data, 'utf8', () => {
            console.log('success')
            res.send({status: 'success'})
        });
    } catch (error) {
        console.log(error)
    }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);