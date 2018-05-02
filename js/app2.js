/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
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
    let attendance = JSON.parse(localStorage.attendance);  // Getting the attendance data from the Window local storage, it is stored there in JSON form.
    let allMissed = document.querySelectorAll('tbody .missed-col');  // Getting the DOM elements that indicate ammount of missed days.
    let allCheckboxes = document.querySelectorAll('tbody input');  // Getting an array of all the checkboxes in the DOM.

    // Count a student's missed days
    function countMissing() {
        allMissed.forEach(function(day_mis_col_elem) {
            let studentRow = day_mis_col_elem.parentNode;
            let dayChecks = studentRow.querySelectorAll('td input');
            numMissed = 0;

            dayChecks.forEach(function(checkbox) {
                if(!checkbox.checked) {
                    numMissed += 1;
                }
            });

            day_mis_col_elem.textContent = numMissed;
        });
    }

    // Check boxes, based on attendace records
    Object.keys(attendance).forEach(function(name){
    let temp = document.querySelectorAll('tbody .name-col'); // I had to add this variable to imitate the jquery code.
    let studentRow = null; // Defined outsiede the for cycle for Variable Scope  accessibility
    for(let i = 0; i < temp.length; i++) {if(temp[i].innerText === name){studentRow =temp[i].parentElement}}
    let dayChecks = studentRow.querySelectorAll('.attend-col>input');

    dayChecks.forEach(function(item, index) {
        item.checked = attendance[name][index];
        });
    });

    // When a checkbox is clicked, update localStorage
    allCheckboxes.forEach(function(elem) {

        elem.addEventListener('click',(function(){
            let studentRows = document.querySelectorAll('tbody .student');
            let newAttendance = {};

            return function(){
                studentRows.forEach(function(row){
                    let name = row.getElementsByClassName('name-col')[0].innerText
                    let allCheckboxes = row.querySelectorAll('td>input');
                    newAttendance[name] = [];

                    allCheckboxes.forEach(function(item){
                        newAttendance[name].push(item.checked);
                    });
                });

                countMissing();
                localStorage.attendance = JSON.stringify(newAttendance);
            };
        })());
    });

    countMissing();
}());
