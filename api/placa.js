export default async function handler(req, res) {
  const { placa } = req.query;
  if (!placa) {
    return res.status(400).json({ erro: "Placa não informada" });
  }
  try {
    const response = await fetch(`https://placafipe.com/api/veiculo/${placa}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao consultar a API" });
  }
}