// base 64 encode images synchronously
function base64_image(file){
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

function encode_allimages(){
  var images = fs.readdirSync('./images');
  var base64images = {};
  for (var i=0; i<images.length; i++){
    var imagename = images[i]
    var base_64 = base64_image('./images/'+imagename);
    base64images[imagename] = base_64;
  }
  return base64images; 
}

var encodedimages = encode_allimages();
//console.log(Object.keys(encodedimages));
//console.log(encodedimages['Airyque Ervin.jpg']);

// // test api call 
var createGoogBody = function(images){
  return {
    "requests": [{
      "image": {
        "content": images['Airyque Ervin.jpg']
      },
      "features": [
        {
          "type": "FACE_DETECTION"
        }
      ]
    }]
  }
  
}

var GoogBody = createGoogBody(encodedimages);
// console.log(GoogBody, "BODY");


// var options = {
//   url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA9tLDMpWWMjIm5PmkksfTd_DVfws6Fe3Q',
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Length': 300
//   }, 
//   form: JSON.stringify(GoogBody)
// }

// request(options, function (err, res, body){
//     if (err){
//       return console.error('upload failed: ', error);
//     }
//     console.log(body, "BODY");
// })


request.post({url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA9tLDMpWWMjIm5PmkksfTd_DVfws6Fe3Q',
  form: GoogBody }, function (err, res, body){
    if (err){
      return console.error('upload failed: ', error);
    }
    console.log(body, "BODY");
})