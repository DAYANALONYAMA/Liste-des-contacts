const btncreer = document.querySelector(".button-1");
let idAModifier = "";
btncreer.addEventListener("click", (event) => {
  event.preventDefault();
  let prenom = document.querySelector("#prenom").value;
  let nom = document.querySelector("#nom").value;
  let telephone = document.querySelector("#telephone").value;
  let groupe = document.querySelector("#groupe").value;
  let email = document.querySelector("#email").value;
  let bio = document.querySelector("#bio").value;
  let picture = document.querySelector(".drag-area img")?.src || "";
  if (idAModifier === "") {
    let id = "d-" + Date.now().toString();
    let contenu = `
    <div class="contact-1" id="${id}">
      <div class="image">
        <img src="${picture} alt="photo-utilisateur" class="monimg" />
      </div>
      <div class="all-contact">
        <div class="align">
          <div class="all-contact2">
            <p class="prenom">${prenom}</p>
            <p class="nom">${nom}</p>
            <p class="group">${groupe}</p>
            <div class="icon">
              <button class="edit" onClick="edit(this, '${id}')"></button>
              <button class="delete" onClick="effacer(this)"></button>
            </div>
          </div>

          <div class="mail-phone">
            <p class="phone">${telephone}</p>
            <p class="email">${email}</p>
          </div>
          <p class="paragraph">${bio}</p>
        </div>
      </div>
    </div>
  `;
    let recuperation = document.querySelector(".contenair_droit");
    recuperation.innerHTML += contenu;
  } else {
    // TODO: implementer la logique de modification
    let editParent = document.querySelector(`#${idAModifier}`);
    editParent.querySelector(".prenom").textContent = prenom;
    editParent.querySelector(".nom").textContent = nom;
    editParent.querySelector(".phone").textContent = telephone;
    editParent.querySelector(".group").textContent = groupe;
    editParent.querySelector(".email").textContent = email;
    editParent.querySelector(".paragraph").textContent = bio;
    idAModifier = "";
  }

  btncreer.textContent = "Créer";
  forme.reset();
});
function effacer(madiv) {
  let supprimer =
    madiv.parentElement.parentElement.parentElement.parentElement.parentElement;
  supprimer.remove();
}
const btnrenit = document.querySelector(".button-2");
let forme = document.querySelector("form");
btnrenit.addEventListener("click", (event) => {
  event.preventDefault();
  btncreer.textContent = "Créer";
  forme.reset();
});

function edit(madiv, id) {
  let editParent =
    madiv.parentElement.parentElement.parentElement.parentElement.parentElement;
  console.log(id);
  idAModifier = id;
  document.querySelector("#prenom").value =
    editParent.querySelector(".prenom").textContent;
  document.querySelector("#nom").value =
    editParent.querySelector(".nom").textContent;
  document.querySelector("#telephone").value =
    editParent.querySelector(".phone").textContent;
  document.querySelector("#groupe").value =
    editParent.querySelector(".group").textContent;
  document.querySelector("#email").value =
    editParent.querySelector(".email").textContent;
  document.querySelector("#bio").value =
    editParent.querySelector(".paragraph").textContent;
  btncreer.textContent = "Modifier";
}
const dropArea = document.querySelector(".drag-area");
let file;
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
});
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});
function showFile() {
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if (validExtensions.includes(fileType)) {
    //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
