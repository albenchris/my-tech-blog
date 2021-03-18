async function loginFormHandler(event) {
    event.preventDefault();

    console.log("++++++++++++++++++++++++++++++++++++")

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                email,
                password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            console.log("Uh huh!")
            document.location.replace("/");
        } else {
            console.log("Nuh uh!")
            alert(response.statusText);
        }
    }
};

async function signupFormHandler(event) {
    event.preventDefault();
};

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
// document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);