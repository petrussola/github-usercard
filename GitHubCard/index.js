/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// axios.get('https://lambda-github-api-server.herokuapp.com/')

const container = document.querySelector(".cards");

function getData(follower) {
  axios({
    method: 'get',
    url: 'https://api.github.com/users/' + follower,
    auth: {
      username: '*******',
      password: '*****'
    }
  })
    .then(data => {
      // debugger
      const newCard = cardBuilder(data.data);
      container.appendChild(newCard);
      // console.log(data.data);
    })
    .catch(error => {
      // debugger
    })
}

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['samuel-mpere', 'ifiokudoidiok', 'richanynguon', 'curm90'];
// followersArray.forEach( follower => {
//   getData(follower);
// })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardBuilder(userData) {
  // debugger
  // create card elements
  const card = document.createElement('div');
  card.classList.add('card');

  const userImage = document.createElement('img');
  userImage.src = userData.avatar_url;
  card.appendChild(userImage);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  card.appendChild(cardInfo);

  const usersName = document.createElement('h3');
  usersName.classList.add('name')
  usersName.textContent = userData.name;
  cardInfo.appendChild(usersName);

  const usersUserName = document.createElement('p');
  usersUserName.classList.add('username')
  usersUserName.textContent = userData.login;
  cardInfo.appendChild(usersUserName);

  const userLocation = document.createElement('p');
  userLocation.textContent = userData.location;
  cardInfo.appendChild(userLocation);

  const profile = document.createElement('p');
  profile.textContent = 'Profile: ';
  cardInfo.appendChild(profile);

  const githubPage = document.createElement('a');
  githubPage.setAttribute('href', userData.html_url);
  githubPage.textContent = userData.html_url;
  profile.appendChild(githubPage);

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${userData.followers}`;
  cardInfo.appendChild(followers);

  const following = document.createElement('p');
  following.textContent = `Following: ${userData.following}`;
  cardInfo.appendChild(following);

  const bio = document.createElement('p');
  bio.textContent = `Bio: ${userData.bio}`;
  cardInfo.appendChild(bio);

  return card;
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// stretch goal 1

const newFollowersArray = [];

function addFollowersToArray(array) {
  // debugger
  axios({
    method: 'get',
    url: 'https://api.github.com/users/petrussola/followers',
    auth: {
      username: '*******',
      password: '*******'
    }
  })
    .then(data => {
      // debugger
      for (let i = 0; i < data.data.length; i++) {
        array.push(data.data[i].login);
        getData(array[i]);
      }
    })
    .catch(error => {
      // debugger
    })
  }
  
  // function displayDataDom(array) {
    //   debugger
    //   array.forEach(follower => {
      //     getData(follower);
      //   });
      // }
    
addFollowersToArray(newFollowersArray);