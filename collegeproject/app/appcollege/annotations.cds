using MyService as service from '../../srv/service';
annotate service.Department with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Department Id',
                Value : deptId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department Name',
                Value : deptName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department Phone Number',
                Value : deptPhoneNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department Email',
                Value : deptEmail,
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
            Label : 'Students',
            ID : 'Student',
            Target : 'deptToStud/@UI.LineItem#Student',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Lecturers',
            ID : 'Lecturers',
            Target : 'deptToLec/@UI.LineItem#Lecturers',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Department Id',
            Value : deptId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department Name',
            Value : deptName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department Phone Number',
            Value : deptPhoneNo,
            ![@UI.Hidden],
        },
        {
            $Type : 'UI.DataField',
            Label : 'deptEmail',
            Value : deptEmail,
            ![@UI.Hidden],
        },
    ],
);

annotate service.Student with @(
    UI.LineItem #Student : [
        {
            $Type : 'UI.DataField',
            Value : studId,
            Label : 'Student Id',
        },{
            $Type : 'UI.DataField',
            Value : deptId,
            Label : 'Department Id',
        },{
            $Type : 'UI.DataField',
            Value : studName,
            Label : 'Student Name',
        },{
            $Type : 'UI.DataField',
            Value : studEmail,
            Label : 'Student Email',
        },
        {
            $Type : 'UI.DataField',
            Value : studPhoneNo,
            Label : 'Student Phone Number',
        },]
);
annotate service.Student with @(
    Communication.Contact #contact : {
        $Type : 'Communication.ContactType',
        fn : studPhoneNo,
    }
);
annotate service.Lecture with @(
    UI.LineItem #Lecturers : [
        {
            $Type : 'UI.DataField',
            Value : lectId,
            Label : 'Lecture Id',
        },{
            $Type : 'UI.DataField',
            Value : deptId,
            Label : 'Department Id',
        },{
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecture Name',
        },{
            $Type : 'UI.DataField',
            Value : lectEmail,
            Label : 'Lecture Email',
        },
        {
            $Type : 'UI.DataField',
            Value : lectPhoneNo,
            Label : 'Lecture Phone Number',
        },]
);
annotate service.Lecture with @(
    Communication.Contact #contact : {
        $Type : 'Communication.ContactType',
        fn : lectPhoneNo,
    }
);
annotate service.Student with {
    studId @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Lecture',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : studId,
                    ValueListProperty : 'lectId',
                },
            ],
            Label : 'Lecturer',
        },
        Common.ValueListWithFixedValues : false
)};
annotate service.Lecture with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Lecturer Details',
            ID : 'Lecture',
            Target : '@UI.FieldGroup#Lecture',
        },
    ],
    UI.FieldGroup #Lecture : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : lectId,
                Label : 'Lecture Id',
            },{
                $Type : 'UI.DataField',
                Value : deptId,
                Label : 'Department Id',
            },{
                $Type : 'UI.DataField',
                Value : lectName,
                Label : 'Lecture Name',
            },{
                $Type : 'UI.DataField',
                Value : lectPhoneNo,
                Label : 'Lecture Phone Number',
            },{
                $Type : 'UI.DataField',
                Value : lectEmail,
                Label : 'Lecture Email',
            },],
    }
);
annotate service.Student with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student Details',
            ID : 'Student',
            Target : '@UI.FieldGroup#Student',
        },
    ],
    UI.FieldGroup #Student : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : studId,
                Label : 'Student Id',
            },{
                $Type : 'UI.DataField',
                Value : deptId,
                Label : 'Department Id',
            },{
                $Type : 'UI.DataField',
                Value : studName,
                Label : 'Student Name',
            },{
                $Type : 'UI.DataField',
                Value : studEmail,
                Label : 'Student Email',
            },{
                $Type : 'UI.DataField',
                Value : studPhoneNo,
                Label : 'Student Phone Number',
            },],
    }
);
annotate service.Lecture with {
    deptId @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Lecture',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : deptId,
                    ValueListProperty : 'deptId',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Lecture with {
    lectId @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'College',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : lectId,
                    ValueListProperty : 'lectId',
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lectName',
                    LocalDataProperty : lectName,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lectPhoneNo',
                    LocalDataProperty : lectPhoneNo,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lectEmail',
                    LocalDataProperty : lectEmail,
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'lectstatus',
                    LocalDataProperty : lectstatus,
                },
            ],
        PresentationVariantQualifier : 'vh_Lecture_lectId',
        },
        Common.ValueListWithFixedValues : true,
        )};
annotate service.Department with {
    deptId @Common.FieldControl : #ReadOnly
};
annotate service.College with @(
    UI.PresentationVariant #vh_Lecture_lectId : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : lectId,
                Descending : false,
            },
        ],
    }
);
annotate service.Lecture with {
    lectName @Common.FieldControl : #ReadOnly
};
annotate service.Lecture with {
    lectPhoneNo @Common.FieldControl : #ReadOnly
};
annotate service.Lecture with {
    lectEmail @Common.FieldControl : #ReadOnly
};
annotate service.Department with {
    deptName @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    deptId @Common.FieldControl : #ReadOnly
};
annotate service.Department with {
    deptPhoneNo @Common.FieldControl : #Mandatory
};
annotate service.Department with {
    deptEmail @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    studName @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    studEmail @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    studPhoneNo @Common.FieldControl : #Mandatory
};
annotate service.Department with @(
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
annotate service.Department with @(
    UI.SelectionPresentationVariant #table1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : deptId,
                    Descending : false,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    }
);
annotate service.Department with @(
    UI.SelectionPresentationVariant #table2 : {
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
