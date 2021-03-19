async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value;
    const contents = document.querySelector("textarea[name='post-contents']").value;

    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
            title,
            contents
        }),
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        console.log(title, contents);
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
};

document.querySelector(".new-post-form").addEventListener("submit", newPostHandler);