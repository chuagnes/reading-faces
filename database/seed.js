var mongoose = require('mongoose');
var db = require('./index.js');
var Quiz = require('./models/quiz');

Quiz.collection.drop();

var imageDatas = [
{
  "id": 1,
  "imagename": "princewilliam",
  "apianswer": {
    "anger": 0.0265818462,
    "contempt": 0.140492767,
    "disgust": 0.19272536,
    "fear": 0.0000628942362,
    "happiness": 0.0702050254,
    "neutral": 0.55639863,
    "sadness": 0.00333377486,
    "surprise": 0.0101997359
  },
  "useranswer":"",
  "answer": "contempt",
  "url": "http://3.bp.blogspot.com/-CQYp1eoAqOU/UhLtnyAazWI/AAAAAAAAJUY/yycH3-d_MKU/s1600/Prince+William+George+Catherine+Kate+Interview+Contempt+Microexpression+Nonverbal+Communication+Expert+Body+Language+Expert+Speaker+Keynote+Las+Vegas+Los+Angeles+Orlando+New+York+City.png"
},
{
  "id": 2,
  "imagename": "obama",
  "apianswer": {
    "anger": 0.00000475417437,
    "contempt": 0.005858863,
    "disgust": 0.0000273143251,
    "fear": 3.98239237e-8,
    "happiness": 0.430090666,
    "neutral": 0.5638945,
    "sadness": 0.000004668734,
    "surprise": 0.0001191708
  },
  "useranswer": "", 
  "answer": "happiness",
  "url": "http://2.bp.blogspot.com/--p2DFR56VVQ/UaACyzrosDI/AAAAAAAAIhg/87WsdFu8uv4/s1600/Obama+Heckler+Before+Anger+Smile+Emotional+Dissonance+Eyes+Open+Wide+Microexpression+Nonverbal+Communication+Expert+Body+Language+Expert+Speaker+Keynote+Las+Vegas+Los+Angeles+Orlando.png"
},
{
  "id": 3,
  "imagename": "slightlysurprised",
  "apianswer": {
    "anger": 0.0293311048,
    "contempt": 0.00428090058,
    "disgust": 0.0209810548,
    "fear": 0.02671672,
    "happiness": 0.00147751358,
    "neutral": 0.8167262,
    "sadness": 0.0184424575,
    "surprise": 0.08204402
  },
  "useranswer":"",
  "answer": "surprise",
  "url": "https://i.guim.co.uk/img/static/sys-images/Lifeandhealth/Pix/pictures/2009/5/12/1242118482236/Tim-Roth---surprise-001.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=d8a6c50d85a1ed26859833bc3371f9f4"
},
{
  "id": 4,
  "imagename": "donaldtrump",
  "apianswer": {
    "anger": 0.005404636,
    "contempt": 0.17257525,
    "disgust": 0.008142417,
    "fear": 0.0000021752262,
    "happiness": 0.0142606953,
    "neutral": 0.7689357,
    "sadness": 0.0306279622,
    "surprise": 0.00005116303
  },
  "useranswer":"",
  "answer": "contempt",
  "url": "https://2.bp.blogspot.com/-jcUnY7OeeAk/WArQMyJ4l4I/AAAAAAAAUss/jSQ-9lYTPs8U_EtEC20dING-tSvbqUOUQCLcB/s1600/Donald%2BTrump%252BHillary%2BClinton%252B3rd%2BPresidential%2BDebate%252BContempt%252BSuch%2Ba%2BNasty%2BWoman%252BEmotional%2BIntelligence%252BBody%2BLanguage%252BBody%2BLanguage%2BExpert%252BNonverbal%252BSpeaker%252BKeynote%252BConsultant%252BLos%2BAngeles%252BLas%2BVegas%252BCalifornia%252BNYC%252BOrlando%252B2.png"
},
{
  "id": 5,
  "imagename": "slightlyangry",
  "apianswer": {
    "anger": 0.000003887281,
    "contempt": 0.000168273924,
    "disgust": 2.784796e-8,
    "fear": 2.76019319e-10,
    "happiness": 0.000008177957,
    "neutral": 0.99980855,
    "sadness": 0.0000108866061,
    "surprise": 2.16369557e-7
  },
  "answer": "angry",
  "url": "http://careers.bmj.com/article-images/cf2102.f4_default.gif"
},
{
  "id": 6,
  "imagename": "angryimg2",
  "apianswer": {
    "anger": 0.127202943,
    "contempt": 0.00903138,
    "disgust": 0.00075173087,
    "fear": 0.0000047077524,
    "happiness": 0.00017030767,
    "neutral": 0.860002041,
    "sadness": 0.00279347179,
    "surprise": 0.00004343303
  },
  "useranswer": "", 
  "answer": "angry",
  "url": "http://www.bodylanguageinsider.com/images/timrothanger.jpg"
},
{
  "id": 7,
  "imagename": "slightlysad",
  "apianswer": {
    "anger": 0.000142018485,
    "contempt": 0.000665729167,
    "disgust": 0.00000255418331,
    "fear": 3.5447917e-7,
    "happiness": 2.57593371e-7,
    "neutral": 0.9844148,
    "sadness": 0.0147703057,
    "surprise": 0.000003987138
  },
  "useranswer": "", 
  "answer": "sadness",
  "url": "http://careers.bmj.com/article-images/cf2102.f6_default.gif"
},
{
  "id": 8,
  "imagename": "coach",
  "apianswer": {
    "anger": 0.02182101,
    "contempt": 0.0192521457,
    "disgust": 0.06463163,
    "fear": 0.00687443651,
    "happiness": 0.000291729055,
    "neutral": 0.802529752,
    "sadness": 0.07109745,
    "surprise": 0.0135018416
  },
  "useranswer":"",
  "answer": "fear",
  "url": "http://1.bp.blogspot.com/-GDyOxEqj-L0/UrJbmVVcIwI/AAAAAAAAKqQ/sN2d90ZH-qk/s1600/Barry+Hinson%252BRant%252BBasketball+Coach%252BMicroexpression%252BFear%252B036%252B4%252BNonverbal+Communication+Expert%252BBody+Language+Expert%252BSpeaker%252BKeynote%252BLas+Vegas%252BLos+Angeles%252BOrlando%252BNew+York+City.png"
},
{
  "id": 9,
  "imagename": "veryafraid",
  "apianswer": {
    "anger": 0.00411702739,
    "contempt": 0.0021852192,
    "disgust": 0.007312733,
    "fear": 0.8867813,
    "happiness": 0.00003789735,
    "neutral": 0.00582491746,
    "sadness": 0.0487979539,
    "surprise": 0.0449429527
  },
  "useranswer": "", 
  "answer": "fear",
  "url": "http://www.all-the-news.com/wp-content/uploads/2015/03/acc39d207.jpg"
}]

