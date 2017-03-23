var image = document.getElementById('image');
var input = document.getElementById('input');
var output = document.getElementById('output');
var analyseButton = document.getElementById('analyseButton');




analyseButton.addEventListener('click', function(){

  image.innerHTML = '<img src='+"'"+input.value+"'"+'/>'
});
analyseButton.addEventListener('click', analyse);



function analyse(){

  var reqBody = {
    "url": input.value
  }
  var myheader = new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key':'[key]'
  })

  var initObject = {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: myheader
  }

  var request = new Request('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender',initObject)

  fetch(request).then(function(response){
    if(response.ok){
      return response.json();
    }else {
      return Promise.reject(new Error(response.statusText));
    }
  }).then(function(response){
    output.innerHTML = 'Age: ' + response[0].faceAttributes.age +"<br />" +  'Gender: ' + response[0].faceAttributes.gender;
  }).catch(function(err){
    alert("Bad Request");
    output.innerHTML = "No faces detected!";
  })


}
