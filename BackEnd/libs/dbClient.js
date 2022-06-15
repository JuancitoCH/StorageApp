// Patron Singleton
// para que no se cree una conexion cada vez que queramos hacer una consulta
// https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
const {PrismaClient} = require('@prisma/client')

const client = new PrismaClient()

module.exports = client