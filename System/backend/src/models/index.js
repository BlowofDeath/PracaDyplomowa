import Company from "./Company";
import PracticeSuperviser from "./PracticeSuperviser";
import PracticeAgreement from "./PracticeAgreement";
import PracticeAnnouncement from "./PracticeAnnouncement";
import Student from "./Student";
import Invitation from "./Invitation";
import DocumentFile from "./DocumentFile";

Student.hasMany(PracticeAgreement);
PracticeAgreement.belongsTo(Student);

PracticeAgreement.belongsTo(Company);
Company.hasMany(PracticeAgreement);

Company.hasMany(PracticeAnnouncement);
PracticeAnnouncement.belongsTo(Company);

PracticeAgreement.hasMany(DocumentFile);
DocumentFile.belongsTo(PracticeAgreement);

export default {
  Company,
  PracticeSuperviser,
  PracticeAgreement,
  PracticeAnnouncement,
  Student,
  Invitation,
  DocumentFile,
};
