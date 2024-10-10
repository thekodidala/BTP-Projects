// const cds = require('@sap/cds/libx/_runtime/cds');
// const { select } = require('@sap/cds/libx/_runtime/hana/execute');
// const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const axios = require('axios');

function containsOnlyLetters(input) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(input);
}

function isvalidPhoneNumber(phoneNumber) {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function calculateAge(dob) {
    const birthDate = new Date(dob); // Parse the DOB
    const today = new Date(); // Get the current date
    let age = today.getFullYear() - birthDate.getFullYear(); 
    const monthDifference = today.getMonth() - birthDate.getMonth(); 
    // Adjust age if the current date is before the birth date in the current year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = async function (params) {
    let { Department, College, Student, Lecture, Increment, Permission, Files , clgToLect, lectToCol} = this.entities;

    this.before('CREATE', Department, async (req) => {
        debugger
        const tx = cds.transaction(req);

        if(req.data.deptId){
            const tx = cds.transaction(req);
            const lastclg = await tx.read(Increment).limit(1).columns('did');
            const lastId = lastclg.length > 0 ? lastclg[0].did : 'D0';
            const lastIdNumber = parseInt(lastId.substring(1));
            const nextIdNumber = lastIdNumber + 1;
            const nextTeacherId = `D${nextIdNumber}`;
            req.data.deptId = nextTeacherId;
            if (lastclg) {
                await cds.update(Increment).set({ did: nextTeacherId }).where({ did: lastId });
            }
        }

        if (req.data.deptName) {
            if (containsOnlyLetters(req.data.deptName) === false) {
                req.error(400, `${req.data.deptName} is invalid.`);
                return;
            }
            req.data.deptName = req.data.deptName.toUpperCase().trim();
            const existingname = await tx.read(Department).where({ deptName: req.data.deptName });
            if (existingname.length > 0) {
                req.error(409, `Department ${req.data.deptName} already exists.`);
                return;
            }
        }

        if (req.data.deptPhoneNo) {
            debugger
            const existingPhone = await tx.read(Department).where({ deptPhoneNo: req.data.deptPhoneNo });
            const existingLectPhone = await (SELECT.from(College).where({ lectPhoneNo: req.data.deptPhoneNo }));
            const existingStudPhone = await (SELECT.from(Student).where({ studPhoneNo: req.data.deptPhoneNo }));
            if (existingPhone.length > 0) {
                req.error(409, `Phone number ${req.data.deptPhoneNo} already exists in Department.`);
                return;
            }
            else if (existingLectPhone.length > 0) {
                req.error(409, `Phone number ${req.data.deptPhoneNo} already exists in Lecture.`);
                return;
            }
            else if (existingStudPhone.length > 0) {
                req.error(409, `Phone number ${req.data.deptPhoneNo} already exists in Student.`);
                return;
            }
            else if (isvalidPhoneNumber(req.data.deptPhoneNo) === false) {
                req.error(409, `Phone number ${req.data.deptPhoneNo} is invalid.`);
                return;
            }
        }

        // Validate email unique
        if (req.data.deptEmail) {
            debugger
            const existingEmail = await tx.read(Department).where({ deptEmail: req.data.deptEmail });
            const existingLectEmail = await (SELECT.from(College).where({ lectEmail: req.data.deptEmail }));
            const existingStudEmail = await (SELECT.from(Student).where({ studEmail: req.data.deptEmail }));
            if (existingEmail.length > 0) {
                req.error(409, `Email ${req.data.deptEmail} is already exists in Department.`);
                return;
            }
            else if (existingLectEmail.length > 0) {
                req.error(409, `Email ${req.data.deptEmail} already exists in Lecture.`);
                return;
            }
            else if (existingStudEmail.length > 0) {
                req.error(409, `Email ${req.data.deptEmail} already exists in Student.`);
                return;
            }
            else if (isValidEmail(req.data.deptEmail) === false) {
                req.error(409, `${req.data.deptEmail} is invalid Email.`);
                return;
            }
        }

    });

    this.before('UPDATE', Department, async (req) => {
        debugger
        const tx = cds.transaction(req);

        if (req.data.deptName) {
            if (containsOnlyLetters(req.data.deptName) === false) {
                req.error(400, `${req.data.deptName} is invalid Name.`);
                return;
            }
            req.data.deptName = req.data.deptName.toUpperCase().trim();
            const existingname = await tx.read(Department).where({ deptName: req.data.deptName });
            if (existingname.length > 1) {
                req.error(409, `Dept Name ${req.data.deptName} already exists.`);
                return;
            }
            else if (existingname.length === 1 && existingname[0].deptId !== req.data.deptId) {
                req.error(409, `Dept Name ${req.data.deptName} already exists.`);
                return;
            }
        }

        if (req.data.deptPhoneNo) {
            const existingPhone = await tx.read(Department).where({ deptPhoneNo: req.data.deptPhoneNo });
            const existingLectPhone = await (SELECT.from(College).where({ lectPhoneNo: req.data.deptPhoneNo }));
            const existingStudPhone = await (SELECT.from(Student).where({ studPhoneNo: req.data.deptPhoneNo }));
            if (existingPhone.length > 1) {
                req.error(409, `Phone number ${req.data.deptPhoneNo} already exists in Department.`);
                return;
            }
            else if (existingLectPhone.length > 0) {
                req.error(409, `Phone number ${req.data.deptPhoneNo} already exists in Lecture.`);
                return;
            }
            else if (existingStudPhone.length > 0) {
                req.error(409, `Phone number ${req.data.deptPhoneNo} already exists in Student.`);
                return;
            }
            else if (isvalidPhoneNumber(req.data.deptPhoneNo) === false) {
                debugger
                req.error(409, `Phone number ${req.data.deptPhoneNo} is invalid.`);
                return;
            }
            else if (existingPhone.length === 1 && existingPhone[0].deptId !== req.data.deptId) {
                req.error(409, `Dept Name ${req.data.deptPhoneNo} already exists in Department.`);
                return;
            }

        }

        // Validate email unique
        if (req.data.deptEmail) {
            const existingEmail = await tx.read(Department).where({ deptEmail: req.data.deptEmail });
            const existingLectEmail = await (SELECT.from(College).where({ lectEmail: req.data.deptEmail }));
            const existingStudEmail = await (SELECT.from(Student).where({ studEmail: req.data.deptEmail }));
            if (existingEmail.length > 1) {
                req.error(409, `Email ${req.data.deptEmail} is already exists in Department.`);
                return;
            }
            else if (existingLectEmail.length > 0) {
                req.error(409, `Email ${req.data.deptEmail} already exists in Lecture.`);
                return;
            }
            else if (existingStudEmail.length > 0) {
                req.error(409, `Email ${req.data.deptEmail} already exists in Student.`);
                return;
            }
            else if (isValidEmail(req.data.deptEmail) === false) {
                req.error(409, `${req.data.deptEmail} is invalid Email.`);
                return;
            }
            else if (existingEmail.length === 1 && existingEmail[0].deptId !== req.data.deptId) {
                req.error(409, `Email ${req.data.deptEmail} already exists in Department.`);
                return;
            }
        }

        const students = await tx.read(Student.drafts).where({ deptId: req.data.deptId });
        var count = 0;
        for (let student of students) {
            debugger
            if(student.studId){
                const lastclg = await tx.read(Increment).limit(1).columns('sid');
                const lastIdClg = lastclg.length > 0 ? lastclg[0].sid : 'S0';
                const studIdValue = parseInt(student.studId.substring(1));
                const lastClgValue = parseInt(lastIdClg.substring(1));
                if(studIdValue > lastClgValue){
                    const tx = cds.transaction(req);
                    const lastclg = await tx.read(Increment).limit(1).columns('sid');
                    const lastId = lastclg.length > 0 ? lastclg[0].sid : 'S0';
                    const lastIdNumber = parseInt(lastId.substring(1));
                    const nextIdNumber = lastIdNumber + 1;
                    const nextStudId = `S${nextIdNumber}`;
                    req.data.deptToStud[count].studId = nextStudId;
                    if (lastclg) {
                        await cds.update(Increment).set({ sid: nextStudId }).where({ sid: lastId });
                    }
                }
            }

            if (containsOnlyLetters(student.studName) === false) {
                req.error(400, `${student.studName} is invalid Name.`);
                return;
            }

            if (student.studPhoneNo) {
                debugger
                const existingPhone = await tx.read(Student).where({ studPhoneNo: student.studPhoneNo });
                const existingLectPhone = await (SELECT.from(College).where({ lectPhoneNo: student.studPhoneNo }));
                const existingDeptPhone = await (SELECT.from(Department).where({ deptPhoneNo: student.studPhoneNo }));
                if (existingPhone.length > 1) {
                    req.error(409, `Phone number ${student.studPhoneNo} already exists in Student`);
                    return;
                }
                else if (existingLectPhone.length > 0) {
                    req.error(409, `Phone number ${student.studPhoneNo} already exists in Lecture.`);
                    return;
                }
                else if (existingDeptPhone.length > 0) {
                    req.error(409, `Phone number ${student.studPhoneNo} already exists in Department.`);
                    return;
                }
                else if (existingPhone.length === 1 && existingPhone[0].studId !== student.studId) {
                    req.error(409, `Phone number ${student.studPhoneNo} already exists in Student.`);
                    return;
                }
                else if (isvalidPhoneNumber(student.studPhoneNo) === false) {
                    req.error(409, `Phone number ${student.studPhoneNo} is invalid.`);
                    return;
                }
            }
            if (student.studEmail) {
                const existingEmail = await tx.read(Student).where({ studEmail: student.studEmail });
                const existingLectEmail = await (SELECT.from(College).where({ lectEmail: student.studEmail }));
                const existingDeptEmail = await (SELECT.from(Department).where({ deptEmail: student.studEmail }));
                if (existingEmail.length > 1) {
                    req.error(409, `Email ${student.studEmail} is already exists in Student.`);
                    return;
                }
                else if (existingLectEmail.length > 0) {
                    req.error(409, `Email ${student.studEmail} already exists in Lecture.`);
                    return;
                }
                else if (existingDeptEmail.length > 0) {
                    req.error(409, `Email ${student.studEmail} already exists in Department.`);
                    return;
                }
                else if (existingEmail.length === 1 && existingEmail[0].studId !== student.studId) {
                    req.error(409, `Email ${student.studEmail} already exists in Student.`);
                    return;
                }
                else if (isValidEmail(student.studEmail) === false) {
                    req.error(400, `${student.studEmail} is invalid Email.`);
                    return;
                }
            }
            count = count + 1;
        }

    });

    this.before('UPDATE', College, async (req) => {
        debugger
        // const tx = cds.transaction(req);

        if (req.data.lectPhoneNo) {
            debugger
            const existingStudPhone = await (SELECT.from(Student).where({ studPhoneNo: req.data.lectPhoneNo }));
            const existingLectPhone = await (SELECT.from(College).where({ lectPhoneNo: req.data.lectPhoneNo }));
            const existingDeptPhone = await (SELECT.from(Department).where({ deptPhoneNo: req.data.lectPhoneNo }));
            if (existingStudPhone.length > 0) {
                req.error(409, `Phone number ${req.data.lectPhoneNo} already exists in Student`);
                return;
            }
            else if (existingLectPhone.length > 1) {
                req.error(409, `Phone number ${req.data.lectPhoneNo} already exists in Lecture.`);
                return;
            }
            else if (existingDeptPhone.length > 0) {
                req.error(409, `Phone number ${req.data.lectPhoneNo} already exists in Department.`);
                return;
            }
            else if (existingLectPhone.length === 1 && existingLectPhone[0].lectId !== req.data.lectId) {
                req.error(409, `Phone number ${req.data.lectPhoneNo} already exists in Lecture.`);
                return;
            }
            else if (isvalidPhoneNumber(req.data.lectPhoneNo) === false) {
                req.error(409, `Phone number ${req.data.lectPhoneNo} is invalid.`);
                return;
            }
        }

        if (req.data.lectEmail) {
            const existingStudEmail = await (SELECT.from(Student).where({ studEmail: req.data.lectEmail }));
            const existingLectEmail = await (SELECT.from(Lecture).where({ lectEmail: req.data.lectEmail }));
            const existingDeptEmail = await (SELECT.from(Department).where({ deptEmail: req.data.lectEmail }));
            if (existingStudEmail.length > 0) {
                req.error(409, `Email ${req.data.lectEmail} already exists in Student.`);
                return;
            }
            else if (existingLectEmail.length > 1) {
                req.error(409, `Email ${req.data.lectEmail} already exists in Lecture.`);
                return;
            }
            else if (existingDeptEmail.length > 0) {
                req.error(409, `Email ${req.data.lectEmail} already exists in Department.`);
                return;
            }
            else if (existingLectEmail.length === 1 && existingLectEmail[0].lectId !== req.data.lectId) {
                req.error(409, `Email ${req.data.lectEmail} already exists in Lecture.`);
                return;
            }
            else if (isValidEmail(req.data.lectEmail) === false) {
                req.error(400, `${req.data.lectEmail} is invalid Email.`);
                return;
            }
        }

        const cds = require('@sap/cds');
        const { lectId, lectName, lectPhoneNo, lectEmail } = req.data;
        const existingData = await (SELECT.from(Lecture).where({ lectId: lectId }));
        if (existingData.length !== 0) {
            await cds.update(Lecture).set({ lectName: lectName, lectPhoneNo: lectPhoneNo, lectEmail: lectEmail }).where({ lectId: req.data.lectId });
        }

        req.data.lectdept = req.data.lectdept.toUpperCase();
        // req.data.lectage = calculateAge(req.data.lectdob);
        if (req.data.lectage < 20) {
            req.error(400, `Age is less than 20.`);
        }
        req.data.lectgender = req.data.lectgender.charAt(0).toUpperCase() + req.data.lectgender.slice(1).toLowerCase()
        if (req.data.lectgender !== 'Male' && req.data.lectgender !== 'Female' && req.data.lectgender !== 'Others') {
            req.error(400, `${req.data.lectgender} is not a valid Gender.`);
        }

    });

    this.before('CREATE', Department.drafts, async (req) => {
        debugger

        const nextIdNumber = Math.floor(1000 + Math.random() * 100);
        const nextTeacherId = `D${nextIdNumber}`;
        req.data.deptId = nextTeacherId;
    });

    this.before('CREATE', Student.drafts, async (req) => {
        debugger
        // const tx = cds.transaction(req);
        // const lastclg = await tx.read(Increment).limit(1).columns('sid');
        // const lastId = lastclg.length > 0 ? lastclg[0].sid : 'S0';
        // const lastIdNumber = parseInt(lastId.substring(1));
        // const nextIdNumber = lastIdNumber + 1;
        // const nextTeacherId = `S${nextIdNumber}`;
        // req.data.studId = nextTeacherId;
        // if (lastclg) {
        //     await cds.update(Increment).set({ sid: nextTeacherId }).where({ sid: lastId });
        // }
        const tx = cds.transaction(req);
        const nextIdNumber = Math.floor(1000 + Math.random() * 100);
        const nextStudId = `S${nextIdNumber}`;
        req.data.studId = nextStudId;
    });


    this.before('CREATE', College.drafts, async (req) => {
        debugger
        const tx = cds.transaction(req);
        const nextIdNumber = Math.floor(1000 + Math.random() * 100);
        const nextTeacherId = `T${nextIdNumber}`;
        req.data.lectId = nextTeacherId;
    });

    this.before('DELETE', College, async (req) => {
        debugger
        const tx = cds.transaction(req);
        await tx.run(DELETE.from(Lecture).where({ lectId: req.data.lectId }));
    });

    //update lectId
    this.after('UPDATE', College, async (req) => {
        debugger
        const tx = cds.transaction(req);
        // const isValid = /^L\d/.test(req.lectId);
        const isValid = /^T\d+$/.test(req.lectId);
        if(req.lectstatus === 'Approved' && isValid){
            const lastlect = await tx.read(Increment).limit(1).columns('lid');
            const lastId = lastlect.length > 0 ? lastlect[0].lid : 'L0';
            const lastIdNumber = parseInt(lastId.substring(1));
            const nextIdNumber = lastIdNumber + 1;
            const nextlectId = `L${nextIdNumber}`;
            var lectupdate = {
                lectId: nextlectId,
                lectName: req.lectName,
                // lectage: req.lectage,
                lectdob: req.lectdob,
                lectgender: req.lectgender,
                lectdept: req.lectdept,
                lectPhoneNo: req.lectPhoneNo,
                lectEmail: req.lectEmail,
                additionalSKills: req.additionalSKills,
                lectstatus: req.lectstatus,
                clgToFile : null
            }
            req.clgToFile = null;
            await cds.update(Files).set({lectId : nextlectId}).where({lectId : req.lectId});
            await DELETE.from(College.drafts).where({ lectId: req.lectId });
            await DELETE.from(College).where({ lectId: req.lectId });
            await INSERT.into(College).entries(lectupdate);
            await cds.update(College).set({ lectage: calculateAge(req.lectdob) }).where({ lectId: nextlectId});
            await cds.update(Increment).set({ lid: nextlectId }).where({ lid: lastId});
        }
    });

    this.before('CREATE', College, async (req) => {
        debugger

        const tx = cds.transaction(req);
        const colleges = await tx.read(College.drafts);
        for (let clg of colleges) {
            if (containsOnlyLetters(clg.lectName) === false) {
                req.error(400, `${clg.lectName} is invalid Name.`);
                return;
            }
            if (clg.lectPhoneNo) {
                const existingStudPhone = await tx.read(Student).where({ studPhoneNo: clg.lectPhoneNo });
                const existingLectPhone = await (SELECT.from(College).where({ lectPhoneNo: clg.lectPhoneNo }));
                const existingDeptPhone = await (SELECT.from(Department).where({ deptPhoneNo: clg.lectPhoneNo }));
                if (existingStudPhone.length > 0) {
                    req.error(409, `Phone number ${clg.lectPhoneNo} already exists in Student`);
                    return;
                }
                else if (existingLectPhone.length > 1) {
                    req.error(409, `Phone number ${clg.lectPhoneNo} already exists in Lecture.`);
                    return;
                }
                else if (existingDeptPhone.length > 0) {
                    req.error(409, `Phone number ${clg.lectPhoneNo} already exists in Department.`);
                    return;
                }
                // else if (existingLectPhone.length === 1 && existingLectPhone[0].lectId !== req.data.lectId) {
                //     req.error(409, `Phone number ${clg.lectPhoneNo} already exists in Lecture.`);
                //     return;
                // }
                else if (isvalidPhoneNumber(clg.lectPhoneNo) === false) {
                    req.error(409, `Phone number ${clg.lectPhoneNo} is invalid.`);
                    return;
                }
            }

            // Validate email unique
            if (clg.lectEmail) {
                const existingStudEmail = await (SELECT.from(Student).where({ studEmail: clg.lectEmail }));
                const existingLectEmail = await (SELECT.from(Lecture).where({ lectEmail: clg.lectEmail }));
                const existingDeptEmail = await (SELECT.from(Department).where({ deptEmail: clg.lectEmail }));
                if (existingStudEmail.length > 0) {
                    req.error(409, `Email ${clg.lectEmail} is already exists in Student.`);
                    return;
                }
                else if (existingLectEmail.length > 1) {
                    req.error(409, `Email ${clg.lectEmail} already exists in Lecture.`);
                    return;
                }
                else if (existingDeptEmail.length > 0) {
                    req.error(409, `Email ${clg.lectEmail} already exists in Department.`);
                    return;
                }
                else if (existingLectEmail.length === 1 && existingLectEmail[0].lectId !== clg.lectId) {
                    req.error(409, `Email ${clg.lectEmail} already exists in Lecture.`);
                    return;
                }
                else if (isValidEmail(clg.lectEmail) === false) {
                    req.error(400, `${clg.lectEmail} is invalid Email.`);
                    return;
                }
            }
        }

        req.data.lectdept = req.data.lectdept.toUpperCase();
        const existingDept = await (SELECT.from(Department).where({ deptName: req.data.lectdept }));
        const existingAdmin = await (SELECT.from(Permission).where({ user: 'admin' }));
        var emailhod;
        if (existingDept.length !== 0) {
            debugger
            const deId = existingDept[0].deptId;
            const existingDeptId = await (SELECT.from(Permission).where({ user: existingDept[0].deptId }));
            if(existingDeptId){
                emailhod = existingDeptId[0].userEmail;
            }
            else{
                const existingDept = await (SELECT.from(Permission).where({ user: 'coordinator' }));
                emailhod = existingDept[0].userEmail;
                // req.error(400, `Department Email is not in Permission entity.`);
            }
        }
        else {
            const existingCoord = await (SELECT.from(Permission).where({ user: 'coordinator' }));
            emailhod = existingCoord[0].userEmail;
        }
        req.data.lectage = calculateAge(req.data.lectdob);
        if (req.data.lectage < 20) {
            req.error(400, `Age is less than 20.`);
        }
        req.data.lectgender = req.data.lectgender.charAt(0).toUpperCase() + req.data.lectgender.slice(1).toLowerCase()
        if (req.data.lectgender !== 'Male' && req.data.lectgender !== 'Female' && req.data.lectgender !== 'Others') {
            req.error(400, `${req.data.lectgender} is not a valid Gender.`);
        }
        debugger
        
        const workflowContent = {
            "definitionId": "us10.5293d840trial.collegedemo.process2",
            "context": {
                "lecturerName": req.data.lectName,
                "department": req.data.lectdept,
                "dOB": req.data.lectdob,
                "_age": req.data.lectage,
                "gender": req.data.lectgender,
                "additionalSkills": req.data.additionalSKills,
                "lecturerId": req.data.lectId,
                "lecturerPhoneNo": req.data.lectPhoneNo,
                "lecturerEmail": req.data.lectEmail,
                "hodemail": emailhod,
                "principalemail": existingAdmin[0].userEmail
            }
        };

        const SPA_API = await cds.connect.to('spa_api');
        const result = await SPA_API.post('/workflow/rest/v1/workflow-instances', workflowContent);

    });

    this.before('CREATE', Files.drafts, async (req) => {
        debugger
        console.log('Create Files called');
        console.log(JSON.stringify(req.data));
        // req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`;
        req.data.url = `Files(ID=${req.data.ID},IsActiveEntity=true)/content`;

    });

    // this.before('READ',clgToLect, async (req) => {
    // debugger
    // if(req._queryOptions && req._queryOptions.$select === 'IsActiveEntity,lectEmail,lectId,lectName,lectPhoneNo,lectstatus'){
    //     req.query.where({ lectstatus: 'Approved' });
    // }
    // return await cds.read(req.query);
    // });

    this.on('READ', College.drafts, async (req, next) => {  
        // debugger 
        if(req.data.lectdob !== undefined){
            const today = new Date()
            const dob = new Date(req.data.lectdob)
            today.setHours(0, 0, 0, 0);
            if(dob <= today){
                req.data.lectage = calculateAge(req.data.lectdob);
                await cds.update(College.drafts).set({ lectage: req.data.lectage }).where({lectId : req.data.lectId});
            }
            else{
                req.error(400, `Enter Valid DOB.`);
            }
        }
        return next();
    });

    this.on('postattach', async (req) => {
        debugger
        var Id = req.data.p;
        const existingRecord = (await (SELECT.from(College).where({lectId : Id})));
        return { status : existingRecord[0].lectstatus };
    });

};

