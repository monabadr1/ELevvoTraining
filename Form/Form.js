const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();

    // Regular Expression لفحص الإيميل
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    if (subject === "") {
        alert("Subject is required");
        return;
    }

    alert("Form submitted successfully ✅");
    form.reset();
});