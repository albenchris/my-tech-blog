async function deleteButtonHandler(event) {
    event.preventDefault();

    const windLocArr = window.location.toString().split("/");
    const post_id = windLocArr[windLocArr.length - 1];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        document.location.replace("/dashboard/");
    } else {
        alert(response.statusText);
    }
};

document.querySelector(".delete-post-btn").addEventListener("click", deleteButtonHandler);