function coucou(param1) { //__ fonction nommée
    return 'coucou';
}

coucou();

const coucou2 = function (param1, param2) {
    return 'coucou';
};
coucou2();

(function () {
    console.log('coucou');
})();

const coucou3 = (param1, param2) => param1 + param2;
const coucou4 = (param1, param2) => {
    if (param1 > param2) {
        return param1;
    }
};
const array = [1, 10, 5];
const newArray = array.filter((element) => element < 10);


const find = new Promise((resolve, reject) => {
    const data = 'coucou';

    resolve(data);

    if (data == 'error') {
        reject(data);
    }
});


const datas = find().then((maData) => {
    console.log(maData);
}).catch((error) => {

});

const datasSpread = {
    id: 1,
    prenom: 'stev'
};

const datasSpread2 = {
    prenom: 'stev'
};

test(datasSpread);

function test(objet) {
    return [...objet];
}




