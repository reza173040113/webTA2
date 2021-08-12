const database = firebase.firestore();

function readAsp() {
    firebase.firestore().collection("Aspirasi").where("isEnable", "==", "n").onSnapshot(function (snapshot) {
    let html = '';
    let i = 1;
    console.log(snapshot.docs.length);
    const data = document.getElementById("table");

    html += `
    <thead class="thead-dark">
        <tr>
        <th scope="col">#</th>
        <th scope="col">Nama Aspirasi</th>
        <th scope="col">Deskripsi</th>
        <th scope="col">Pengirim</th>
        <th scope="col">Action</th>
      </tr>
    </thead>`;
   
    if (snapshot.docs.length == 0) {
      html += `
      <tbody class="table tbody">
        <tr>
            <td colspan="4"><h1 style="text-align:center">Belum ada aspirasi</h1></td>
        </tr>
      </tbody>`
    } else {
      snapshot.forEach(function (aspirasiValue) {
      const aspirasi = aspirasiValue.data();
      html += `
      <tbody class="table tbody">
        <tr>
          <th scope="row">${i++}</th>
          <td class="table tbody name">${aspirasi.name}</td>
          <td class="table tbody deskripsi">${aspirasi.deskripsi}</td>
          <td class="table tbody namaPengirim">${aspirasi.namaPengirim}</td>
          <td><button type="button" id="edit-aspirasi-btn" data-heroId="${aspirasiValue.id}" class="btn btn-success edit-aspirasi-btn" data-toggle="modal" data-target="#editModal">Post</button></td>
        </tr>
      </tbody>`
      });
    }
  
    data.innerHTML = html;
  });
}

function readPostAsp() {
 firebase.firestore().collection("Aspirasi").where("isEnable", "==", "y").onSnapshot(function (snapshot) {
    let html = '';
    let i = 1;
    console.log(snapshot.docs.length);
    const data = document.getElementById("table");

    html += `
    <thead class="thead-dark">
        <tr>
        <th scope="col">#</th>
        <th scope="col">Nama Aspirasi</th>
        <th scope="col">Deskripsi</th>
        <th scope="col">Pengirim</th>
        <th scope="col">Jumlah Like</th>
      </tr>
    </thead>`;
   
    if (snapshot.docs.length == 0) {
      html += `
      <tbody class="table tbody">
        <tr>
            <td colspan="4"><h1 style="text-align:center">Belum ada postingan</h1></td>
        </tr>
      </tbody>`
    } else {
      snapshot.forEach(function (aspirasiValue) {
      const aspirasi = aspirasiValue.data();
      html += `
      <tbody class="table tbody">
        <tr>
          <th scope="row">${i++}</th>
          <td class="table tbody name">${aspirasi.name}</td>
          <td class="table tbody deskripsi">${aspirasi.deskripsi}</td>
          <td class="table tbody namaPengirim">${aspirasi.namaPengirim}</td>
          <td>${aspirasi.jumlahLike}</td>
        </tr>
      </tbody>`
      });
    }
  
    data.innerHTML = html;
  });
}
//fungsi untuk post aspirasi
$('#edit-newhero-button').click(function post(){
  const database = firebase.firestore();
  const userCollection = database.collection('Aspirasi');
  
   const idAsp = $('#heroId').val();
        userCollection.doc(idAsp).update({
          name: $("#inputNamaAspirasiEdit").val(),
          deskripsi: $("#inputDeskripsiEdit").val(),
          tanggal: firebase.firestore.FieldValue.serverTimestamp(),
          jumlahLike: 0,
          isEnable: "y",
          namaPengirim: $("#inputNamaPengirimEdit").val(),
        })
        .then(() => {alert("Aspirasi dan Keluhan berhasil di post!!!");})
        .catch(error  => {console.error(error)});
  
});

$(document).on('click', '.edit-aspirasi-btn', function tampilById(){
  var heroId = $(this).attr('data-heroId');
  $('#heroId').val(heroId);
  console.log("you click " + heroId);
  var nama = $(this).closest('tr').find('.name').text();
  var deskripsi = $(this).closest('tr').find('.deskripsi').text();
  var namaPengirim = $(this).closest('tr').find('.namaPengirim').text();
  $('#inputNamaAspirasiEdit').val(nama);
  $('#inputDeskripsiEdit').val(deskripsi);
  $('#inputNamaPengirimEdit').val(namaPengirim);

});
// $(document).ready(function() {
//     var nama = $(this).closest('tr').find('.name').text();
//   $('#table').DataTable({
//             paging: true,
//             searching: false,
//                   processing: true,
//     "aoColumnDefs": [
//          { "aDataSort": [ 0, 1 ], "aTargets": [ 0 ] },
//          { "aDataSort": [ 1, 0 ], "aTargets": [ 1 ] },
//        ]
//   });
// });


function searching() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}