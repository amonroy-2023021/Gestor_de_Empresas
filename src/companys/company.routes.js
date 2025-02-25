import {Router} from "express"
import {updateCompany, listCompanies, registerCompany } from "../companys/company.controller.js"

const router = Router();

router.post('/registerCompany', registerCompany);
router.get("/companies", listCompanies);
router.put("/companies/:id", updateCompany); 


export default router;