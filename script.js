
async function consultarVeiculo() {
  const placa = document.getElementById("placa").value.trim().toUpperCase();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "Consultando...";

  try {
    const res = await fetch("https://placafipe.com/api/veiculo/" + placa);
    const data = await res.json();

    if (data && data.modelo) {
      resultado.innerHTML = `
        <strong>Resultado da API:</strong><br>
        Marca: ${data.marca}<br>
        Modelo: ${data.modelo}<br>
        Ano: ${data.ano}<br>
        Tipo: ${data.tipo}<br>
        Valor FIPE: ${data.valor_fipe}
      `;
      return;
    }
    throw new Error("API não encontrou");
  } catch (err) {
    Papa.parse("tabela-fipe-322.csv", {
      download: true,
      header: true,
      complete: function(results) {
        const fallback = results.data.find(v => v["Model Value"].toUpperCase().includes(placa));
        if (fallback) {
          resultado.innerHTML = `
            <strong>Resultado da FIPE local:</strong><br>
            Marca: ${fallback["Brand Value"]}<br>
            Modelo: ${fallback["Model Value"]}<br>
            Ano: ${fallback["Year Value"]}<br>
            Combustível: ${fallback["Fuel Type"]}<br>
            Código FIPE: ${fallback["Fipe Code"]}<br>
            Valor: ${fallback["Price"]}
          `;
        } else {
          resultado.innerHTML = "Veículo não encontrado na base local.";
        }
      }
    });
  }
}
