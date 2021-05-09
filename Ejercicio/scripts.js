const btnEmail = document.querySelector("#btn-listaEmail");
const btnCompleto = document.querySelector("#btn-listaCompleta");
const contenido = document.querySelector("div.contenido"); //mostrará los listados cargados vía Ajax

var request = $.ajax({
  url: "http://localhost:5984/db_manuel/_design/Personas/_view/VistaCompleta",
  type: "GET",
  username: "admin",
  password: "0000",
  dataType: "json",
  success: function () {
    console.log("ok");
  },
  error: function () {
    console.log("error");
  },
});

btnEmail.addEventListener("click", (e) => {
  //listado de emails
  //vacío el contenido primero:
  contenido.innerHTML = "";

  //hago la consulta Ajax y cargo los datos:
  $.ajax({
    url: "http://localhost:5984/db_manuel/_design/Personas/_view/VistaEmail",
    type: "GET",
    username: "admin",
    password: "0000",
    dataType: "json",
    success: function (data) {
      console.log("ok");
      console.log(data.rows);
      data.rows.forEach((element) => {
        contenido.innerHTML += `<h4>${element.value}</h4>`; //cargo el email de cada registro
      });
    },
    error: function () {
      console.log("error");
    },
  });
});

btnCompleto.addEventListener("click", (e) => {
  //listado de emails
  //vacío el contenido primero:
  contenido.innerHTML = "<ol id='listaOrdenada'></ol>";

  //hago la consulta Ajax y cargo los datos:
  $.ajax({
    url: "http://localhost:5984/db_manuel/_design/Personas/_view/VistaCompleta",
    type: "GET",
    username: "admin",
    password: "0000",
    dataType: "json",
    success: function (data) {
      console.log("ok");
      console.log(data.rows);
      const listaOrdenada = document.querySelector("#listaOrdenada");
      data.rows.forEach((element) => {
        const persona = element.value; //objeto Persona
        listaOrdenada.innerHTML += `
          <li>
              <h4>${persona.nombre} ${persona.apellido}</h4>
              <h5>${persona.email}</h5>
              <h5 style='strong'>${persona.pais}</h5>
              <br/>
          </li>
        `;
      });
    },
    error: function () {
      console.log("error");
    },
  });
});
