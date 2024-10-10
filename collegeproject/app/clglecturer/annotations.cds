using MyService as service from '../../srv/service';
annotate service.College with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Lecture Id',
                Value : lectId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecture Name',
                Value : lectName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecture Phone Number',
                Value : lectPhoneNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecture Email',
                Value : lectEmail,
            },
            {
                $Type : 'UI.DataField',
                Value : lectgender,
                Label : 'Lecturer Gender',
            },
            {
                $Type : 'UI.DataField',
                Value : lectdob,
                Label : 'Lecturer DOB',
            },
            {
                $Type : 'UI.DataField',
                Value : lectage,
                Label : 'Lecturer Age',
            },
            {
                $Type : 'UI.DataField',
                Value : additionalSKills,
                Label : 'Additional Skills',
            },
            {
                $Type : 'UI.DataField',
                Value : lectdept,
                Label : 'Graduated Department',
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
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Lecture Id',
            Value : lectId,
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecture Name',
            Value : lectName,
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecture Phone Number',
            Value : lectPhoneNo,
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecture Email',
            Value : lectEmail,
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectdept,
            Label : 'Lecturer Department',
            ![@UI.Importance] : #High,
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
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
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : lectstatus,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Approved',
    },
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : lectId,
            Label : 'Lecturer Id',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer Name',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectPhoneNo,
            Label : 'Lecturer Phone Number',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectEmail,
            Label : 'Lecturer Email',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectdept,
            Label : 'Lecturer Department',
            ![@UI.Importance] : #High,
        },
    ],
    UI.SelectionPresentationVariant #tableView1 : {
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
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : lectstatus,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'In Process',
                        },
                    ],
                },
            ],
        },
        Text : 'In Process',
    },
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : lectId,
            Label : 'Lecturer Id',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer Name',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectPhoneNo,
            Label : 'Lecturer Phone Number',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectresult,
            Label : 'Rejected By',
            ![@UI.Importance] : #High,
        },
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : lectstatus,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected',
    },
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : lectId,
        },
        TypeName : '',
        TypeNamePlural : '',
    },
    UI.Identification : [
        
    ],
);

annotate service.Lecture with @(
    UI.LineItem #Lecturer : [
        {
            $Type : 'UI.DataField',
            Value : lectId,
            Label : 'lectId',
        },{
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'lectName',
        },{
            $Type : 'UI.DataField',
            Value : lectEmail,
            Label : 'lectEmail',
        },]
);

annotate service.College with {
    lectName @Common.FieldControl : #Mandatory
};
annotate service.College with {
    lectPhoneNo @Common.FieldControl : #Mandatory
};
annotate service.College with {
    lectEmail @Common.FieldControl : #Mandatory
};
annotate service.College with {
    lectage @Common.FieldControl : #ReadOnly
};

annotate service.College with {
    lectdob @Common.FieldControl : #Mandatory
};

annotate service.College with {
    additionalSKills @Common.FieldControl : #Mandatory
};

annotate service.College with {
    lectdept @Common.FieldControl : #Mandatory
};

annotate service.College with {
    lectgender @(
        Common.FieldControl : #Mandatory,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'valueHelp',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : lectgender,
                    ValueListProperty : 'gender',
                },
            ],
        },
        Common.ValueListWithFixedValues : true,
        )
};

