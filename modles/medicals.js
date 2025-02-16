const mongoose = require("mongoose") 
const { Schema } = mongoose ;



const medicalSchema = mongoose.Schema({
    businessName: {
        type: String,
        required: true,
      },
      businessType: {
        type: String,
        enum: ['Generic', 'pharmacy', 'clinic', 'other'],
        required: true,
      },
      licenseNumber: {
        type: String,
        required: true,
      },
      taxIdentificationNumber: {
        type: String,
        required: true,
      },
      contactPerson: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      emailAddress: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Simple email validation
      },
      physicalAddress: {
        type: String,
        required: true,
      },
      coordinatess : {
        type : String
      } ,
      operatingHours: {
        type: String, // E.g., "Mon-Fri 9am-5pm"
      },
      servicesOffered: {
        type: String, // Array of strings for product categories
      },
      pharmacyLicense: {
        type: String,
        required: true,
      },
      professionalCertifications: {
        type: String, // Array of certification names
      },
      liabilityInsurance: {
        type: String, // Insurance provider details
      },
      paymentMethods: {
        type: String, // E.g., ["credit card", "insurance", "cash"]
      },
      bankingInformation: {
        type: String, // Necessary for processing payments
      },
      complianceDocumentation: {
        type: String, // URL or path to compliance documents
      },
      dataProtectionPolicy: {
        type: String, // URL or path to data protection policy
      },
      owner : {
        type:Schema.Types.ObjectId ,
        ref : "User"
      }
    }, {
      timestamps: true, // Adds createdAt and updatedAt fields
    
    
})

medicalSchema.index({ coordinates: '2dsphere' });


const Medical = mongoose.model("Medical" , medicalSchema) ;

module.exports.Medical = Medical ;