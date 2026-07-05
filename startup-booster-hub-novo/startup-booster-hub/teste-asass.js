// teste-asaas.js
import('node-fetch').then(async () => {
  // CONFIGURAÇÕES - Cole seus dados reais aqui para testar
  const API_KEY = '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmJmNTUxYmNiLTgzMTMtNGI0NS05ZjUzLWY3ZDY4ZDU0MjY0MDo6JGFhY2hfNTM1YTY3N2ItYjAxZS00ZTZmLTkyMWMtNTcxMmQ1NmJkYWNi'; 
  const BASE_URL = 'https://sandbox.asaas.com/v3';
  const CPF_PARA_TESTAR = '12345678901'; // Use um CPF limpo (só números)

  console.log('🚀 Iniciando teste isolado de conexão com o Asaas...');

  try {
    const response = await fetch(`${BASE_URL}/customers?cpfCnpj=${CPF_PARA_TESTAR}`, {
      method: 'GET',
      headers: {
        'access_token': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log(`📡 Status da Resposta: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ CONEXÃO COM SUCESSO!');
      console.log('Dados recebidos do Asaas:', JSON.stringify(data, null, 2));
    } else {
      console.error('❌ O Asaas recusou a requisição.');
      const errorText = await response.text();
      console.error('Detalhes do erro do Asaas:', errorText);
    }

  } catch (error) {
    console.error('💥 Erro ao tentar alcançar o servidor do Asaas:', error.message);
  }
}).catch(err => {
  // Caso o node-fetch precise de um ajuste, usamos o fetch nativo do Node moderno
  executarComFetchNativo();
});

async function ejecutarComFetchNativo() {
  const API_KEY = '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmJmNTUxYmNiLTgzMTMtNGI0NS05ZjUzLWY3ZDY4ZDU0MjY0MDo6JGFhY2hfNTM1YTY3N2ItYjAxZS00ZTZmLTkyMWMtNTcxMmQ1NmJkYWNi'; 
  const BASE_URL = 'https://sandbox.asaas.com/v3';
  const CPF_PARA_TESTAR = '12345678901';

  try {
    const response = await fetch(`${BASE_URL}/customers?cpfCnpj=${CPF_PARA_TESTAR}`, {
      method: 'GET',
      headers: { 'access_token': API_KEY, 'Content-Type': 'application/json' }
    });
    console.log(`📡 Status (Nativo): ${response.status}`);
    const data = await response.json();
    console.log('📋 Resultado:', data);
  } catch (e) {
    console.error('Erro:', e.message);
  }
}