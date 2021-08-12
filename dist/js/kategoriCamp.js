
const database = firebase.firestore();
const userCollection = database.collection('Kategori');
var statusAdd = false;
var statusValidateAdd = false;
var statusValidateEdit = false;

function addKat(){
  var kategori = {
    namaKat: $("#namaKategoriAdd").val(),
    gambarKat: $("#gambarKategoriAdd").val(),
    // tanggal: firebase.firestore.FieldValue.serverTimestamp(),
  }
  addKategori(kategori);

}

function validationFormAdd() {
  const nama = document.getElementById("namaKategoriAdd");
  const gambar = document.getElementById("gambarKategoriAdd");
  if (!nama.checkValidity()) {
    alert("Nama Kategori harus diisi");
  }else if (!gambar.checkValidity()) {
    alert("Image not Uploaded");
  } else {
    statusValidateAdd = true;
    addKat();
    $('#addModal').modal('hide')
    setTimeout();
  }
}


function validationFormEdit() {
  const nama = document.getElementById("namaKategoriEdit");
  const gambar = document.getElementById("gambarKategoriEdit");
  if (!nama.checkValidity()) {
    alert("Nama Kategori harus diisi");
  }else if (!gambar.checkValidity()) {
    alert("Image not Uploaded");
  } else {
    statusValidateEdit = true;
    editKat();
    $('#editModal').modal('hide')
    setTimeout();
  }
}


// function validationFormEdit() {
//   const nama = document.getElementById("namaCampaignEdit");
//   const dana = document.getElementById("danaCampaignEdit");
//   const deskripsi = document.getElementById("deskripsiEdit");
//   const gambar = document.getElementById("gambarCampaignEdit");
//   if (!nama.checkValidity()) {
//     alert("Nama Campaign harus diisi");
//   } else if (!dana.checkValidity()) {
//     alert("Dana Campaign harus diisi");
//   } else if (!deskripsi.checkValidity()) {
//     alert("Deskripsi harus diisi");
//   } else if (!gambar.checkValidity()) {
//     alert("Image not Uploaded")
//   } else {
//     statusValidateEdit = true;
//     editCampaign();
//     $('#editModal').modal('hide')
//   }
// }

function addKategori(kategori){
  if(statusValidateAdd) {
    firebase.firestore().collection("Kategori").add(kategori);
    alert("Kategori berhasil ditambahkan");
  }else{
    return false;
  }
  
  
}

// Clear modal
let template = null;
    $('.modal').on('show.bs.modal', function(event) {
      template = $(this).html();
    });

    $('.modal').on('hidden.bs.modal', function(e) {
      $(this).html(template);
    });


function readKategori() {
  firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
    document.getElementById("table").innerHTML = `<thead class="thead-dark">
        <tr>
        <th scope="col">#</th>
        <th scope="col">Nama Kategori</th>
        <th scope="col">Gambar</th>
        <th scope="col">Action</th>
      </tr>
    </thead>`;
    var i =1;
    snapshot.forEach(function (kategoriValue) {
      var kategori = kategoriValue.data();
      document.getElementById("table").innerHTML += `
            <tbody>
            <tr>
              <th scope="row">${i++}</th>
              <td class="card-title nama">${kategori.namaKat}</td>
              <td class="name"><img class="card-img-top" src="${kategori.gambarKat}" alt="Card image cap"></td>
              <td class="gambar" style="display:none"><p>${kategori.gambarKat}</p></td>             
              <td>
                  
                  <button type="button" id="edit-kategori-btn" data-heroId="${kategoriValue.id}" class="btn btn-success edit-kategori-btn" data-toggle="modal" data-target="#editModal" data-backdrop="static" data-keyboard="false">Edit</button>
                  <button type="submit" class="btn btn-success" onclick="deleteCamp('${kategoriValue.id}')">Hapus</button>
              </td>
            </tr>
          </tbody>
`

    });
  });
}

function deleteCamp(id){
  firebase.firestore().collection("Kategori").doc(id).delete().then(() => {
    console.log("data dihapus");
    setTimeout();
  });
}

$(document).on('click', '.edit-kategori-btn', function(){
  var kategoriId = $(this).attr('data-heroId');
  console.log("you click " + kategoriId);
  $('#kategoriId').val(kategoriId);


  var nama = $(this).closest('tr').find('.nama').text();
  $('#namaKategoriEdit').val(nama);

  var gambar = $(this).closest('tr').find('.gambar').text();
  $('#gambarKategoriEdit').val(gambar);

  var imageEditt = document.querySelector('#imageEdit');
  imageEditt.src = gambar;


});


function editKat(){
  if(statusValidateEdit){
  const database = firebase.firestore();
  const userCollection = database.collection('Kategori');
   const idKat = $('#kategoriId').val();
        userCollection.doc(idKat).update({
          namaKat: $("#namaKategoriEdit").val(),
          gambarKat : $("#gambarKategoriEdit").val(),
        //   tanggal: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {console.log('Data Successfully');})
        .catch(error  => {console.error(error)});
      }else {
        return false;
      }
}


function uploadImageAdd() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photoAdd").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {

      alert("Image Upload Successful")
      const image = document.querySelector('#imageAdd')
      image.src = url
      document.getElementById("gambarKategoriAdd").value = url

    })
}


function uploadImageEdit() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photoEdit").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(urlEdit => {

      alert("Image Upload Successful")
      const imageEdit = document.querySelector('#imageEdit')
      imageEdit.src = urlEdit
      document.getElementById("gambarKategoriEdit").value = urlEdit

    })
}

setTimeout(function(){
  $( "#table" ).load( "kategoriCampaign.html #table" );
}, 2000);