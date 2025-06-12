
function consultarVeiculo() {
  const placa = document.getElementById("placa").value.trim().toUpperCase();
  if (!placa || placa.length < 7) {
    alert("Digite uma placa ou chassi válido.");
    return;
  }
  consultarAPIPlaca(placa);
}

function consultarAPIPlaca(placa) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "<p>Consultando...</p>";
  resultado.style.display = "block";

  fetch(`https://api.fipeonline.dev/placa/${placa}`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0Mzk1NWE4OC01MmI4LTQ2YTAtODMyOC04ODUyNGRiYzFkNzMiLCJlbWFpbCI6ImNlc2FyaWNhcmRAZ21haWwuY29tIiwic3RyaXBlU3Vic2NyaXB0aW9uSWQiOiJzdWJfMVJUdTd0Q1N2SXMwOHRJRUZMWWZDUnBMIiwiaWF0IjoxNzQ4NDc3NzU2fQ.yfR4W4d8MkT02PIcIvEDaCb-RAKMGQN8gxES36a8dlQ",
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(dados => {
    if (dados && dados.modelo) {
      resultado.innerHTML = `
        <h3>Resultado para: ${placa}</h3>
        <p><strong>Marca:</strong> ${dados.marca}</p>
        <p><strong>Modelo:</strong> ${dados.modelo}</p>
        <p><strong>Ano:</strong> ${dados.ano}</p>
        <p><strong>Cor:</strong> ${dados.cor || "Indefinida"}</p>
        <p><strong>FIPE:</strong> R$ ${dados.valor_fipe}</p>
      `;
    } else {
      resultado.innerHTML = "<p>Veículo não encontrado.</p>";
    }
  })
  .catch(() => {
    resultado.innerHTML = "<p>Erro ao consultar a placa.</p>";
  });
}

function copiarResultado() {
  const texto = document.getElementById("resultado").innerText;
  navigator.clipboard.writeText(texto)
    .then(() => alert("Resultado copiado!"))
    .catch(() => alert("Erro ao copiar."));
}
