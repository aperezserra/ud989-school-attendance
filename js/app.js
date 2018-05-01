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

    countMissing();

}());
