/* 
    1 - Obter um usuário
    2 - Obter o número de telefone de um usuário a partir de seu id
    3 - Obter o endereço de um usuário a partir de seu id
*/

const util = require('util');

//transforma uma fn comum para função assíncrona

const getUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve({ id: 1, name: 'Matheus', bornDate: new Date() }),
      1000
    );
  });
};

const getPhone = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ phone: '400289222', ddd: '11' }), 2000);
  });
};

const getAddress = (id, callback) => {
  setTimeout(() => {
    return callback(null, {
      street: 'Netherland',
    });
  }, 2000);
};

const getAddressAsync = util.promisify(getAddress);

getUser().then((user) =>
  getPhone()
    .then((phone) => ({
      user,
      phone,
    }))
    .then((res) =>
      getAddressAsync(res.user.id).then((address) => ({ ...res, address }))
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
);

// getUser(function resolveUser(error, user) {
//   if (error) {
//     console.error('error on user', error);
//     return;
//   }

//   getPhone(user.id, function resolvePhone(phoneError, phone) {
//     if (phoneError) {
//       console.error('error on phone', error);
//       return;
//     }
//     getAddress(user.id, function resolveAddress(addressError, address) {
//       if (addressError) {
//         console.log('error on address', address);
//         return;
//       }

//       console.log(`
//       Nome: ${user.name},
//       Endereço: ${address.street},
//       Telefone: ${phone.ddd} ${phone.phone}
//       `);
//     });
//   });
// });
