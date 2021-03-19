async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value.trim();
    const contents = document.querySelector("textarea[name='post-contents']").value;

    const windLocArr = window.location.toString().split("/");
    const post_id = windLocArr[windLocArr.length - 1];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            contents
        }),
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        document.location.replace("/dashboard/");
    } else {
        alert(response.statusText);
    }
};

document.querySelector(".edit-post-form").addEventListener("submit", editFormHandler);