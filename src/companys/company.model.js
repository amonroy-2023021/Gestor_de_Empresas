import { Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      maxLength: [100, "Company name cannot exceed 100 characters"]
    },
    companyType: {
      type: String,
      required: true,
      enum: ["Sociedad Anónima", "Sociedad Limitada", "Otra"],
      default: "Otra"
    },
    incorporationDate: {
      type: Date,
      required: [true, "Incorporation date is required"]
    },
    category: {
      type: String,
      required: [true, "Sector is required"],
      enum: [
        "Tecnología",
        "Comercio",
        "Servicios",
        "Manufactura",
        "Energía",
        "Educación",
        "Salud",
        "Otro"
      ]
    },
    years: {
      type: Number,
      required: [true, "Years in business is required"]
    },
    representative: {
      nameRepre: {
        type: String,
        required: [true, "name is required"]
      },
      position: {
        type: String,
        required: [true, "position is required"]
      },
      contact: {
        email: {
          type: String,
          required: [true, "email is required"]
        },
        phone: {
          type: String,
          required: [true, "phone number is required"]
        }
      }
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

companySchema.methods.toJSON = function () {
  const { __v, _id, ...company } = this.toObject();
  company.uid = _id;
  return company;
};

export default model("Company", companySchema);
