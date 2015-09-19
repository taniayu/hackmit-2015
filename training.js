var g_clarifai;
var g_concepts = ['great sphinx', 'half dome', 'eiffel tower', 'great wall']
var g_best_object;
var g_best_score = 0;

$(document).ready(
  function(){
      g_clarifai = new Clarifai(
        {
          'accessToken': 'iNfR2YXAQYbyirbhSN6PdcDlCMOhhs'
        }
      );
  }  
);

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

function train() {
  g_clarifai.train('great sphinx');
  g_clarifai.train('half dome');
  g_clarifai.train('eiffel tower');
  g_clarifai.train('great wall');
}

function predict(imgurl) {
  for (i = 0; i < g_concepts.length; i++  ) {
    predict_each(imgurl, i);
  }
  console.log(g_best_object);
  return g_best_object;
}

function predict_each(imgurl, i) {
    g_clarifai.predict(imgurl, g_concepts[i], callback)
    .then(function(obj) {
        console.log(obj.score);
        if (obj.score > g_best_score) {
          g_best_object = g_concepts[i];
          g_best_score = obj.score;
          console.log(g_best_object);
        }
    });
}


function callback(obj){
  console.log('callback', obj);
}