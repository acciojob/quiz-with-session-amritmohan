//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
        { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
        { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
        { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
    ];

    const questionsElement = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

    function renderQuestions() {
        questionsElement.innerHTML = ""; // Clear previous questions

        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `<p>${q.question}</p>`;

            q.choices.forEach(choice => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question-${index}`;
                input.value = choice;

                // Ensure no radio buttons are pre-checked unless stored in sessionStorage
                if (savedProgress[index] === choice) {
                    input.setAttribute("checked", "true");
                }

                input.addEventListener("change", () => {
                    savedProgress[index] = input.value;
                    sessionStorage.setItem("progress", JSON.stringify(savedProgress));
                });

                label.appendChild(input);
                label.append(choice);
                questionDiv.appendChild(label);
            });

            questionsElement.appendChild(questionDiv);
        });
    }

    renderQuestions();

    submitButton.addEventListener("click", () => {
        let score = 0;
        Object.keys(savedProgress).forEach(index => {
            if (savedProgress[index] === questions[index].answer) {
                score++;
            }
        });

        scoreDisplay.textContent = `Your score is ${score} out of 5.`;
        localStorage.setItem("score", score);
    });

    // Ensure score is shown after reload
    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
        scoreDisplay.textContent = `Your last score was ${savedScore} out of 5.`;
    }
});
