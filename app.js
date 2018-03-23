const bodyParser = require('body-parser'); //Body parser is a middleware to handle POST data in Express.
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const express = require('express')
const sessions = require('express-session')
const app = express(); // routing
const cors = require('cors');
const web3 = require('web3');
const path = require('path');
const http = require('http');
const Web3 = new web3();


Web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

var abi = [{
        "constant": false,
        "inputs": [{
            "name": "e_id",
            "type": "uint256"
        }],
        "name": "check_target",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "f_id",
                "type": "uint256"
            },
            {
                "name": "e_id",
                "type": "uint256"
            }
        ],
        "name": "fund_an_idea",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "id",
            "type": "uint256"
        }],
        "name": "get_amount",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "id",
            "type": "uint256"
        }],
        "name": "get_Idea",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "getAll_ideas",
        "outputs": [{
            "name": "",
            "type": "string[]"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "e_address",
                "type": "address"
            },
            {
                "name": "bname",
                "type": "string"
            },
            {
                "name": "target",
                "type": "uint256"
            },
            {
                "name": "desc",
                "type": "string"
            }
        ],
        "name": "setEntreprenuer",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "f_name",
                "type": "string"
            },
            {
                "name": "pass",
                "type": "string"
            },
            {
                "name": "f_address",
                "type": "address"
            }
        ],
        "name": "setFunder",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_e_id",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "uint256"
        }],
        "name": "_entreprenuer_List",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "uint256"
        }],
        "name": "_entreprenuers",
        "outputs": [{
                "name": "_benificiaryName",
                "type": "string"
            },
            {
                "name": "_beneficiary_add",
                "type": "address"
            },
            {
                "name": "_target_amount",
                "type": "uint256"
            },
            {
                "name": "_current_amount",
                "type": "uint256"
            },
            {
                "name": "_description",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_f_id",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_organiser",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

var contadd = "0xb05950f1a60b6dc00dfd7b7bd15487eced3ab089"; //have to change every time we deploy the contract

var session;

app.use(sessions({
    secret: 'verysecret@345#',
    resave: false,
    saveUninitialized: true
}))
var con = Web3.eth.contract(abi).at(contadd);
app.use(cors()); //cross resourse sharing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

});
app.get('/funder', (req, res) => {
    res.sendFile(__dirname + '/public/funder.html');

});

app.get('/fund', (req, res) => {
    res.sendFile(__dirname + '/public/fund.html');

});

app.post('/index', (req, res) => {
    response = [];
    let count = parseInt(con._e_id.call());
    console.log(count);
    for (var i = 0; i < count; i++) {
        response.push(con._entreprenuers.call(i));
    }
    /*let id = parseInt(req.body.id);

    console.log(id);
    let x = con._entreprenuers.call(id);
    */
    console.log(response);
    res.send(response);
});
app.post('/register', (req, res) => {
    response = []
    let name1 = req.body.name;
    let desp = req.body.desc;
    let target = parseInt(req.body.target);
    let count = parseInt(con._e_id.call());
    let u_address = Web3.eth.accounts[count + 1];
    let x = con.setEntreprenuer.call(u_address, name1, target, desp, { from: Web3.eth.accounts[0], gas: 3000000 });
    let y = con.setEntreprenuer(u_address, name1, target, desp, { from: Web3.eth.accounts[0], gas: 3000000 });
    response.push(x);
    response.push("sucessfull...");

    res.send(response);
});
app.post('/funder', (req, res) => {
    response = []
    let name1 = req.body.name;
    // let desp = req.body.desc;
    //let target = parseInt(req.body.target);
    let count = parseInt(con._f_id.call());
    let u_address = Web3.eth.accounts[7 - count];
    let pass = req.body.pass;
    console.log("name :: " + name1);
    console.log("pass :: " + pass);
    console.log("address: " + u_address);
    let x = con.setFunder.call(name1, pass, u_address, { from: Web3.eth.accounts[0], gas: 3000000 });
    let y = con.setFunder(name1, pass, u_address, { from: Web3.eth.accounts[0], gas: 3000000 });
    response.push(x);
    response.push("sucessfull...");

    res.send(response);
});
app.post('/fund', (req, res) => {
    response = []
    let eid = req.body.eid;
    let fid = req.body.fid;

    let x = con.fund_an_idea.call(fid, eid, { from: Web3.eth.accounts[0], gas: 3000000 });
    let y = con.fund_an_idea(fid, eid, { from: Web3.eth.accounts[0], gas: 3000000 });
    response.push(x);
    response.push("sucessfull...");

    res.send(response);
});


app.listen(3000);
console.log("listening");