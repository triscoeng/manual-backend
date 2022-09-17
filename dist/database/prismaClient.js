"use strict";
exports.__esModule = true;
exports.prismaClient = void 0;
var client_1 = require("@prisma/client");
var prismaClient = new client_1.PrismaClient({
    log: ["error", "info", "query", "warn"]
});
exports.prismaClient = prismaClient;
//# sourceMappingURL=prismaClient.js.map