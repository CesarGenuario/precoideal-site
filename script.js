
function consultarVeiculo() {
  const placa = document.getElementById('placa').value.toUpperCase();
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '🔄 Consultando...';

  fetch(`https://api.fipeonline.com.br/placa/${placa}`, {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0Mzk1NWE4OC01MmI4LTQ2YTAtODMyOC04ODUyNGRiYzFkNzMiLCJlbWFpbCI6ImNlc2FyaWNhcmRAZ21haWwuY29tIiwic3RyaXBlU3Vic2NyaXB0aW9uSWQiOiJzdWJfMVJUdTd0Q1N2SXMwOHRJRUZMWWZDUnBMIiwiaWF0IjoxNzQ4NDc3NzU2fQ.yfR4W4d8MkT02PIcIvEDaCb-RAKMGQN8gxES36a8dlQ'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data && data.modelo) {
      resultado.innerHTML = `
        <strong>Marca:</strong> ${data.marca}<br>
        <strong>Modelo:</strong> ${data.modelo}<br>
        <strong>Ano:</strong> ${data.ano}<br>
        <strong>Cor:</strong> ${data.cor || 'Indefinida'}<br>
        <strong>Categoria:</strong> ${data.tipo}<br>
        <strong>FIPE:</strong> R$ ${data.valor_fipe}
      `;
    } else {
      resultado.innerHTML = '🚫 Veículo não encontrado.';
    }
  })
  .catch(() => {
    resultado.innerHTML = '⚠️ Erro ao consultar a placa.';
  });
}

function copiarResultado() {
  const texto = document.getElementById('resultado').innerText;
  navigator.clipboard.writeText(texto)
    .then(() => alert('Resultado copiado!'))
    .catch(() => alert('Erro ao copiar.'));
}
