import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const companySchema = new Schema({
    id: String,  //company id
    name: String, //company name
    sections: {
        introduction: {
            data: {
                name: String, //Company Name or known as
                logo: url, //Company Logo
                subtitle: String, //company tagline
                sectors: [{ id: String, name: String }],
                socialLinks: { //social media links
                    facebook: String,
                    twitter: String,
                    linkedin: String
                },
                iosAppLink: String, //if the company has an ios app
                androidLink: String, //if the company has an android app
                website: String //company website
            }
        },
        basicInformation: {
            title: String, //"Basic Information",
            data: {
                description: String, //Company Description (long)
                legalName: String, //Legal Name
                headquarters: String, //Headquarters
                businessModels: [{ id: String, name: String }], //B2B, B2C, C2C, C2B
                foundingDate: String, //Founding Date
                employeeSize: { //Employee Size
                    id: String,
                    name: String
                },
                coreTeam: [teamMemberSchema] //Core Team Members
            }
        },
        targetMarket: {
            title: String, //"Target Market",
            data: [{
                geolocations: [{ name: String, id: String }], //India, USA, UK or cities
                businessSizes: [{ name: String, id: String }], //Small Enterprise, Medium Enterprise, Large Enterprise
                businessSectors: [{ name: String, id: String }], //Healthcare, Education, Retail
                ageRanges: [], // 18-24, 25-34, 35-44, 45-54, 55-64, 65+
                incomeClasses: [] // Lower, Middle, Upper //not applicable for B2B
            }]
        },
        funding: {
            fundedBy: String, //Venture Capital, Angel Investors, Private Equity, or self-funded
            investors: [] //List of investors if any
        },
        locations: {
            data: [{
                cityId: String, //City ID
                city: String, //City Name
                state: String, //State Name
                country: String, //Country Name
                addressLine1: String,
                addressLine2: String,
                googleMapLink: String,
                headquarters: Boolean //true if this is the headquarter of the company
            }]
        },
        revenueStreams: {
            title: String, // "title": "Revenue Streams",
            data: [{
                id: String, //this is referenced to the revenueStreams array of revenue model
                name: String
            }]
        },
        products: {
            title: String, //"title": "Products and Services",
            data: [{
                id: String,
                name: String, //Product Name
                type: String, //Product or Service
                description: String, //Product Description
                website: String, //product website
                url: String, //product image url
                sectorName: String, //eg "Construction & Real estate", "Healthcare", "Education"
                status: String, //Development, Beta, Live, active or inactive
            }]
        }
    },
    isUserAdmin: Boolean, //true if the user is admin of the company
    isCompanyClaimed: Boolean, //true if the company is claimed by the owner or aru le haleko?
    claimedBy: String //userId of the owner if claimed
});

const Company = mongoose.model('Company', companySchema);

exports.default = Company;
