const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker")

async function main(){
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });