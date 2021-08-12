
const database = firebase.firestore();
const userCollection = database.collection('Campaign');
var statusAdd = false;
var campaign;


// Clear modal
let template = null;
$('.modal').on('show.bs.modal', function (event) {
    template = $(this).html();
});

$('.modal').on('hidden.bs.modal', function (e) {
    $(this).html(template);
});


function detailShow(id) {
    userCollection.doc(id).get()
        .then(campaigns => {
            campaign = campaigns.data();
            if (campaigns.exists)
                document.getElementById("detailSection").innerHTML += `
        <img class="card-img-top" src="${campaign.gambarCampaign}" alt="Card image cap">
        <div class="card-body">
          <h4 class="card-title">${campaign.namaCampaign}</h4>
          <p class="card-text kategori"> Kategori ${campaign.kategori}</p>
          <p class="card-text dana">Dana yang terkumpul ${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(campaign.danaTerkumpul)} dari ${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(campaign.danaCampaign)}</p>
          <p class="deskTitle">Deskripsi :</p>
          <p class="card-text">${campaign.deskripsi}</p>
        </div>
      </div>
        
    `
            else
                console.log('Campaign does not exist !');
        })
        .catch(error => {
            console.error(error);
        });
}

function readKategori() {
    firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
        snapshot.forEach(function (kategoriValue) {
            var kategori = kategoriValue.data();

            document.getElementById("kategoriAdd").innerHTML += `
      <option value="${kategori.namaKat}">${kategori.namaKat}</option>
`
            document.getElementById("kategoriEdit").innerHTML += `
<option value="${kategori.namaKat}">${kategori.namaKat}</option>
`


        });
    })
}

function readDonasi() {
    firebase.firestore().collection("Donasi").onSnapshot(function (snapshot) {
        document.getElementById("table").innerHTML = `<thead class="thead-dark">
          <tr>
                  
                  <th scope="col" width="50 px">#</th>
                  <th scope="col">Nama Donatur</th>
                  <th scope="col" width="150 px">email</th>
                  <th scope="col">nomor</th>
                  <th scope="col">jumlah</th>
                  <th scope="col">status</th>
                  
 
        </tr>
      </thead>`;
        var i = 1;
        snapshot.forEach(function (donasiValue) {
            var donasi = donasiValue.data();
            document.getElementById("table").innerHTML += `
              <tbody>
              <tr>
                <th scope="row">${i++}</th>
                <td class="card-title nama">${donasi.namaDonatur}</td>
                <td class="email">${donasi.email}</td>
                <td class= "nomor">${donasi.nomor}</td>
                <td class="danaKebutuhan">${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(donasi.totalAmount)}</td>
               <td class= "nomor">${donasi.status}</td>
                            
                
              </tr>
            </tbody>
  `
        });
    });
}

// function readDonasi() {
//   firebase.firestore().collection("Campaign").onSnapshot(function (snapshot) {
//     document.getElementById("table").innerHTML = `<thead class="thead-dark">
//         <tr>
//         <th scope="col" width="50 px">#</th>
//         <th scope="col">Nama Donatur</th>
//         <th scope="col" width="120 px">email</th>
//         <th scope="col">nomor</th>
//         <th scope="col">jumlah</th>
//         <th scope="col">status</th>
//         <th scope="col">Action</th>
//       </tr>
//     </thead>`;
//     var i = 1;
//     snapshot.forEach(function (donasiValue) {
//       var donasi = donasiValue.data();
//       document.getElementById("table").innerHTML += `
//             <tbody>
//             <tr>
//               <th scope="row">${i++}</th>
//               <td class="card-title nama">${donasi.namaDonatur}</td>
//               <td class="email">${donasi.email}</td>
//               <td class= "nomor">${donasi.nomor}</td>
//               <td class="danaKebutuhan">${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(donasi.totalAmount)}</td>
//               <td class= "nomor">${donasi.status}</td>
//               <td>
//                    <button type="button" id="detail-btn"  class="btn btn-success" onclick="detailShow('${campaignValue.id}')" data-toggle="modal" data-target="#detailModal">Details</button>
//                   <button type="button" id="edit-campaign-btn" data-heroId="${campaignValue.id}" class="btn btn-success edit-campaign-btn" data-toggle="modal" data-target="#editModal">Edit</button>
//                   <button type="submit" class="btn btn-success" onclick="deleteCamp('${campaignValue.id}')">Hapus</button>
//               </td>
//             </tr>
//           </tbody>
// `
//     });
//   });
// }

function deleteCamp(id) {
    firebase.firestore().collection("Campaign").doc(id).delete().then(() => {
        console.log("data dihapus");
    });
}

$(document).on('click', '.edit-campaign-btn', function () {
    var campaignId = $(this).attr('data-heroId');
    console.log("you click " + campaignId);
    $('#campaignId').val(campaignId);


    var nama = $(this).closest('tr').find('.nama').text();
    $('#namaCampaignEdit').val(nama);

    var dana = $(this).closest('tr').find('.danaCampaign').text();
    $('#danaCampaignEdit').val(dana);

    var kategori = $(this).closest('tr').find('.kategori').text();
    $('#kategoriEdit').val(kategori);

    var deskripsi = $(this).closest('tr').find('.deskripsi').text();
    $('#deskripsiEdit').val(deskripsi);

    var danaTerkumpul = $(this).closest('tr').find('.danaTerkumpul').text();
    $('#danaTerkumpulEdit').val(danaTerkumpul);

    var gambar = $(this).closest('tr').find('.gambar').text();
    $('#gambarCampaignEdit').val(gambar);


});


$('#edit-campaign-button').click(function () {
    var danaKeb = $("#danaCampaignEdit").val();
    var danaKebutuhan = parseInt(danaKeb);
    var danaTer = $("#danaTerkumpulEdit").val();
    var danaTerkumpul = parseInt(danaTer);
    const database = firebase.firestore();
    const userCollection = database.collection('Campaign');
    const idCamp = $('#campaignId').val();
    userCollection.doc(idCamp).update({
        namaCampaign: $("#namaCampaignEdit").val(),
        deskripsi: $("#deskripsiEdit").val(),
        danaCampaign: danaKebutuhan,
        danaTerkumpul: danaTerkumpul,
        kategori: $("#kategoriEdit").val(),
        gambarCampaign: $("#gambarCampaignEdit").val(),
        tanggal: firebase.firestore.FieldValue.serverTimestamp(),
    })
        .then(() => { console.log('Data Successfully'); })
        .catch(error => { console.error(error) });

});


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
            document.getElementById("gambarCampaignAdd").value = url

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
            document.getElementById("gambarCampaignEdit").value = urlEdit

        })
}


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