function showImagesByTag(tag) {
    const imageContainers = document.querySelectorAll(".image-container");
    imageContainers.forEach((container) => {
        if (tag === 'all' || container.classList.contains(tag)) {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
    });
}

// This function will execute after the page loads
document.addEventListener("DOMContentLoaded", function() {
    // Call showImagesByTag to display all images by default
    showImagesByTag('all');
});