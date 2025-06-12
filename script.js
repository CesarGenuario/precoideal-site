
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const resultado = document.getElementById('resultado');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error('Erro na webcam', err));

function capturarImagem() {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = 'block';
  resultado.innerHTML = '<p>Lendo placa da imagem...</p>';
  resultado.style.display = 'block';

  Tesseract.recognize(canvas, 'eng')
    .then(({ data: { text } }) => {
      const placa = text.replace(/[^A-Z0-9]/gi, '').substring(0, 7).toUpperCase();
      consultarAPIPlaca(placa);
    });
}

function consultarVeiculo() {
  const placa = document.getElementById('placa').value.trim().toUpperCase();
  if (placa.length >= 7) {
    consultarAPIPlaca(placa);
  } else {
    alert('Digite uma placa ou chassi válido.');
  }
}

function consultarAPIPlaca(placa) {
  resultado.innerHTML = `<h3>Consultando dados para a placa: ${placa}...</h3>`;
  resultado.style.display = 'block';

  fetch(`https://placafipe.com/api/veiculo/${placa}`)
    .then(res => res.json())
    .then(dados => {
      if (dados && dados.modelo) {
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
        resultado.innerHTML = '<p>Veículo não encontrado. Verifique a placa digitada.</p>';
      }
    })
    .catch(err => {
      resultado.innerHTML = '<p>Erro ao consultar a placa. Verifique a conexão ou tente novamente mais tarde.</p>';
      console.error(err);
    });
}

function copiarResultado() {
  const texto = resultado.innerText;
  navigator.clipboard.writeText(texto)
    .then(() => alert('Resultado copiado!'))
    .catch(() => alert('Erro ao copiar.'));
}
