
function consultarVeiculo() {
  const placa = document.getElementById('placa').value.trim().toUpperCase();
  const resultado = document.getElementById('resultado');
  if (!placa || placa.length < 7) {
    resultado.innerHTML = "<p>Digite uma placa válida.</p>";
    return;
  }
  resultado.innerHTML = "<p>Consultando...</p>";
  fetch("/api/placa?placa=" + placa)
    .then(res => res.json())
    .then(dados => {
      if (dados && dados.modelo) {
        resultado.innerHTML = `
          <h3>${placa}</h3>
          <p><strong>Marca:</strong> ${dados.marca}</p>
          <p><strong>Modelo:</strong> ${dados.modelo}</p>
          <p><strong>Ano:</strong> ${dados.ano}</p>
          <p><strong>Cor:</strong> ${dados.cor || "N/A"}</p>
          <p><strong>FIPE:</strong> R$ ${dados.valor_fipe}</p>`;
      } else {
        resultado.innerHTML = "<p>Veículo não encontrado.</p>";
      }
    })
    .catch(err => {
      resultado.innerHTML = "<p>Erro ao consultar a placa.</p>";
    });
}

function copiarResultado() {
  const texto = document.getElementById('resultado').innerText;
  navigator.clipboard.writeText(texto)
    .then(() => alert("Resultado copiado!"))
    .catch(() => alert("Erro ao copiar."));
}
