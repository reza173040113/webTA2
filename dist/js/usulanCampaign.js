const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
});


function readUsulanCampaign() {
    firebase.firestore().collection("UsulanCampaign").onSnapshot(function (snapshot) {
        document.getElementById("table").innerHTML = `<thead class="thead-dark">
          <tr>
                  
                  <th scope="col" width="50 px">#</th>
                  <th scope="col" width="150 px">Nama Pengusul</th>
                  <th scope="col" width="150 px">email</th>
                  <th scope="col" width="150 px">nomor</th>
                  <th scope="col">Usulan Campaign</th>
                  <th scope="col" width="180 px">Tanggal</th>
                  
 
        </tr>
      </thead>`;
        var i = 1;
        snapshot.forEach(function (usulanValue) {
            var usulan = usulanValue.data();
            document.getElementById("table").innerHTML += `
              <tbody>
              <tr>
                <th scope="row">${i++}</th>
                <td class="card-title namaPengusul">${usulan.namaPengusul}</td>
                <td class="email">${usulan.email}</td>
                <td class= "nomor">${usulan.phoneNumber}</td>
                <td class="usulanCampaign">${usulan.usulanCampaign}</td>
               <td class= "tanggal">${Date(usulan.tanggal)}</td>
                            
                
              </tr>
            </tbody>
  `
        });
    });
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