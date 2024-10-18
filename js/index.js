const textElement = document.getElementById("dynamic-text");
const words = ["Frontend", "Backend", "Full Stack", "Admin Système", "DevOps"];
let currentWordIndex = 0;
let currentText = "";
let isDeleting = false;
let typingSpeed = 160;

function type() {
    const word = words[currentWordIndex];

    if (isDeleting) {
        currentText = word.substring(0, currentText.length - 1);
    } else {
        currentText = word.substring(0, currentText.length + 1);
    }

    textElement.textContent = currentText;

    textElement.classList.add('show');

    if (!isDeleting && currentText === word) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
    }

    const speed = isDeleting ? typingSpeed / 2 : typingSpeed;
    setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    type();
});