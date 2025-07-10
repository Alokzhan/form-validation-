$(document).ready(function () {
  // Show/hide password toggle
  $("#showPassword").on("change", function () {
    const type = this.checked ? "text" : "password";
    $("#password, #confirmPassword").attr("type", type);
  });

  // Allow only digits in phone number field
  $("#phone").on("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  $("#userForm").submit(function (e) {
    e.preventDefault();
    $("#message").hide().removeClass("error success");

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val().trim();
    const confirmPassword = $("#confirmPassword").val().trim();

    // Required field check
    if (!name || !email || !phone || !password || !confirmPassword) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage("Enter a valid email address.", "error");
      return;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(phone)) {
      showMessage("Phone number must be exactly 10 digits.", "error");
      return;
    }

    // Password validation: 8-15 chars, upper, lower, number, special char
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
    if (!passwordPattern.test(password)) {
      showMessage(
        "Password must be 8–15 characters, include uppercase, lowercase, number, and special character.",
        "error"
      );
      return;
    }

    // Confirm password match
    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      return;
    }

    showMessage("Form submitted successfully!", "success");
  });

  function showMessage(msg, type) {
    $("#message").text(msg).addClass(type).slideDown();
  }
});
