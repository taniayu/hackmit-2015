var g_clarifai;
var g_concepts = ['great sphinx', 'half dome', 'eiffel tower', 'great wall',
"times_square", "pamukkale", "mit", "leaning_tower_of_pisa", "big_ben", "sydney_opera_house",
 "angkor_wat", "niagara_falls", "giza_pyramid", "stonehenge", "arc_de_triomphe", "notre_dame",
 "brandenburg_gate", "acropolis", "taj_mahal", "colosseum", "machu_picchu", "blue_mosque",
 "capitol_hill", "statue_of_liberty", "pamukkale", "golden_gate_bridge", "hollywood_sign", "london_eye", "mount_rushmore",
 "potala_palace", "tokyo_tower", "berlin_wall", "ayers_rock", "burj_al_arab_hotel", "louvre_museum", "buckingham_palace",
  "forbidden_city", "neuschwanstein_castle", "christ_the_redeemer", "edinburgh_castle", "the_shard",
  "the_gherkin", "washington_monument", "mecca", "bridge_of_sighs", "gateway_arch", "saint_basil_cathedral"];


g_clarifai = new Clarifai(
  {
    'accessToken': '0EqPTTtfJkNPaEWEr8Ys3hPhaR3ANt'
  }
);

function makePrediction(image_url) {
  predict(image_url).then(function (obj) {
    makeRequest(obj.bestObject);
  });
};

function positive() {
  g_clarifai.positive('http://i.imgur.com/WbHFO0C.jpg', 'great sphinx');
  g_clarifai.positive('http://i.imgur.com/BvDZ6lc.jpg', 'great sphinx');
  g_clarifai.positive('http://i.imgur.com/abTzH8N.jpg', 'great sphinx');
  g_clarifai.positive('http://i.imgur.com/Zz80cfG.jpg', 'great sphinx');
  g_clarifai.positive('http://i.imgur.com/fTrw55y.jpg', 'great sphinx');
  g_clarifai.positive('http://i.imgur.com/dHToNnF.jpg', 'great sphinx');
  g_clarifai.positive('http://i.imgur.com/BLx7qG3.jpg', 'great sphinx');

  g_clarifai.positive('http://i.imgur.com/F9zKjoX.jpg', 'half dome');
  g_clarifai.positive('http://i.imgur.com/6o6QRif.jpg', 'half dome');
  g_clarifai.positive('http://i.imgur.com/UVJmAop.jpg', 'half dome');
  g_clarifai.positive('http://i.imgur.com/copaLML.jpg', 'half dome');
  g_clarifai.positive('http://i.imgur.com/CqU6HwV.jpg', 'half dome');

  g_clarifai.positive('http://i.imgur.com/S6jEJKq.jpg', 'eiffel tower');
  g_clarifai.positive('http://i.imgur.com/oyN9fqU.jpg', 'eiffel tower');
  g_clarifai.positive('http://i.imgur.com/EjzUOuF.jpg', 'eiffel tower');
  g_clarifai.positive('http://i.imgur.com/FQznFrm.jpg', 'eiffel tower');
  g_clarifai.positive('http://i.imgur.com/kWkADYu.jpg', 'eiffel tower');

  g_clarifai.positive('http://i.imgur.com/usPurc3.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/I5BICsA.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/vn5T8IL.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/YC9tnGT.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/PbeXW5B.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/GTWglG6.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/LaBr04W.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/NvKDdot.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/8e6JHPR.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/5aNwLm9.jpg', 'great wall');

}

