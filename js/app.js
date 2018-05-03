/* MV* Version fo Udacity attendace */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

/* STUDENT APPLICATION */
(function() {
    var model = {
        attendance: JSON.parse(localStorage.attendance),
        studentList: Object.keys(JSON.parse(localStorage.attendance)),
    };


    var control = {
        init: function() {
            view.init();
        },
        // This function will return the missed days for an specific student.
        getMissedDaysTotal: function(studentName) {
            let totalMissed = 0;
            let studentAttendance = model.attendance[studentName];

            for (let i in studentAttendance) {
                if(studentAttendance[i] === false) {
                    totalMissed += 1;
                }
            }
            return totalMissed;
        },

        getStudentList: function() {
            return model.studentList;
        },

        getDayAssistance: function(studentName, day) {
            let dayAssistance = model.attendance[studentName][day];

            return dayAssistance;
        },
    };


    var view = {
        init: function() {
            this.render();
        },

        render: function() {
            let studentList = control.getStudentList(); // Getting the list of the students, to easily go over it.
            let temp = document.querySelectorAll('tbody .name-col'); // Temporary DOM element list for name filtering.
            let studentRow = null;
            let studentDayMissedCol = null; // DOM element variable to place the Total of missed days.
            let studentCheckboxesList = null; // DOM elements that signify the list of checkboxes for an specific user.

            // Filling up the Days Missed Column and marked checkboxes.
            for (let i in studentList) {
                let studentName = studentList[i];
                for(let i = 0; i < temp.length; i++) {
                    if(temp[i].innerText === studentName){
                        studentRow = temp[i].parentElement;
                    }
                }
                studentDayMissedCol = studentRow.querySelector('.missed-col');
                studentDayMissedCol.textContent = control.getMissedDaysTotal(studentName);

                studentCheckboxesList = studentRow.querySelectorAll('.attend-col>input');
                for (let i in studentCheckboxesList) {
                    studentCheckboxesList[i].checked = control.getDayAssistance(studentName, i);
                }
            }
        },
    };

    control.init();

    console.log("#############@@@@@@@@@@@@@@@@@@@#################");
}());
