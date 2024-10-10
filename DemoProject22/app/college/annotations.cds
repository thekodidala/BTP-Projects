using MyService as service from '../../srv/service';
annotate service.college with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'collegeId',
                Value : collegeId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'collegeName',
                Value : collegeName,
            },
            {
                $Type : 'UI.DataField',
                Value : noofstudents,
                Label : 'noofstudents',
                Criticality : noofstudents,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'department',
            ID : 'department',
            Target : 'coltodept/@UI.LineItem#department',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Identify',
            ID : 'Identify',
            Target : '@UI.Identification',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'collegeId',
            Value : collegeId,
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Label : 'collegeName',
            Value : collegeName,
        },
        {
            $Type : 'UI.DataField',
            Value : coltodept.deptName,
            Label : 'deptName',
        },
        {
            $Type : 'UI.DataField',
            Value : coltodept.deptId,
            Label : 'deptId',
        },
    ],
);

annotate service.college with @(
    UI.SelectionFields : [
        collegeName,]
);
annotate service.college with {
    collegeName @Common.Label : 'collegeName'
};

annotate service.college with @(
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    }
);
annotate service.college with @(
    UI.SelectionPresentationVariant #table1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    }
);
annotate service.college with @(
    UI.SelectionPresentationVariant #table2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : collegeId,
                    Descending : true,
                },
            ],
            GroupBy : [
                collegeId,
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View college',
    }
);
annotate service.college with {
    collegeId @Common.Label : 'Id'
};
annotate service.department with @(
    UI.LineItem #department : [
        {
            $Type : 'UI.DataField',
            Value : deptId,
            Label : 'deptId',
        },{
            $Type : 'UI.DataField',
            Value : deptName,
            Label : 'deptName',
        },{
            $Type : 'UI.DataField',
            Value : hodName,
            Label : 'hodName',
        },
        {
            $Type : 'UI.DataField',
            Value : depttocol.collegeId,
        },
        {
            $Type : 'UI.DataField',
            Value : collegeId,
            Label : 'collegeId',
        },]
);
annotate service.department with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'student',
            ID : 'student',
            Target : '@UI.FieldGroup#student',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student Table',
            ID : 'StudentTable',
            Target : 'depttostud/@UI.LineItem#StudentTable',
        },
    ],
    UI.FieldGroup #student : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : collegeId,
                Label : 'collegeId',
            },{
                $Type : 'UI.DataField',
                Value : deptId,
                Label : 'deptId',
            },{
                $Type : 'UI.DataField',
                Value : deptName,
                Label : 'deptName',
            },{
                $Type : 'UI.DataField',
                Value : hodName,
                Label : 'hodName',
            },],
    }
);
annotate service.college with @(
    UI.PresentationVariant #vh_college_collegeName : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : collegeName,
                    Descending : true,
                },
            ],
    }
);
annotate service.college with {
    collegeName @Common.Text : collegeId
};
annotate service.college with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : collegeId,
        },{
            $Type : 'UI.DataField',
            Value : collegeName,
        },
        {
            $Type : 'UI.DataField',
            Value : noofstudents,
            Label : 'noofstudents',
            Criticality : noofstudents,
            CriticalityRepresentation : #WithoutIcon,
        },],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    }
);
annotate service.college with @(
    UI.HeaderInfo : {
        TypeName : 'college',
        TypeNamePlural : 'colleges',
        Title : {
            $Type : 'UI.DataField',
            Value : collegeName,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : collegeId,
        },
        ImageUrl : collegeId,
        TypeImageUrl : 'sap-icon://biometric-face',
    }
);
annotate service.student with @(
    UI.LineItem #StudentTable : [
        {
            $Type : 'UI.DataField',
            Value : age,
            Label : 'age',
        },{
            $Type : 'UI.DataField',
            Value : deptId,
            Label : 'deptId',
        },{
            $Type : 'UI.DataField',
            Value : studentName,
            Label : 'studentName',
        },{
            $Type : 'UI.DataField',
            Value : studentId,
            Label : 'studentId',
        },]
);
annotate service.student with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student Details',
            ID : 'StudentDetails',
            Target : '@UI.FieldGroup#StudentDetails',
        },
    ],
    UI.FieldGroup #StudentDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : studentId,
                Label : 'studentId',
            },{
                $Type : 'UI.DataField',
                Value : studentName,
                Label : 'studentName',
            },{
                $Type : 'UI.DataField',
                Value : deptId,
                Label : 'deptId',
            },{
                $Type : 'UI.DataField',
                Value : age,
                Label : 'age',
            },{
                $Type : 'UI.DataField',
                Value : studtodept.deptName,
                Label : 'deptName',
            },{
                $Type : 'UI.DataField',
                Value : studtodept.depttocol.collegeName,
            },],
    }
);
annotate service.college with @(
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target : '@Communication.Contact#contact',
            Label : 'Contact No',
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target : '@UI.ConnectedFields#connected1',
            Label : 'contact',
        },]
);
annotate service.college with @(
    Communication.Contact #contact : {
        $Type : 'Communication.ContactType',
        fn : contactno,
        email : [
            {
                $Type : 'Communication.EmailAddressType',
                type : [ #work, #preferred ],
                address : 'h@gamil.com',
            },
        ],
        org : collegeName,
        adr : [
            {
                $Type : 'Communication.AddressType',
                type : #work,
            },
        ],
        tel : [
            {
                $Type : 'Communication.PhoneNumberType',
                type : #work,
                uri : contactno,
            },
        ],
        title : 'Senior',
        photo : 'https://th.bing.com/th/id/OIP.E4IJcali_762Oo_vNhhbFgHaEK?rs=1&pid=ImgDetMain',
        role : 'Recptionist',
    }
);
annotate service.college with @(
    UI.ConnectedFields #connected : {
        $Type : 'UI.ConnectedFieldsType',
        Template : '{collegeName},{collegeId}',
        Data : {
            $Type : 'Core.Dictionary',
            collegeName : {
                $Type : 'UI.DataField',
                Value : collegeName,
            },
            collegeId : {
                $Type : 'UI.DataField',
                Value : collegeId,
            },
        },
    }
);
annotate service.college with @(
    UI.ConnectedFields #connected1 : {
        $Type : 'UI.ConnectedFieldsType',
        Template : '{collegeId},{collegeName}',
        Data : {
            $Type : 'Core.Dictionary',
            collegeId : {
                $Type : 'UI.DataField',
                Value : collegeId,
            },
            collegeName : {
                $Type : 'UI.DataField',
                Value : collegeName,
            },
        },
    }
);
annotate service.college with {
    collegeName @UI.MultiLineText : true
};
annotate service.college with {
    collegeId @Common.FieldControl : #Mandatory
};

annotate service.college with @(
    UI.DataPoint #noofstudents : {
        Value : noofstudents,
        Visualization : #Rating,
        TargetValue : 5,
    }
);
