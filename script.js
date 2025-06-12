function consultarVeiculo() {
  const placa = document.getElementById('placa').value.trim().toUpperCase();
  const resultado = document.getElementById('resultado');
  if (!placa || placa.length < 7) {
    alert("Digite uma placa válida.");
    return;
  }
  resultado.innerHTML = '<p>Consultando...</p>';
  resultado.style.display = 'block';
  fetch(`/api/placa?placa=${placa}`)
    .then(res => res.json())
    .then(dados => {
      if (dados.modelo) {
        resultado.innerHTML = `
          <h3>Resultado para: ${placa}</h3>
          <p><strong>Marca:</strong> ${dados.marca}</p>
          <p><strong>Modelo:</strong> ${dados.modelo}</p>
          <p><strong>Ano:</strong> ${dados.ano}</p>
          <p><strong>Cor:</strong> ${dados.cor || 'Indefinida'}</p>
          <p><strong>Categoria:</strong> ${dados.tipo}</p>
          <p><strong>FIPE:</strong> R$ ${dados.valor_fipe}</p>
        `;
      } else {
        resultado.innerHTML = '<p>Veículo não encontrado.</p>';
      }
    })
    .catch(() => {
      resultado.innerHTML = '<p>Erro ao consultar a placa. Verifique a conexão ou tente novamente mais tarde.</p>';
    });
}

function copiarResultado() {
  const texto = document.getElementById('resultado').innerText;
  navigator.clipboard.writeText(texto).then(() => alert("Resultado copiado!"));
}