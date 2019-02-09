//Variables for adding modules
var dotenv = require('dotenv').config();
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require("axios");
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var giphy = require('giphy-api')('CIR4y0picv4QO67XYRsFaInN8H84gDlm');

//Variables regarding user input
var action = process.argv[2]
var term = process.argv.splice(3)
console.log(term)

check();

function check() {

    //If statement for searching gifs //Done
    if (action === "get-giphy") {

        if (term == ""){
            var URL = "http://api.giphy.com/v1/gifs/search?q=batman&api_key=CIR4y0picv4QO67XYRsFaInN8H84gDlm&limit=1"
            axios.get(URL).then(function (res) {
                console.log(JSON.stringify(res.data.data[0].images.fixed_height_still.url))
            });
        }
        else{
        var URL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=CIR4y0picv4QO67XYRsFaInN8H84gDlm&limit=1"
        axios.get(URL).then(function (res) {
            console.log(JSON.stringify(res.data.data[0].images.fixed_height_still.url))
        });
    }
    }


    //If statement for searching music // Done
    else if (action === "spotify-this-song") {
        if (term == ""){
         spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("__________________________________________")
                console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
                console.log("__________________________________________")
                console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name));
                console.log("__________________________________________")
                console.log("Preview song at: " + JSON.stringify(data.tracks.items[0].preview_url));
                console.log("__________________________________________")
                console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name));
                console.log("__________________________________________")
            });
        }

        else{
        spotify.search({ type: 'track', query: term }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("__________________________________________")
            console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
            console.log("__________________________________________")
            console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name));
            console.log("__________________________________________")
            console.log("Preview song at: " + JSON.stringify(data.tracks.items[0].preview_url));
            console.log("__________________________________________")
            console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name));
            console.log("__________________________________________")
        });
    }
    }


    //If statement for searching for movies // Done
    else if (action === "movie-this") {

        if (term == "") {
            var URL = "http://www.omdbapi.com/?apikey=696b90b9&t=Mr%20Nobody";
            axios.get(URL).then(function (response) {
                console.log("__________________________________________")
                console.log("Title: " + response.data.Title);
                console.log("__________________________________________")
                console.log("Year it came out: " + response.data.Year)
                console.log("__________________________________________")
                console.log("IMDB Rating: " + response.data.Rated)
                console.log("__________________________________________")
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("__________________________________________")
                console.log("Country " + response.data.Title + " was produced: " + response.data.Country)
                console.log("__________________________________________")
                console.log("Language(s) spoken in " + response.data.Title + ": " + response.data.Language)
                console.log("__________________________________________")
                console.log("Plot: " + response.data.Plot)
                console.log("__________________________________________")
                console.log("Actors: " + response.data.Actors)
                console.log("__________________________________________")
            })
        }
        else {
            var URL = "http://www.omdbapi.com/?apikey=696b90b9&t=" + term;
            axios.get(URL).then(function (response) {
                console.log("__________________________________________")
                console.log("Title: " + response.data.Title);
                console.log("__________________________________________")
                console.log("Year it came out: " + response.data.Year)
                console.log("__________________________________________")
                console.log("IMDB Rating: " + response.data.Rated)
                console.log("__________________________________________")
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("__________________________________________")
                console.log("Country " + response.data.Title + " was produced: " + response.data.Country)
                console.log("__________________________________________")
                console.log("Language(s) spoken in " + response.data.Title + ": " + response.data.Language)
                console.log("__________________________________________")
                console.log("Plot: " + response.data.Plot)
                console.log("__________________________________________")
                console.log("Actors: " + response.data.Actors)
                console.log("__________________________________________")
            })
        }
    }

    //If statement for searching the random.txt and doing what is says :(
    else if (action == "do-what-it-says") {
        fs.readFile("./random.txt", 'utf8', (err, term) => {
            check();
            term = term.splice(1);


            if (err) throw err;
            console.log(err);

            //I need to find a way to keep the file open so I can splice the action off 
            //after we do the recursive loop then use term.

        });
    }
    //Just incase their action was misspelled etc.
    else {
        console.log("Invalid Action")
    }
}
// function concert(){}
// function song(){
//     data = data.splice(1)
//     console.log(data)
//     spotify.search({ type: 'track', query: data }, function(err, data) {
//         if (err) {
//           return console.log('Error occurred: ' + err);
//         }

//       console.log(JSON.stringify(data.tracks.items)); 
//       });
// }
// function movie(){
//     data = data.splice(1)
//     if (data == ""){
//         var URL = "http://www.omdbapi.com/?apikey=696b90b9&t=Mr%20Nobody";
//         axios.get(URL).then(function(response){
//         console.log("__________________________________________")
//         console.log("Title: " + response.data.Title);
//         console.log("__________________________________________")
//         console.log("Year it came out: " + response.data.Year)
//         console.log("__________________________________________")
//         console.log("IMDB Rating: " + response.data.Rated)
//         console.log("__________________________________________")
//         console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
//         console.log("__________________________________________")
//         console.log("Country "+ response.data.Title + " was produced: " + response.data.Country)
//         console.log("__________________________________________")
//         console.log("Language(s) spoken in " + response.data.Title + ": " + response.data.Language)
//         console.log("__________________________________________")
//         console.log("Plot: " + response.data.Plot)
//         console.log("__________________________________________")
//         console.log("Actors: " + response.data.Actors)
//         console.log("__________________________________________")
//         })
//         }
//         else
//         {
//         var URL = "http://www.omdbapi.com/?apikey=696b90b9&t=" + data;
//         axios.get(URL).then(function(response){
//         console.log("__________________________________________")
//         console.log("Title: " + response.data.Title);
//         console.log("__________________________________________")
//         console.log("Year it came out: " + response.data.Year)
//         console.log("__________________________________________")
//         console.log("IMDB Rating: " + response.data.Rated)
//         console.log("__________________________________________")
//         console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
//         console.log("__________________________________________")
//         console.log("Country "+ response.data.Title + " was produced: " + response.data.Country)
//         console.log("__________________________________________")
//         console.log("Language(s) spoken in " + response.data.Title + ": " + response.data.Language)
//         console.log("__________________________________________")
//         console.log("Plot: " + response.data.Plot)
//         console.log("__________________________________________")
//         console.log("Actors: " + response.data.Actors)
//         console.log("__________________________________________")
//         })
//         }

// }


