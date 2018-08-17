// write a function to retrieve a blob of json
// make an ajax request! Use the 'fetch' function
// https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
//     fetch('https://rallycoding.herokuapp.com/api/music_albums') // fetch() returns a promise object that represents the request
//         .then(res => res.json()) // res.json() also returns a promise object
//         .then(json => console.log(json));
// }

// How to convert to async/await?
// STEP ONE: Find the function that contains asynchronous code and put async keyword in front of it
async function fetchAlbums() {
    // STEP TWO: Anything that returns a promise, put await keyword in front of it and assign it to an intermediate variable
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json = await res.json();

    console.log(json);
}

fetchAlbums();