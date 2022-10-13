import { Request, Response, Router } from "express";
import { CreateConstrutoraController } from "./controllers/CreateConstrutoraController";
import { CreateEmpreendimentoController } from "./controllers/CreateEmpreendimentoController";
import { DeleteConstrutoraController } from "./controllers/DeleteConstrutoraController";
import { DeleteEmpreendimentoController } from "./controllers/DeleteEmpreendimentoController";
import { EditConstrutoraController } from "./controllers/EditConstrutoraController";
import { EditEmpreendimentoController } from "./controllers/EditEmpreendimentoController";
import {
  FindAllConstrutoraController,
  FindConstrutoraByIdController,
} from "./controllers/FindConstrutoraController";
import {
  FindAllEmpreendimentoController,
  FindEmpreendimentoById,
} from "./controllers/FindEmpreendimentoController";
import multer, { diskStorage } from "multer";
import { DeleteArquivoController } from "./controllers/DeleteArquivoController";
import { CreateSingleArquivoController } from "./controllers/CreateArquivoController";
import {
  CreateUsuarioController,
  LoginUsuarioController,
  VerifyUsuarioController,
} from "./controllers/UsuarioController";
import { DownloadArquivoController } from "./controllers/DownloadArquivoController";
import { FindArquivoController } from "./controllers/FindArquivoController";
import { CreateQrCodeController } from "./controllers/CreateQrCodeController";
import Path from "path";
import HomeData from "./controllers/HomeController";

const router = Router();
const storage = diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Path.parse(file.originalname).name.toLowerCase().replace(/[^A-Z0-9]+/gi, "_") + Path.parse(file.originalname).ext
    );
  },
});
const upload = multer({ storage: storage });

///
//CRUD CONSTRUTORAS
///
const createConstrutora = new CreateConstrutoraController();
const findAllConstrutora = new FindAllConstrutoraController();
const findConstrutoraById = new FindConstrutoraByIdController();
const deleteConstrutora = new DeleteConstrutoraController();
const editConstrutora = new EditConstrutoraController();

router.post("/construtora/add", createConstrutora.handle);
router.get("/construtoras?", findAllConstrutora.handle);
router.get("/construtoras/list", findAllConstrutora.handleOnlyName);
router.get("/construtora/:id", findConstrutoraById.handle);
router.delete("/construtora/:id", deleteConstrutora.handle);
router.put("/construtora/edit", editConstrutora.handle);

///
//CRUD EMPREENDIMENTOS
///
const findAllEmpreendimento = new FindAllEmpreendimentoController();
const findEmpreendimentoById = new FindEmpreendimentoById();
const createEmpreendimento = new CreateEmpreendimentoController();
const editEmpreendimento = new EditEmpreendimentoController();
const deleteEmpreendimento = new DeleteEmpreendimentoController();

router.get("/empreendimentos", findAllEmpreendimento.handle);
router.get("/empreendimento/:id", findEmpreendimentoById.handle);
router.post(
  "/empreendimento/add",
  upload.array("files"),
  createEmpreendimento.handle
);
router.post(
  "/empreendimento/edit",
  upload.array("files"),
  editEmpreendimento.handle
);
router.delete("/empreendimento/:id", deleteEmpreendimento.handle);

///
//CRUD ARQUIVOS
///

const deletarArquivo = new DeleteArquivoController();
const criarArquivo = new CreateSingleArquivoController();
const downloadArquivo = new DownloadArquivoController();
const findArquivo = new FindArquivoController();

router.post("/arquivo/add", upload.array("files"), criarArquivo.handle);
router.delete("/arquivo/:id", deletarArquivo.handle);
router.get("/arquivos", findArquivo.getAll)
router.get("/arquivo/:id", findArquivo.getById)

///
//USUARIOS
///
const createUsuario = new CreateUsuarioController();
const loginUsuario = new LoginUsuarioController();
const verifyUsuario = new VerifyUsuarioController();

router.post("/usuario/", createUsuario.handle);
router.post("/login/", loginUsuario.handle);
router.get("/login/verify", verifyUsuario.handle);
router.post("/teste", upload.array("files"), (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.files);
});


//////////
//QRCODE//
//////////

const qrCodeClass = new CreateQrCodeController();

router.get("/qrcode/:id", qrCodeClass.view)
router.get("/qrcode", qrCodeClass.view)
router.post("/qrcode/", qrCodeClass.create)
router.put("/qrcode/:id", qrCodeClass.edit)
router.delete("/qrcode/:id", qrCodeClass.delete)
router.get("/download", downloadArquivo.handle);

const homeInfo = new HomeData()

router.get("/home", homeInfo.handle)



export { router };
