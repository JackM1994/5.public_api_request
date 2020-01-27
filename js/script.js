//DOM Variables

const gallery = document.getElementById('gallery');
const url = 'https://randomuser.me/api/?results=12&nat=ie,us,gb';
const list = [];
let index = 0;
const modal = document.createElement('div');
const closeBtn = document.createElement('span');
const modalWindow = document.createElement('div');
modal.className = 'modal-container';
closeBtn.className = 'modal-close-btn';
modalWindow.className = 'modal';

//search bar
function searchBar() {
  const search = document.querySelector(".search-container");
  const searchbar= `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
 </form>
`;
search.innerHTML += searchbar;
}
//call the searchBar function
searchBar();

//fetch 12 Random Users
fetch(url)
  .then(response => response.json())
  .then(data => {
    listEmployees(data.results);
    console.log(data.results);
  })
  
//Display randomUser Data
function listEmployees(data) {
  data.map(result => {
    const info = `
    <div class= "card" index = ${index} >
                    <div class="card-img-container">
                        <img class="card-img" src="${result.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${result.name.first} ${result.name.last}</h3>
                        <p class="card-text">${result.email}</p>
                        <p class="card-text cap">${result.location.city}</p>
                    </div>
                </div>
    
   `
   index++;
   list.push(result);
   gallery.innerHTML += info;
   console.log(gallery);
 })
};


function modalInfo(index) {
  const card = document.querySelector('.gallery');
  const person = list[index];
  console.log(index);
  const birthday = new Date(person.dob.date).toLocaleString().split(',')[0];
  const info = `
      <div class="modal-info-container">
          <img class="card-img" src="${person.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="modal-text">${person.email}</p>
          <p class="modal-text cap">${person.location.city}</p>
          <hr>
          <p class="modal-text">${person.cell}</p>
          <p class="modal-text">${person.location.street.number} ${person.location.street.name} ${person.location.state} ${person.location.postcode}</p>
          <p class="modal-text">${birthday}</p>
      
  </div>`

  card.appendChild(modal);
  closeBtn.innerHTML = '&times';
  modalWindow.innerHTML = info;
  modal.appendChild(modalWindow);
  modal.appendChild(closeBtn);
};


// help function


function getIndex(e) {
  if(e.target.className === 'card') {
    return e.target.getAttribute('index');
  } else if (e.target.parentNode.className === 'card') {
    return e.target.parentNode.getAttribute('index');
  }
}

function creatModal(e) {
  const modal = document.querySelector('.modal-container');
  let personIndex = getIndex(e);
  modalInfo(personIndex);
  return modalInfo;
}

function openModal() {
  modal.style.display = 'block';
  modalWindow.style.display = 'block';
  closeBtn.style.display = 'block';
}

function closeModal() {
  modal.style.display ='none';
  modalWindow.style.display = 'none';
  closeBtn.style.display = 'none';
}


function outsideClose(e) {
  if(e.target === modalWindow || e.target === modal) {
    closeModal();
  }
}

// Events

gallery.addEventListener('click', (e) => {
  if (e.target.className === 'card' || e.target.className === 'card-img-container' ) {
    creatModal(e);
    openModal();
  }
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', outsideClose);

document.addEventListener('keydown', closeModal);