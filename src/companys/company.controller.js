import company from "../companys/company.model.js"

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