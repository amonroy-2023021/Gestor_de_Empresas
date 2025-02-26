import company from "../companys/company.model.js"
import ExcelJS from "exceljs";
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerCompany = async (req, res) => {
    try {
        const data = req.body;
        const { representative } = data;

        const empresa = await company.create({
            name: data.name,
            companyType: data.companyType,
            incorporationDate: data.incorporationDate,
            category: data.category,
            years: data.years,
            representative: {
                nameRepre: representative.nameRepre,
                position: representative.position,
                contact: {
                    email: representative.contact.email, 
                    phone: representative.contact.phone 
                }
            }
        });

        return res.status(201).json({
            message: "Company registered successfully",
            companyDetails: {
                empresa: empresa.name,
                representante: empresa.representative.nameRepre,
                posicion: empresa.representative.position

            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Company registration failed",
            error: error.message
        });
    }
}

export const listCompanies = async (req, res) => {
    try {
        const { sortBy } = req.query;

        let sortCriteria;
        switch (sortBy) {
            case 'A-Z':
                sortCriteria = { name: 1 };
                break;
            case 'Z-A':
                sortCriteria = { name: -1 };
                break;
            case 'category':
                sortCriteria = { category: 1 };
                break;
            case 'years':
                sortCriteria = { years: 1 };
                break;
            default:
                sortCriteria = {};
        }

        const companies = await company.find().sort(sortCriteria);

        return res.status(200).json({
            message: "Companies retrieved successfully",
            companies
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to retrieve companies",
            error: error.message
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedCompany = await company.findByIdAndUpdate(id, data, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            companyDetails: updatedCompany
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update company",
            error: error.message
        });
    }
}


export const generateExcel = async (req, res) => {
    try {
        const empresas = await company.find();
        if (!empresas || empresas.length === 0) {
            return res.status(404).json({
                message: "No companies found"
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Companies Report");

        worksheet.columns = [
            { header: "Nombre", key: "name", width: 30 },
            { header: "Tipo de Compania", key: "companyType", width: 30 },
            { header: "Fecha de incorporacion", key: "incorporationDate", width: 30 },
            { header: "Categoria", key: "category", width: 30 },
            { header: "Anios", key: "years", width: 10 },
            { header: "Nombre de representante", key: "nameRepre", width: 30 },
            { header: "Puesto del representante", key: "position", width: 30 },
            { header: "Email del representante", key: "email", width: 30 },
            { header: "Numero del representante", key: "phone", width: 20 }
        ];

        empresas.forEach(empresa => {
            worksheet.addRow({
                name: empresa.name,
                companyType: empresa.companyType,
                incorporationDate: empresa.incorporationDate,
                category: empresa.category,
                years: empresa.years,
                nameRepre: empresa.representative.nameRepre,
                position: empresa.representative.position,
                email: empresa.representative.contact.email,
                phone: empresa.representative.contact.phone
            });
        });

        const dir = path.join(__dirname, 'reports');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        const filePath = path.join(dir, `companies_report.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        res.status(200).json({
            message: "Excel file generated successfully",
            filePath: filePath
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to generate excel",
            error: error.message
        });
    }
};