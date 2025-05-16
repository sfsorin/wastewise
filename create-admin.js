// Script pentru crearea unui utilizator administrator
const axios = require('axios');

async function createAdminUser() {
  try {
    const response = await axios.post('http://localhost:3030/api/v1/users', {
      username: 'admin',
      email: 'admin@wastewise.ro',
      password: 'Admin123!',
      role: 'admin'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Utilizator administrator creat cu succes:');
    console.log(response.data);
  } catch (error) {
    console.error('Eroare la crearea utilizatorului administrator:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Date:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

createAdminUser();
