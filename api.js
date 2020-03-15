const axios = require('axios');

axios.get('https://api.github.com/users/SurrealSam')
  .then(response => {
    console.log(response.data);
    console.log(response.data.login);

    
  })
  .catch(error => {
    console.log(error);
  });


//   axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
//   .then(response => {
//     console.log(response.data.url);
//     console.log(response.data.explanation);
//   })
//   .catch(error => {
//     console.log(error);
//   });