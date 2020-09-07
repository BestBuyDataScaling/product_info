const faker = require('faker');
const fs = require('fs');
const { name } = require('faker');
const writeUsers = fs.createWriteStream('users.csv');
writeUsers.write('uniqueID,name,description,brand,department,color,subDept,sku,price,avgRating\n', 'utf8');
function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10000000;
  let uniqueID = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      uniqueID += 1;
      const name = faker.name.findName();
      const description = faker.lorem.sentence();
      const brand = faker.lorem.words();
      const department = faker.lorem.words();
      const color = faker.internet.color();
      const subDept = faker.lorem.words();
      const sku = faker.random.number();
      const price = faker.random.number();
      const avgRating = faker.random.number();
      const data = `${uniqueID},${name},${description},${brand},${department},${color},${subDept},${sku},${price},${avgRating}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});