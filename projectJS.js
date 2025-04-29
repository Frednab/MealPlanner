// Define the days of the week and meal types
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"];

// When the page loads, dynamically build the meal input fields
window.onload = function() {
    let mealInputs = document.getElementById('mealInputs');
    days.forEach(day => {
        let dayDiv = document.createElement('div');
        dayDiv.classList.add('card');
        dayDiv.style.marginBottom = "20px";
        dayDiv.innerHTML = `<h3 class="center">${day}</h3>`;

        meals.forEach(meal => {
            dayDiv.innerHTML += `
                <div class="input-field">
                    <label for="${day}-${meal}">${meal}</label>
                    <input type="text" id="${day}-${meal}" required>
                </div>
            `;
        });

        mealInputs.appendChild(dayDiv);
    });
};

// Function to generate the meal plan and open a new page
function generateMealPlan() {
    const email = document.getElementById('email').value;
    const emailPattern = /\S+@\S+\.\S+/;

    // Validate the email
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const name = document.getElementById('name').value;
    const goal = document.getElementById('goal').value;

    // Open a new window
    let plannerWindow = window.open('', '', 'width=1000,height=800');
    plannerWindow.document.write(`
        <html>
        <head>
            <title>${name}'s Meal Plan</title>
            <style>
                body { font-family: monospace; padding: 20px; }
                h1, h2, h3 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid black; padding: 10px; text-align: left; }
                th { background-color: #4CAF50; color: white; }
            </style>
        </head>
        <body>
            <h1>${name}'s Meal Plan</h1>
            <h2>Goal: ${goal}</h2>
            <h3>Email: ${email}</h3>

            <table>
                <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Snack 1</th>
                    <th>Lunch</th>
                    <th>Snack 2</th>
                    <th>Dinner</th>
                </tr>
    `);

    // Fill the table with the meal inputs
    days.forEach(day => {
        plannerWindow.document.write("<tr>");
        plannerWindow.document.write(`<td>${day}</td>`);
        meals.forEach(meal => {
            const mealInput = document.getElementById(`${day}-${meal}`).value || "N/A";
            plannerWindow.document.write(`<td>${mealInput}</td>`);
        });
        plannerWindow.document.write("</tr>");
    });

    plannerWindow.document.write(`
            </table>
        </body>
        </html>
    `);

    plannerWindow.document.close();
}

// Function for "Download" button
function downloadPlanner() {
    alert("To download the planner, please use the 'Print' button and select 'Save as PDF'.");
}
