namespace db;

entity college {
    key collegeId : String;
    collegeName : String;
    contactno : String;
    noofstudents : Int16;
    coltodept : Composition of many department on coltodept.depttocol = $self
}
entity department{
    key deptId : String;
    collegeId : String;
    deptName : String;
    hodName : String;
    depttocol : Association to many college on depttocol.collegeId = collegeId;
    depttostud : Composition of many student on depttostud.studtodept = $self
}
entity student{
    key studentId : String;
    deptId : String;
    studentName : String;
    age : String;
    studtodept : Association to one department on studtodept.deptId = deptId;
    studToFile : Composition of many Files on studToFile.fileToStud = $self;
}

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Files: cuid, managed{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    studentId: String;
    fileToStud: Association to one student on fileToStud.studentId=studentId;
}
