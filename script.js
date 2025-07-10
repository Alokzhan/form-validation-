$(document).ready(function () {
  // Show/Hide Password Toggle
  $("#showPassword").on("change", function () {
    const type = this.checked ? "text" : "password";
    $("#password, #confirmPassword").attr("type", type);
  });

  // Allow only digits in phone input
  $("#phone").on("input", function () {
    this.value = this.value.replace(/\D/g, ""); // Removes non-digits
  });

  $("#userForm").submit(function (e) {
    e.preventDefault();
    $("#message").hide().removeClass("error success");

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val().trim();
    const confirmPassword = $("#confirmPassword").val().trim();

    // Empty field check
    if (!name || !email || !phone || !password || !confirmPassword) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // Email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage("Enter a valid email address.", "error");
      return;
    }

    // Phone number check
    if (!/^\d{10}$/.test(phone)) {
      showMessage("Phone number must be exactly 10 digits.", "error");
      return;
    }

    // Password strength
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      showMessage(
        "Password must be at least 6 characters and include uppercase, lowercase, and numbers.",
        "error"
      );
      return;
    }

    // Confirm password check
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
