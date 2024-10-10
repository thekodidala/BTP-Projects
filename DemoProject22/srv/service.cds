using db from '../db/schema';

service MyService
{
    @odata.draft.enabled
    entity college as
        projection on db.college;

    entity department as
        projection on db.department;

    entity student as
        projection on db.student;

    entity Files as projection on db.Files;
}
