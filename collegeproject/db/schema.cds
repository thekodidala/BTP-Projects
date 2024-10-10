namespace db;

entity Department{
    // key deid : UUID;
    key deptId : String @readonly  default 'D0';
    deptName : String;
    deptPhoneNo : String;
    deptEmail : String;
    deptToLec : Composition of many Lecture on deptToLec.lectToDept = $self;
    deptToStud : Composition of many Student on deptToStud.studToDept = $self;
}

entity College{
    // key clgid : UUID;
    key lectId : String @readonly  default 'L0';
    lectName : String;
    lectPhoneNo : String;
    lectEmail : String;
    lectdept : String;
    lectgender : String;
    lectdob : Date;
    lectage : Integer;
    additionalSKills : String;
    lectstatus : String default 'In Process';
    lectresult : String;
    clgToLect : Association to many Lecture on clgToLect.lectToCol = $self;
    clgToFile       : Composition of many Files on clgToFile.fileToClg = $self;
}

entity Lecture{ 
    key lectId : String @UI.Placeholder : 'Choose lectId';
    key deptId : String @readonly default 'D0';
    lectName : String;
    lectPhoneNo : String;
    lectEmail : String;
    lectstatus : String default 'Approved';
    lectToDept : Association to one Department on lectToDept.deptId = deptId; 
    lectToCol : Association to one College on lectToCol.lectId = lectId;
}

entity Student{
    // key stid : UUID;
    key studId : String @readonly default 'S0';
    deptId : String;
    studName : String;
    studPhoneNo : String;
    studEmail : String;
    studToDept : Association to one Department on studToDept.deptId = deptId;
}

entity Increment{
    sid : String;
    did : String;
    lid : String;
}

entity Permission{
    key user : String;
    userEmail : String;
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
    lectId: String;
    fileToClg: Association to one College on fileToClg.lectId=lectId;
}

entity valueHelp{
    gender :String;
}