function negative() {
  g_clarifai.negative('http://i.imgur.com/ufj0Rjg.jpg', 'great sphinx');
  g_clarifai.negative('http://i.imgur.com/5cSV6hr.jpg', 'great sphinx');
  g_clarifai.negative('http://i.imgur.com/ZziFNE8.jpg', 'great sphinx');
  g_clarifai.negative('http://i.imgur.com/Qc6GguI.jpg', 'great sphinx');
  g_clarifai.negative('http://i.imgur.com/TYH1fRs.jpg', 'great sphinx');

  g_clarifai.negative('http://i.imgur.com/8iWOEd1.jpg', 'half dome');
  g_clarifai.negative('http://i.imgur.com/OEhFod3.jpg', 'half dome');
  g_clarifai.negative('http://i.imgur.com/soKhKtm.jpg', 'half dome');
  g_clarifai.negative('http://i.imgur.com/tBPBwi7.jpg', 'half dome');
  g_clarifai.negative('http://i.imgur.com/Z0qIXar.jpg', 'half dome');

  g_clarifai.negative('http://i.imgur.com/yvvzerl.jpg', 'eiffel tower');
  g_clarifai.negative('http://i.imgur.com/GZy40Z5.jpg', 'eiffel tower');
  g_clarifai.negative('http://i.imgur.com/D8pH2qC.jpg', 'eiffel tower');
  g_clarifai.negative('http://i.imgur.com/MvGVCoy.jpg', 'eiffel tower');
  g_clarifai.negative('http://i.imgur.com/VWNkFSA.jpg', 'eiffel tower');

  g_clarifai.positive('http://i.imgur.com/E6KyKOz.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/oz0oBh3.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/N96vHQV.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/8j7AjEf.jpg', 'great wall');
  g_clarifai.positive('http://i.imgur.com/r2EVcbf.jpg', 'great wall');
}

function negative_sphinx() {
    g_clarifai.negative('http://i.imgur.com/WbHFO0C.jpg', 'mit');
  g_clarifai.negative('http://i.imgur.com/BvDZ6lc.jpg', 'mit');
  g_clarifai.negative('http://i.imgur.com/abTzH8N.jpg', 'mit');
  g_clarifai.negative('http://i.imgur.com/Zz80cfG.jpg', 'mit');
  g_clarifai.negative('http://i.imgur.com/fTrw55y.jpg', 'mit');
  g_clarifai.negative('http://i.imgur.com/dHToNnF.jpg', 'mit');
  g_clarifai.negative('http://i.imgur.com/BLx7qG3.jpg', 'mit');

  g_clarifai.negative('http://i.imgur.com/WbHFO0C.jpg', 'taj_mahal');
    g_clarifai.negative('http://i.imgur.com/BvDZ6lc.jpg', 'taj_mahal');
    g_clarifai.negative('http://i.imgur.com/abTzH8N.jpg', 'taj_mahal');
    g_clarifai.negative('http://i.imgur.com/Zz80cfG.jpg', 'taj_mahal');
    g_clarifai.negative('http://i.imgur.com/fTrw55y.jpg', 'taj_mahal');
    g_clarifai.negative('http://i.imgur.com/dHToNnF.jpg', 'taj_mahal');
    g_clarifai.negative('http://i.imgur.com/BLx7qG3.jpg', 'taj_mahal');

}
function train() {
  g_clarifai.train('great sphinx');
  g_clarifai.train('half dome');
  g_clarifai.train('eiffel tower');
  g_clarifai.train('great wall');
}

function predict(imgurl) {
  var arrayOfPromises = [];
  var bestScore = 0;
  var bestObject = null;
  for (i = 0; i < g_concepts.length; i++  ) {
    var promise = predict_each(imgurl, g_concepts[i]).then(function(obj) {
      if (obj.score > bestScore) {
        bestObject = obj.originalQuery;
        bestScore = obj.score;
      }
    });
    arrayOfPromises.push(promise);
  }
  return Q.all(arrayOfPromises).then(function () {
    return {
      bestScore: bestScore,
      bestObject: bestObject
    };
  });
  console.log(g_best_object);
}

function predict_each(imgurl, keyword) {
    return g_clarifai.predict(imgurl, keyword, callback).then(function (obj) {
      obj.originalQuery = keyword;
      return obj;
    });
}

function callback(obj){
  console.log('callback', obj);
}