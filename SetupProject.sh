set -e
echo "Sedang Menginstall Semua Dependencies Yang Ada.... 😰😰😰😰😰😰😰😰😰😰😰😰😰😰😰😰😰😰"
npm install

echo "Sedang Seeding Semua Data Kedalam Database....🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖" 
node seeders/seeder.js
npx sequelize-cli db:seed:all

echo "Sedang Menjalankan Webserver😍😍😍😍😍❤️❤️❤️❤️❤️❤️😘😘😘😘😘😘😘"
node app.js