imageDatas.forEach( (obj) => {
  Quiz.create(obj, function(err, obj){
    if (err) return handleError(err)
  })
})

// { "id" : 1, 
//   "imagename" : "princewilliam", 
//   "apianswer" : { "neutral" : "0.55639863", "happiness" : "0.0702050254", "disgust" : "0.19272536", "contempt" : "0.140492767" }, 
//   "useranswer": "", 
//   "answer" : "contempt", 
//   "url" : "http://3.bp.blogspot.com/-CQYp1eoAqOU/UhLtnyAazWI/AAAAAAAAJUY/yycH3-d_MKU/s1600/Prince+William+George+Catherine+Kate+Interview+Contempt+Microexpression+Nonverbal+Communication+Expert+Body+Language+Expert+Speaker+Keynote+Las+Vegas+Los+Angeles+Orlando+New+York+City.png"
// },
// { "id" : 2, "imagename" : "obama", "apianswer" : { "neutral" : "0.5638945", "happiness" : "0.430090666" }, "useranswer": "",  "answer" : "happiness", "url" : "http://2.bp.blogspot.com/--p2DFR56VVQ/UaACyzrosDI/AAAAAAAAIhg/87WsdFu8uv4/s1600/Obama+Heckler+Before+Anger+Smile+Emotional+Dissonance+Eyes+Open+Wide+Microexpression+Nonverbal+Communication+Expert+Body+Language+Expert+Speaker+Keynote+Las+Vegas+Los+Angeles+Orlando.png"},
// { "id" : 3, "imagename" : "slightlysurprised", "apianswer" : { "surprise" : "0.08204402", "neutral" : "0.8167262" }, "useranswer": "", "answer" : "surprise", "url" : "https://i.guim.co.uk/img/static/sys-images/Lifeandhealth/Pix/pictures/2009/5/12/1242118482236/Tim-Roth---surprise-001.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=d8a6c50d85a1ed26859833bc3371f9f4"},
// { "id" : 4, "imagename" : "donaldtrump", "apianswer" : { "neutral" : "0.7689357", "contempt" : "0.17257525" }, "useranswer": "", "answer" : "contempt", "url" : "https://2.bp.blogspot.com/-jcUnY7OeeAk/WArQMyJ4l4I/AAAAAAAAUss/jSQ-9lYTPs8U_EtEC20dING-tSvbqUOUQCLcB/s1600/Donald%2BTrump%252BHillary%2BClinton%252B3rd%2BPresidential%2BDebate%252BContempt%252BSuch%2Ba%2BNasty%2BWoman%252BEmotional%2BIntelligence%252BBody%2BLanguage%252BBody%2BLanguage%2BExpert%252BNonverbal%252BSpeaker%252BKeynote%252BConsultant%252BLos%2BAngeles%252BLas%2BVegas%252BCalifornia%252BNYC%252BOrlando%252B2.png"},
// { "id" : 5, "imagename" : "slightlyangry", "apianswer" : { "neutral" : "0.99980855" }, "useranswer": "", "answer" : "angry", "url" : "http://careers.bmj.com/article-images/cf2102.f4_default.gif"},
// { "id" : 6, "imagename" : "angryimg2", "apianswer" : { "neutral" : "0.860002041", "anger" : "0.127202943" },"useranswer": "",  "answer" : "angry", "url" : "http://www.bodylanguageinsider.com/images/timrothanger.jpg"},
// { "id" : 7, "imagename" : "slightlysad", "apianswer" : { "neutral" : "0.9844148" }, "useranswer": "", "answer" : "sadness", "url" : "http://careers.bmj.com/article-images/cf2102.f6_default.gif"},
// { "id" : 8, "imagename" : "coach", "apianswer" : { "sadness" : "0.07109745", "neutral" : "0.802529752", "disgust" : "0.06463163" }, "useranswer": "", "answer" : "fear", "url" : "http://1.bp.blogspot.com/-GDyOxEqj-L0/UrJbmVVcIwI/AAAAAAAAKqQ/sN2d90ZH-qk/s1600/Barry+Hinson%252BRant%252BBasketball+Coach%252BMicroexpression%252BFear%252B036%252B4%252BNonverbal+Communication+Expert%252BBody+Language+Expert%252BSpeaker%252BKeynote%252BLas+Vegas%252BLos+Angeles%252BOrlando%252BNew+York+City.png"},
// { "id" : 9, "imagename" : "veryafraid", "apianswer" : { "fear" : "0.8867813" }, "useranswer": "", "answer" : "fear", "url" : "http://www.all-the-news.com/wp-content/uploads/2015/03/acc39d207.jpg"}

// ]