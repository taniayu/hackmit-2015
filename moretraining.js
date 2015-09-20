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

var nouns = ["writer",
             "writing",
             "dad",
             "daughter",
             "day",
             "death",
             "debt",
             "decision",
             "deer",
             "degree",
             "design",
             "desire",
             "desk",
             "destruction",
             "detail",
             "development",
             "digestion",
             "dime",
             "dinner",
             "dinosaurs",
             "direction",
             "dirt",
             "discovery",
             "discussion",
             "disease",
             "disgust",
             "distance",
             "distribution",
             "division",
             "dock",
             "doctor",
             "dog",
             "dogs",
             "doll",
             "dolls",
             "donkey",
             "door",
             "downtown",
             "drain",
             "drawer",
             "dress",
             "drink",
             "driving",
             "drop",
             "drug",
             "drum",
             "duck",
             "ducks",
             "dust",
             "sack",
             "sail",
             "salt",
             "sand",
             "scale",
             "scarecrow",
             "scarf",
             "scene",
             "scent",
             "school",
             "science",
             "scissors",
             "screw",
             "sea",
             "seashore",
             "seat",
             "secretary",
             "seed",
             "selection",
             "self",
             "sense",
             "servant",
             "shade",
             "shake",
             "shame",
             "shape",
             "sheep",
             "sheet",
             "shelf",
             "ship",
             "shirt",
             "shock",
             "shoe",
             "shoes",
             "shop",
             "show",
             "side",
             "sidewalk",
             "sign",
             "silk",
             "silver",
             "sink",
             "sister",
             "sisters",
             "size",
             "skate",
             "skin",
             "skirt",
             "sky",
             "slave",
             "sleep",
             "sleet",


];

var test = ["cat", "dog"];

var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDsiCh6VKdZQXncm_ZLH2fTV97fZ-F-ooE&cx=013031909088357172416:t2dsp4eftfe&num=10&searchType=image&q=";

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