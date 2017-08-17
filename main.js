let container = document.querySelector(".container")
let button = document.querySelector(".button");
let input = document.querySelector(".song");
let searchResults = document.querySelector(".results");
let player = document.querySelector(".music")
let audioSource = document.querySelector(".audioSource");
let albumBtn = document.querySelectorAll(".albumBtn")

container.addEventListener("click", function(result) {
  let inputValue = input.value;

  if (result.target === button) {
    searchResults.innerHTML = "";
    fetch(`https://itunes.apple.com/search?term=${inputValue}`).then(

        function(response) {

          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

          response.json().then(function(obj) {

            let results = obj.results;

            results.forEach(function(track) {

              var albumCover = track.artworkUrl100
              var sample = track.previewUrl
              var artist = track.artistName
              var songTitle = track.trackName

              var tracks = `<div class="wrapper">
                              <div class="sampleSrc" src="${sample}"> </div>
                              <a href="#" src="${sample}"><button class="albumBtn" name="button" >
                              <img class="image" value="${sample}" src="${albumCover}" alt="album_cover"></button></a>
                              <div id="title">
                                <p><a href="#" src="${sample}">${artist}</a></p>
                                <p><a href="#" src="${sample}">${songTitle}</a></p>
                              </div>
                            </div>`

              searchResults.innerHTML += tracks;

            });
          });
        })
      .catch(function(err) {
        console.log("fetch error :-S", err);
      });
  }

  if (result.target && result.target.matches("img.image")) {
    audioSource.src = result.target.getAttribute('value');
    player.load();
    player.play();
  }
});
