var inputValue = document.getElementById('input');
var filmName = document.getElementById('filmsText');
var people = document.getElementById('characters');


document.getElementById("button").addEventListener('click',function(){
    run(gen).catch(function(err){
        alert(err.message);
    });
})

function run(genFunc){
  const genObj= genFunc();

  function iterate(iteration){
    if(iteration.done){
      return Promise.resolve(iteration.value);
    }
    return Promise.resolve(iteration.value)
    .then(function(x){
      iterate(genObj.next(x));
    }).catch(function(x){
      iterate(genObj.throw(x));
    })
  }
  try {
    return iterate(genObj.next());
  } catch(ex){
    return Promise.reject(ex);
  }
}


function *gen(){
//check if the film is valid
  if(inputValue.value > 7 && inputValue.value < 1){
    throw new Error('Invalid input, please enter numbers between 1-7');
  }
//fetch the film
  var filmResponse = yield fetch("http://swapi.co/api/films/" + inputValue.value);
  var film = yield filmResponse.json();
//fetch the characters
  var characters = film.characters;
  var characterString = 'Characters: <br/>';
  for(var i = 0; i<characters.length; i++){
    var tempCharacterResponse = yield fetch(characters[i]);
    var tempCharacter = yield tempCharacterResponse.json();
    characterString += tempCharacter.name + '<br />';
  }

//display all
  filmName.innerHTML = 'Film : <br>' + film.title;
  people.innerHTML = characterString;

}
