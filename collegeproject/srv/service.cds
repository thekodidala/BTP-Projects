using db from '../db/schema';

service MyService{
    @odata.draft.enabled
    entity Department as projection on db.Department;
    entity Lecture as projection on db.Lecture;
    entity Student as projection on db.Student;
    @odata.draft.enabled
    @odata.draft.bypass
    @Common.SideEffects  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : [
            'lectdob'
        ],
        TargetProperties : [
            'lectage'
        ]
    }
    entity College as projection on db.College;
     function postattach(p : String)           returns String;
    entity Increment as projection on db.Increment;
    entity Permission as projection on db.Permission;

    entity Files as projection on db.Files;

    entity valueHelp as projection on db.valueHelp;

}
