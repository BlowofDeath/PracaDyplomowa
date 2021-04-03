import Company from "./Company";
import PracticeSuperviser from "./PracticeSuperviser";
import PracticeAgreement from "./PracticeAgreement";
import PracticeAdvertisement from "./PracticeAdvertisement";
import Student from "./Student";

Student.hasOne(PracticeAgreement);
PracticeAgreement.belongsTo(Student);

PracticeAgreement.belongsTo(Company);
Company.hasMany(PracticeAgreement);

Company.hasMany(PracticeAdvertisement);
PracticeAdvertisement.belongsTo(Company);

export default {
  Company,
  PracticeSuperviser,
  PracticeAgreement,
  PracticeAdvertisement,
  Student,
};
