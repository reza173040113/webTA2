
const database = firebase.firestore();
const collection = database.collection('Campaign');
var statusAdd = false;
var campaign;
var statusValidateAdd = false;
var statusValidateEdit = false;
let kategoriTerpilih = $(this).closest('tr').find('.kategori').text();;

function addCamp() {
  var dana = $("#danaCampaignAdd").val();
  var dana2 = parseInt(dana);
  campaign = {
    namaCampaign: $("#namaCampaignAdd").val(),
    danaCampaign: dana2,
    danaTerkumpul: 0,
    isEnable : "true",
    deskripsi: $("#deskripsiAdd").val(),
    kategori: $("#kategoriAdd").val(),
    gambarCampaign: $("#gambarCampaignAdd").val(),
    tanggal: firebase.firestore.FieldValue.serverTimestamp(),
  }
  addCampaign(campaign);
}

function calculatePercent(danaTerkumpul, danaCampaign) {
  return danaTerkumpul / danaCampaign * 100;
}

function detailShow(id) {
  getDetail(id).get()
    .then(campaigns => {
      campaign = campaigns.data();
      kategoriTerpilih = campaign.kategori;
      if (campaigns.exists)
        document.getElementById("detailSection").innerHTML += `
        <img class="card-img-top" src="${campaign.gambarCampaign}" alt="Card image cap">
        <div class="card-body">
          <h4 class="card-title" style="font-size: 20px;">${campaign.namaCampaign}</h4>
          <p class="card-text kategori"><b> Kategori ${campaign.kategori}</b></p>
          <p class="card-text dana" style="font-size: 12px;">Dana yang terkumpul ${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(campaign.danaTerkumpul)} dari ${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(campaign.danaCampaign)}</p>
          <div class="progress">
  <div class="progress-bar bg-success" role="progressbar" style="width: ${calculatePercent(campaign.danaTerkumpul, campaign.danaCampaign)}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
</div>
          <p class="deskTitle"><b>Deskripsi :</b></p>
          <p class="card-text" style="font-size: 14px;">${campaign.deskripsi}</p>
          <p class="card-text" style="font-size: 14px;">${campaign.isEnable}</p>
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

$(document).on('click', '.edit-campaign-btn', function edit() {
  readKategoriEdit();
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

  var isEnable = $(this).closest('tr').find('.isEnable').text();
  $('#isEnableEdit').val(isEnable);

  var imageEditt = document.querySelector('#imageEdit');
  imageEditt.src = gambar;

  kategoriTerpilih = kategori;


});

function uploadImageAdd() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photoAdd").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  imageAdd(ref, name, file, metadata);

}

function uploadImageEdit() {
  const ref = firebase.storage().ref()
  const file = document.querySelector("#photoEdit").files[0]
  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  imageEdit(ref, name, file, metadata);
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

let template = null;
$('.modal').on('show.bs.modal', function showModalClear(event) {
  template = $(this).html();
});

$('.modal').on('hidden.bs.modal', function hiddenModalClear(e) {
  $(this).html(template);
});

// $('#editModal').modal({backdrop: 'static', keyboard: false}); 

function validationFormAdd() {
  const nama = document.getElementById("namaCampaignAdd");
  const dana = document.getElementById("danaCampaignAdd");
  const deskripsi = document.getElementById("deskripsiAdd");
  const gambar = document.getElementById("gambarCampaignAdd");
  if (!nama.checkValidity()) {
    alert("Nama Campaign harus diisi");
  } else if (!dana.checkValidity()) {
    alert("Dana Campaign harus diisi");
  } else if (!deskripsi.checkValidity()) {
    alert("Deskripsi harus diisi");
  }  else if (!gambar.checkValidity()) {
    alert("Image not Uploaded")
  }else {
    statusValidateAdd = true;
    addCamp();
    $('#addModal').modal('hide')
    setTimeout();
  }
}


function validationFormEdit() {
  const nama = document.getElementById("namaCampaignEdit");
  const dana = document.getElementById("danaCampaignEdit");
  const deskripsi = document.getElementById("deskripsiEdit");
  const gambar = document.getElementById("gambarCampaignEdit");
  if (!nama.checkValidity()) {
    alert("Nama Campaign harus diisi");
  } else if (!dana.checkValidity()) {
    alert("Dana Campaign harus diisi");
  } else if (!deskripsi.checkValidity()) {
    alert("Deskripsi harus diisi");
  } else if (!gambar.checkValidity()) {
    alert("Image not Uploaded")
  } else {
    statusValidateEdit = true;
    editCampaign();
    $('#editModal').modal('hide')
    setTimeout();
  }
}


//Model

function addCampaign(campaign) {
  // validateAddForm();
  // errorMessage();

  if (statusValidateAdd) {
    collection.add(campaign);
    alert("Campaign berhasil ditambahkan");

  } else {
    return false;
  }



}

function getDetail(id) {
  return collection.doc(id);
}

function readKategori() {
  firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
    snapshot.forEach(function (kategoriValue) {
      var kategori = kategoriValue.data();

      document.getElementById("kategoriAdd").innerHTML += `
      <option value="${kategori.namaKat}">${kategori.namaKat}</option>
`
    });
  })
}

function readKategoriEdit() {
  firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
    snapshot.forEach(function (kategoriValue) {
      var kategori = kategoriValue.data();

      if (kategori.namaKat == kategoriTerpilih) {
        document.getElementById("kategoriEdit").innerHTML += `
  <option value="${kategoriTerpilih}" selected="selected">${kategoriTerpilih}</option>`
      } else {
        document.getElementById("kategoriEdit").innerHTML += `
  <option value="${kategori.namaKat}">${kategori.namaKat}</option>`
      }
    });
  })

}

function readCampaign() {
  firebase.firestore().collection("Campaign").onSnapshot(function (snapshot) {
    document.getElementById("table").innerHTML = `<thead class="thead-dark">
        <tr>
        <th scope="col" width="50 px">#</th>
        <th scope="col">Nama Campaign</th>
        <th scope="col" width="120 px">Kategori</th>
        <th scope="col">Dana yang dibutuhkan</th>
        <th scope="col">Gambar</th>
        <th scope="col">Action</th>
      </tr>
    </thead>`;
    var i = 1;
    snapshot.forEach(function (campaignValue) {
      var campaign = campaignValue.data();
      if(campaign.isEnable == "true") {
        document.getElementById("table").innerHTML += `
        <tbody>
        <tr>
          <th scope="row">${i++}</th>
          <td class="card-title nama">${campaign.namaCampaign}</td>
          <td class="kategori">${campaign.kategori}</td>
          <td class="danaKebutuhan">${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(campaign.danaCampaign)}</td>
          <td class="name"><img class="card-img-top" src="${campaign.gambarCampaign}" alt="Card image cap"></td>
          <td class= "deskripsi" style=" display:none">${campaign.deskripsi}</td>
          <td class="isEnable" style="display:none" ><p>${campaign.isEnable}</p></td>
          <td class="gambar" style="display:none"><p>${campaign.gambarCampaign}</p></td>
          <td class="danaTerkumpul" style="display:none"><p>${campaign.danaTerkumpul}</p></td>
          <td class="danaCampaign" style="display:none"><p>${campaign.danaCampaign}</p></td>
          
          <td>
               <button type="button" style="font-size: 14px;" id="detail-btn"  class="btn btn-success" onclick="detailShow('${campaignValue.id}')" data-toggle="modal" data-target="#detailModal">Details</button>
              <button type="button" style="font-size: 14px;" id="edit-campaign-btn" data-heroId="${campaignValue.id}" class="btn btn-success edit-campaign-btn" data-toggle="modal" data-target="#editModal" data-backdrop="static" data-keyboard="false">Edit</button>
              <button type="submit" style="font-size: 14px;" class="btn btn-success" onclick="deleteCamp('${campaignValue.id}')">Delete</button>
          </td>
        </tr>
      </tbody>
`
      }

    });
  });

}



function deleteCamp(id) {
  if (confirm('Apakah Anda yakin ingin menghapus Campaign ?')) {
    // Save it!
    // firebase.firestore().collection("Campaign").doc(id).delete().then(() => {
    //   console.log("data dihapus");
    //  setTimeout();
    // });

    collection.doc(id).update({
      isEnable : "false",
    })
      .then(() => {
        alert("Campaign berhasil dihapus");
      })
      .catch(error => { console.error(error) });
  } else {
    // Do nothing!
    console.log('Campaign tidak terhapus.');
  }

}

function editCampaign() {
  if(statusValidateEdit) {
    var danaKeb = $("#danaCampaignEdit").val();
    var danaKebutuhan = parseInt(danaKeb);
    var danaTer = $("#danaTerkumpulEdit").val();
    var danaTerkumpul = parseInt(danaTer);
    const database = firebase.firestore();
    const collection = database.collection('Campaign');
    const idCamp = $('#campaignId').val();
    collection.doc(idCamp).update({
      namaCampaign: $("#namaCampaignEdit").val(),
      deskripsi: $("#deskripsiEdit").val(),
      danaCampaign: danaKebutuhan,
      danaTerkumpul: danaTerkumpul,
      kategori: $("#kategoriEdit").val(),
      isEnable : $("#isEnableEdit").val(),
      gambarCampaign: $("#gambarCampaignEdit").val(),
      tanggal: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(() => {
        alert("Campaign berhasil diubah");
      })
      .catch(error => { console.error(error) });
  }else{
    return false;
  }
 



}

function imageAdd(ref, name, file, metadata) {
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

function imageEdit(ref, name, file, metadata) {
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


setTimeout(function(){
  $( "#table" ).load( "campaign.html #table" );
}, 2000);