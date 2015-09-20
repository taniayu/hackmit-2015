var g_clarifai;

$(document).ready(
  function(){
      g_clarifai = new Clarifai(
        {
          'accessToken': 'QVlslCwVVsk2G8gNefYaBlPljwhA5A'
        }
      );
  }
);

var landmarks = [
"Times Square",
"Pamukkale",
"MIT",
"Leaning Tower of Pisa",
"Big Ben",
"Sydney Opera House",
"Angkor Wat",
"Niagara Falls",
"Giza Pyramid",
"Stonehenge",
"Arc de Triomphe",
"Notre Dame",
"Brandenburg Gate",
"Acropolis",
"Taj Mahal",
"Colosseum",
"Machu Picchu",
"Blue Mosque",
"Capitol Hill",
"Statue of Liberty",
"Pamukkale",
"Golden Gate Bridge",
"Hollywood sign",
"London Eye",
"Mount Rushmore"
];

var nouns = ["men",
             "metal",
             "mice",
             "middle",
             "milk",
             "mind",
             "mine",
             "minister",
             "mint",
             "minute",
             "mist",
             "mitten",
             "mom",
             "money",
             "monkey",
             "month",
             "moon",
             "morning",
             "mother",
             "motion",
             "mountain",
             "mouth",
             "move",
             "muscle",
             "music",
             "rabbit",
             "rabbits",
             "rail",
             "railway",
             "rain",
             "rainstorm",
             "rake",
             "range",
             "rat",
             "rate",
             "ray",
             "reaction",
             "reading",
             "reason",
             "receipt",
             "recess",
             "record",
             "regret",
             "relation",
             "religion",
             "representative",
             "request",
             "respect",
             "rest",
             "reward",
             "rhythm",
             "rice",
             "riddle",
             "rifle",
             "ring",
             "rings",
             "river",
             "road",
             "robin",
             "rock",
             "rod",
             "roll",
             "roof",
             "room",
             "root",
             "rose",
             "route",
             "rub",
             "rule",
             "run",
             "vacation",
             "value",
             "van",
             "vase",
             "vegetable",
             "veil",
             "vein",
             "verse",
             "vessel",
             "vest",
             "view",
             "visitor",
             "voice",
             "volcano",
             "volleyball",
             "voyage",
             "walk",
             "wall",
             "war",
             "wash",
             "waste",
             "watch",
             "water",
             "wave",
             "waves",
             "wax",
             "way",
             "wealth",
             "weather",
             "week",
             "weight",

];

var test = ["cat", "dog"];

var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAa1oixqnfVa8THNqefIQ01yNusTMUYTX4&cx=013031909088357172416:t2dsp4eftfe&num=10&searchType=image&q=";

var results = [];

//getUrls(nouns);

function getUrls(data) {
    for (var j = 0; j < data.length; j++) {
        var name = data[j].replace(/\s+/g, '_').toLowerCase();
        var query = url+name;
        $.get(query, function(response, status){
            var name = {
                "label": response.queries.request[0].searchTerms,
                "urls": []
            }
            for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                console.log(item.link);
                name['urls'].push(item.link);
            }
            results.push(name);
        });
    }
}

function positive(results) {
    for (var i = 0; i < results.length; i++) {
        each_positive(results[i].label, results[i].urls);
    }
}

function each_positive(landmark, urls) {
    for (var i = 0; i < urls.length; i++) {
        g_clarifai.positive(urls[i], landmark);
    }
    //train(landmark);
}

function train(landmarks) {
    for (var i = 0; i < landmarks.length; i++) {
       g_clarifai.train(landmarks[i].replace(/\s+/g, '_').toLowerCase(), callback);
    }
}

function callback(obj){
  console.log('callback', obj);
}