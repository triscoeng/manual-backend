"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var CreateConstrutoraController_1 = require("./controllers/CreateConstrutoraController");
var CreateEmpreendimentoController_1 = require("./controllers/CreateEmpreendimentoController");
var DeleteConstrutoraController_1 = require("./controllers/DeleteConstrutoraController");
var DeleteEmpreendimentoController_1 = require("./controllers/DeleteEmpreendimentoController");
var EditConstrutoraController_1 = require("./controllers/EditConstrutoraController");
var EditEmpreendimentoController_1 = require("./controllers/EditEmpreendimentoController");
var FindConstrutoraController_1 = require("./controllers/FindConstrutoraController");
var FindEmpreendimentoController_1 = require("./controllers/FindEmpreendimentoController");
var multer_1 = __importStar(require("multer"));
var DeleteArquivoController_1 = require("./controllers/DeleteArquivoController");
var CreateArquivoController_1 = require("./controllers/CreateArquivoController");
var UsuarioController_1 = require("./controllers/UsuarioController");
var DownloadArquivoController_1 = require("./controllers/DownloadArquivoController");
var FindArquivoController_1 = require("./controllers/FindArquivoController");
var CreateQrCodeController_1 = require("./controllers/CreateQrCodeController");
var router = (0, express_1.Router)();
exports.router = router;
var storage = (0, multer_1.diskStorage)({
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase().replace(/[^A-Z0-9]+/gi, "_") + ".pdf");
    }
});
var upload = (0, multer_1["default"])({ storage: storage });
///
//CRUD CONSTRUTORAS
///
var createConstrutora = new CreateConstrutoraController_1.CreateConstrutoraController();
var findAllConstrutora = new FindConstrutoraController_1.FindAllConstrutoraController();
var findConstrutoraById = new FindConstrutoraController_1.FindConstrutoraByIdController();
var deleteConstrutora = new DeleteConstrutoraController_1.DeleteConstrutoraController();
var editConstrutora = new EditConstrutoraController_1.EditConstrutoraController();
router.post("/construtora/add", createConstrutora.handle);
router.get("/construtoras/", findAllConstrutora.handle);
router.get("/construtoras/names", findAllConstrutora.handleOnlyName);
router.get("/construtora/:id", findConstrutoraById.handle);
router["delete"]("/construtora/:id", deleteConstrutora.handle);
router.put("/construtora/edit", editConstrutora.handle);
///
//CRUD EMPREENDIMENTOS
///
var findAllEmpreendimento = new FindEmpreendimentoController_1.FindAllEmpreendimentoController();
var findEmpreendimentoById = new FindEmpreendimentoController_1.FindEmpreendimentoById();
var createEmpreendimento = new CreateEmpreendimentoController_1.CreateEmpreendimentoController();
var editEmpreendimento = new EditEmpreendimentoController_1.EditEmpreendimentoController();
var deleteEmpreendimento = new DeleteEmpreendimentoController_1.DeleteEmpreendimentoController();
router.get("/empreendimentos", findAllEmpreendimento.handle);
router.get("/empreendimento/:id", findEmpreendimentoById.handle);
router.post("/empreendimento/add", upload.array("files"), createEmpreendimento.handle);
router.post("/empreendimento/edit", upload.array("files"), editEmpreendimento.handle);
router["delete"]("/empreendimento/:id", deleteEmpreendimento.handle);
///
//CRUD ARQUIVOS
///
var deletarArquivo = new DeleteArquivoController_1.DeleteArquivoController();
var criarArquivo = new CreateArquivoController_1.CreateSingleArquivoController();
var downloadArquivo = new DownloadArquivoController_1.DownloadArquivoController();
var findArquivo = new FindArquivoController_1.FindArquivoController();
router.post("/arquivo/add", upload.array("files"), criarArquivo.handle);
router["delete"]("/arquivo/:id", deletarArquivo.handle);
router.get("/download", downloadArquivo.handle);
router.get("/arquivos", findArquivo.getAll);
router.get("/arquivo/:id", findArquivo.getById);
///
//USUARIOS
///
var createUsuario = new UsuarioController_1.CreateUsuarioController();
var loginUsuario = new UsuarioController_1.LoginUsuarioController();
var verifyUsuario = new UsuarioController_1.VerifyUsuarioController();
router.post("/usuario/", createUsuario.handle);
router.post("/login/", loginUsuario.handle);
router.get("/login/verify", verifyUsuario.handle);
router.post("/teste", upload.array("files"), function (req, res) {
    console.log(req.body);
    console.log(req.files);
});
//////////
//QRCODE//
//////////
var qrCodeClass = new CreateQrCodeController_1.CreateQrCodeController();
router.post("/qrcode/cadastrar", qrCodeClass.create);
router.put("/qrcode/:id", qrCodeClass.edit);
router["delete"]("/qrcode/:id", qrCodeClass["delete"]);
//# sourceMappingURL=routes.js.map