
export default async function handler(req, res) {
  const { placa } = req.query;
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0Mzk1NWE4OC01MmI4LTQ2YTAtODMyOC04ODUyNGRiYzFkNzMiLCJlbWFpbCI6ImNlc2FyaWNhcmRAZ21haWwuY29tIiwic3RyaXBlU3Vic2NyaXB0aW9uSWQiOiJzdWJfMVJUdTd0Q1N2SXMwOHRJRUZMWWZDUnBMIiwiaWF0IjoxNzQ4NDc3NzU2fQ.yfR4W4d8MkT02PIcIvEDaCb-RAKMGQN8gxES36a8dlQ";

  try {
    const response = await fetch("https://placafipe.com/api/veiculo/" + placa, {
      headers: {
        Authorization: "Bearer " + key
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao consultar a API FIPE" });
  }
}
