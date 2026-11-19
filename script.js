// Change between portal pages
function showPage(pageId, button) {
    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.style.display = "none";
    });

    document.getElementById(pageId).style.display = "block";

    let buttons = document.querySelectorAll(".menu button");
    buttons.forEach(function(item) {
        item.classList.remove("active");
    });

    button.classList.add("active");
}

// Show error message
function showError(input, errorId, message) {
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
    document.getElementById(errorId).innerHTML = message;
}

// Show green border for valid input
function showSuccess(input) {
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

// Clear error messages and borders
function clearErrors(formId) {
    let form = document.getElementById(formId);
    let errors = form.querySelectorAll(".error");

    errors.forEach(function(item) {
        item.innerHTML = "";
    });

    let fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(function(field) {
        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");
    });
}

// Profile form validation
const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors("profileForm");

    let name = document.getElementById("patientName");
    let email = document.getElementById("patientEmail");
    let mobile = document.getElementById("patientMobile");
    let age = document.getElementById("patientAge");

    let valid = true;

    if (name.value.trim() === "") {
        showError(name, "patientNameError", "Name is required.");
        valid = false;
    } else if (!/^[A-Za-z ]+$/.test(name.value.trim())) {
        showError(name, "patientNameError", "Only letters and spaces are allowed.");
        valid = false;
    } else if (name.value.trim().length < 3) {
        showError(name, "patientNameError", "Name must be at least 3 characters.");
        valid = false;
    } else {
        showSuccess(name);
    }

    if (email.value.trim() === "") {
        showError(email, "patientEmailError", "Email is required.");
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "patientEmailError", "Enter a valid email address.");
        valid = false;
    } else {
        showSuccess(email);
    }

    if (!/^01[3-9][0-9]{8}$/.test(mobile.value.trim())) {
        showError(mobile, "patientMobileError", "Enter an 11 digit mobile number starting with 013-019.");
        valid = false;
    } else {
        showSuccess(mobile);
    }

    let ageValue = Number(age.value);
    if (age.value.trim() === "") {
        showError(age, "patientAgeError", "Age is required.");
        valid = false;
    } else if (!Number.isInteger(ageValue) || ageValue < 1 || ageValue > 120) {
        showError(age, "patientAgeError", "Enter a valid age from 1 to 120.");
        valid = false;
    } else {
        showSuccess(age);
    }

    if (valid) {
        document.getElementById("profileResult").innerHTML =
            "Profile updated successfully for " + name.value.trim() + ".";
    }
});

// Appointment booking validation
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors("bookingForm");

    let name = document.getElementById("bookName");
    let department = document.getElementById("department");
    let doctor = document.getElementById("doctor");
    let date = document.getElementById("appointmentDate");
    let time = document.getElementById("appointmentTime");
    let reason = document.getElementById("reason");

    let valid = true;

    if (name.value.trim() === "") {
        showError(name, "bookNameError", "Patient name is required.");
        valid = false;
    } else if (!/^[A-Za-z ]+$/.test(name.value.trim())) {
        showError(name, "bookNameError", "Only letters and spaces are allowed.");
        valid = false;
    } else if (name.value.trim().length < 3) {
        showError(name, "bookNameError", "Name must be at least 3 characters.");
        valid = false;
    } else {
        showSuccess(name);
    }

    if (department.value === "") {
        showError(department, "departmentError", "Please select a department.");
        valid = false;
    } else {
        showSuccess(department);
    }

    if (doctor.value === "") {
        showError(doctor, "doctorError", "Please select a doctor.");
        valid = false;
    } else {
        showSuccess(doctor);
    }

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let selectedDate = new Date(date.value + "T00:00:00");

    if (date.value === "") {
        showError(date, "appointmentDateError", "Please select an appointment date.");
        valid = false;
    } else if (selectedDate < today) {
        showError(date, "appointmentDateError", "Appointment date cannot be in the past.");
        valid = false;
    } else {
        showSuccess(date);
    }

    if (time.value === "") {
        showError(time, "appointmentTimeError", "Please select an appointment time.");
        valid = false;
    } else {
        showSuccess(time);
    }

    if (reason.value.trim() === "") {
        showError(reason, "reasonError", "Reason for visit is required.");
        valid = false;
    } else if (reason.value.trim().length < 5) {
        showError(reason, "reasonError", "Please write at least 5 characters.");
        valid = false;
    } else {
        showSuccess(reason);
    }

    if (valid) {
        let list = document.getElementById("appointmentList");
        let row = list.insertRow();

        row.innerHTML =
            "<td>" + doctor.value + "</td>" +
            "<td>" + date.value + "</td>" +
            "<td>" + time.value + "</td>" +
            "<td>Booked</td>" +
            '<td><button type="button" class="cancel-btn" onclick="cancelAppointment(this)">Cancel</button></td>';

        document.getElementById("bookingResult").innerHTML =
            "Appointment booked successfully for " + name.value.trim() + ".";

        bookingForm.reset();
        clearErrors("bookingForm");
    }
});

// Cancel an appointment
function cancelAppointment(button) {
    let row = button.parentElement.parentElement;
    row.cells[3].innerHTML = "Cancelled";
    button.disabled = true;
    button.innerHTML = "Cancelled";
    document.getElementById("appointmentMessage").innerHTML =
        "Appointment cancelled successfully.";
}

// Set minimum appointment date to today
let todayText = new Date().toISOString().split("T")[0];
document.getElementById("appointmentDate").setAttribute("min", todayText);
