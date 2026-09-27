// =====================================
// VOLUNTEERCONNECT JAVASCRIPT
// =====================================

console.log("VolunteerConnect website loaded successfully!");


// =====================================
// VOLUNTEER REGISTRATION
// =====================================

const volunteerForm = document.getElementById("volunteerForm");


if (volunteerForm) {

    volunteerForm.addEventListener("submit", function(event) {

        // Stop the page from refreshing
        event.preventDefault();


        // Get information from the form

        const name = document.getElementById("name").value;

        const email = document.getElementById("email").value;

        const phone = document.getElementById("phone").value;

        const skills = document.getElementById("skills").value;

        const availability =
            document.getElementById("availability").value;

        const interest =
            document.getElementById("interest").value;


        // Create volunteer object

        const volunteer = {

            name: name,

            email: email,

            phone: phone,

            skills: skills,

            availability: availability,

            interest: interest

        };


        // Get existing volunteers

        let volunteers =
            JSON.parse(localStorage.getItem("volunteers")) || [];


        // Add new volunteer

        volunteers.push(volunteer);


        // Save volunteers

        localStorage.setItem(
            "volunteers",
            JSON.stringify(volunteers)
        );


        // Show success message

        alert(
            "Registration successful! Welcome to VolunteerConnect, " +
            name + "!"
        );


        // Clear the form

        volunteerForm.reset();

    });

}
// =====================================
// JOIN VOLUNTEER TASK
// =====================================

const joinButtons = document.querySelectorAll(".join-task-btn");

joinButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const taskName = button.getAttribute("data-task");

        // Get previously joined tasks
        let joinedTasks =
            JSON.parse(localStorage.getItem("joinedTasks")) || [];

        // Check if task is already joined
        if (joinedTasks.includes(taskName)) {

            alert("You have already joined this task.");

            return;
        }

        // Add new task
        joinedTasks.push(taskName);

        // Save joined task
        localStorage.setItem(
            "joinedTasks",
            JSON.stringify(joinedTasks)
        );

        // Show success message
        alert(
            "You have successfully joined: " + taskName
        );
    });

});
 // =====================================
// DISPLAY VOLUNTEER SCHEDULE
// =====================================

const scheduleContainer =
    document.getElementById("scheduleContainer");

if (scheduleContainer) {

    // Get joined tasks
    const joinedTasks =
        JSON.parse(localStorage.getItem("joinedTasks")) || [];
        const allocations =
    JSON.parse(localStorage.getItem("allocations")) || [];

    // Check if there are no tasks
    if (joinedTasks.length === 0 && allocations.length === 0) {

        scheduleContainer.innerHTML = `
            <div class="empty-schedule">
                <div class="empty-icon">📅</div>

                <h2>No Tasks Joined Yet</h2>

                <p>
                    You have not joined any volunteer tasks.
                    Visit the Tasks page to find an opportunity.
                </p>

                <a href="tasks.html" class="schedule-btn">
                    Explore Tasks
                </a>
            </div>
        `;

    } else {

        // Display joined tasks
        joinedTasks.forEach(function(taskName) {
            // Display NGO allocated tasks

allocations.forEach(function(allocation) {

    const taskCard =
        document.createElement("div");

    taskCard.className =
        "schedule-card";

    taskCard.innerHTML = `
        <div class="schedule-icon">
            📌
        </div>

        <div class="schedule-info">

            <h2>
                ${allocation.taskName}
            </h2>

            <p>
                📋 Assigned by NGO
            </p>

            <p>
                👤 Volunteer:
                ${allocation.volunteerName}
            </p>

            <span class="schedule-status">
                Allocated
            </span>

        </div>
    `;

    scheduleContainer.appendChild(taskCard);

});

            const taskCard = document.createElement("div");

taskCard.className = "schedule-card";

taskCard.innerHTML = `
    <div class="schedule-icon">📋</div>

    <div class="schedule-info">

        <h2>${taskName}</h2>

        <p>
            ✅ You have joined this volunteer activity.
        </p>

        <span class="schedule-status">
            Registered
        </span>

        <br><br>

        <button
            class="delete-schedule-btn"
            onclick="deleteJoinedTask('${taskName}')">
            🗑️ Delete
        </button>

    </div>
`;

scheduleContainer.appendChild(taskCard);

        });
    }
}
 // =====================================
// VOLUNTEER DASHBOARD
// =====================================

const profileInfo =
    document.getElementById("profileInfo");

const taskCount =
    document.getElementById("taskCount");

if (profileInfo && taskCount) {

    // Get registered volunteers
    const volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    // Get joined tasks
    const joinedTasks =
        JSON.parse(localStorage.getItem("joinedTasks")) || [];
        const allocations =
    JSON.parse(localStorage.getItem("allocations")) || [];


    // Display latest registered volunteer

    if (volunteers.length > 0) {

        const volunteer =
            volunteers[volunteers.length - 1];

        profileInfo.innerHTML = `
            <p>
                <strong>Name:</strong>
                ${volunteer.name}
            </p>

            <p>
                <strong>Email:</strong>
                ${volunteer.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${volunteer.phone}
            </p>

            <p>
                <strong>Skills:</strong>
                ${volunteer.skills}
            </p>

            <p>
                <strong>Availability:</strong>
                ${volunteer.availability}
            </p>

            <p>
                <strong>Interest:</strong>
                ${volunteer.interest}
            </p>
        `;

    } else {

        profileInfo.innerHTML = `
            <p>
                No volunteer profile found.
            </p>

            <a href="register.html">
                Register as a Volunteer
            </a>
        `;
    }


    // Display number of joined tasks

    const allocatedTasks =
    allocations.filter(function(allocation) {

        return volunteers.length > 0 &&
            allocation.volunteerName ===
            volunteers[volunteers.length - 1].name;

    });

taskCount.textContent =
    joinedTasks.length + allocatedTasks.length;
}
 // =====================================
// NGO ADMIN DASHBOARD
// =====================================

const volunteerList =
    document.getElementById("volunteerList");

const volunteerCount =
    document.getElementById("volunteerCount");

const joinedTaskCount =
    document.getElementById("joinedTaskCount");


if (volunteerList && volunteerCount && joinedTaskCount) {

    // Get registered volunteers
    const volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    // Get joined tasks
    const joinedTasks =
        JSON.parse(localStorage.getItem("joinedTasks")) || [];


    // Display volunteer count

    volunteerCount.textContent =
        volunteers.length;


    // Display joined task count

    joinedTaskCount.textContent =
        joinedTasks.length;


    // Check if there are no volunteers

    if (volunteers.length === 0) {

        volunteerList.innerHTML = `
            <div class="no-volunteers">
                <p>
                    No volunteers have registered yet.
                </p>
            </div>
        `;

    } else {

        // Display every volunteer

        volunteers.forEach(function(volunteer, index) {

            const volunteerCard =
                document.createElement("div");

            volunteerCard.className =
                "admin-volunteer-card";


            volunteerCard.innerHTML = `

    <div class="admin-volunteer-number">
        ${index + 1}
    </div>

    <div class="admin-volunteer-info">

        <h3>
            ${volunteer.name}
        </h3>

        <p>
            📧 ${volunteer.email}
        </p>

        <p>
            📱 ${volunteer.phone}
        </p>

        <p>
            💻 <strong>Skills:</strong>
            ${volunteer.skills}
        </p>

        <p>
            📅 <strong>Availability:</strong>
            ${volunteer.availability}
        </p>

        <p>
            ❤️ <strong>Interest:</strong>
            ${volunteer.interest}
        </p>

        <button
            class="delete-volunteer-btn"
            onclick="deleteVolunteer(${index})">
            🗑️ Delete Volunteer
        </button>

    </div>

`;
            volunteerList.appendChild(
                volunteerCard
            );

        });
    }
}
// =====================================
// PARTICIPATION TRACKING
// =====================================

// =====================================
// PARTICIPATION TRACKING
// =====================================

const participationList =
    document.getElementById("participationList");

if (participationList) {

    const volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    const joinedTasks =
        JSON.parse(localStorage.getItem("joinedTasks")) || [];

    const allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];


    participationList.innerHTML = "";


    if (volunteers.length === 0) {

        participationList.innerHTML = `
            <p class="no-participation">
                No volunteers available for participation tracking.
            </p>
        `;

    } else {

        let participationFound = false;


        // =====================================
        // TRACK JOINED TASKS
        // =====================================

        volunteers.forEach(function(volunteer, volunteerIndex) {

            joinedTasks.forEach(function(taskName) {

                participationFound = true;

                const participationKey =
                    "participation_" +
                    volunteerIndex +
                    "_" +
                    taskName;

                const savedStatus =
                    localStorage.getItem(participationKey);


                const participationCard =
                    document.createElement("div");

                participationCard.className =
                    "participation-card";


                participationCard.innerHTML = `

                    <div class="participation-info">

                        <h3>
                            ${volunteer.name}
                        </h3>

                        <p>
                            📋 Task:
                            <strong>${taskName}</strong>
                        </p>

                        <p>
                            Status:
                            <span class="participation-status">
                                ${savedStatus || "Not Marked"}
                            </span>
                        </p>

                    </div>


                    <div class="participation-buttons">

                        <button
                            class="present-btn"
                            data-key="${participationKey}">
                            Present
                        </button>

                        <button
                            class="absent-btn"
                            data-key="${participationKey}">
                            Absent
                        </button>

                    </div>

                `;


                participationList.appendChild(
                    participationCard
                );

            });

        });


        // =====================================
        // TRACK ADMIN-ALLOCATED TASKS
        // =====================================

        allocations.forEach(function(allocation, allocationIndex) {

            participationFound = true;

            const participationKey =
                "allocation_participation_" +
                allocationIndex;

            const savedStatus =
                localStorage.getItem(participationKey);


            const participationCard =
                document.createElement("div");

            participationCard.className =
                "participation-card";


            participationCard.innerHTML = `

                <div class="participation-info">

                    <h3>
                        ${allocation.volunteerName}
                    </h3>

                    <p>
                        📋 Task:
                        <strong>${allocation.taskName}</strong>
                    </p>

                    <p>
                        Status:
                        <span class="participation-status">
                            ${savedStatus || "Not Marked"}
                        </span>
                    </p>

                    <span class="allocation-status">
                        Admin Allocated
                    </span>

                </div>


                <div class="participation-buttons">

                    <button
                        class="present-btn"
                        data-key="${participationKey}">
                        Present
                    </button>

                    <button
                        class="absent-btn"
                        data-key="${participationKey}">
                        Absent
                    </button>

                </div>

            `;


            participationList.appendChild(
                participationCard
            );

        });


        if (!participationFound) {

            participationList.innerHTML = `
                <p class="no-participation">
                    No tasks are available for participation tracking yet.
                </p>
            `;

        }


        // =====================================
        // PRESENT BUTTONS
        // =====================================

        const presentButtons =
            participationList.querySelectorAll(
                ".present-btn"
            );

        presentButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const key =
                        button.getAttribute("data-key");

                    localStorage.setItem(
                        key,
                        "Present"
                    );

                    alert(
                        "Volunteer marked as Present."
                    );

                    location.reload();

                }
            );

        });


        // =====================================
        // ABSENT BUTTONS
        // =====================================

        const absentButtons =
            participationList.querySelectorAll(
                ".absent-btn"
            );

        absentButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const key =
                        button.getAttribute("data-key");

                    localStorage.setItem(
                        key,
                        "Absent"
                    );

                    alert(
                        "Volunteer marked as Absent."
                    );

                    location.reload();

                }
            );

        });

    }
}


// =====================================
// TASK ALLOCATION
// =====================================// =====================================
// TASK ALLOCATION
// =====================================

const volunteerSelect =
    document.getElementById("volunteerSelect");

const taskSelect =
    document.getElementById("taskSelect");

const allocateTaskBtn =
    document.getElementById("allocateTaskBtn");

const allocationList =
    document.getElementById("allocationList");


if (
    volunteerSelect &&
    taskSelect &&
    allocateTaskBtn &&
    allocationList
) {

    // Get registered volunteers
    const volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    // Get existing allocations
    let allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];


    // Add volunteers to dropdown

    volunteers.forEach(function(volunteer, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            volunteer.name;

        volunteerSelect.appendChild(option);

    });
// Add admin-created tasks to task dropdown

const adminTasks =
    JSON.parse(localStorage.getItem("adminTasks")) || [];

adminTasks.forEach(function(task) {

    const option =
        document.createElement("option");

    option.value =
        task.name;

    option.textContent =
        task.name;

    taskSelect.appendChild(option);

});

    // Display existing allocations

    function displayAllocations() {

        allocationList.innerHTML = "";

        if (allocations.length === 0) {

            allocationList.innerHTML = `
                <p class="no-allocations">
                    No tasks have been allocated yet.
                </p>
            `;

            return;
        }


        allocations.forEach(function(allocation, index) {

            const card =
                document.createElement("div");

            card.className =
                "allocation-card";


            card.innerHTML = `

                <div class="allocation-info">

                    <h3>
                        ${allocation.volunteerName}
                    </h3>

                    <p>
                        📋 Task:
                        <strong>${allocation.taskName}</strong>
                    </p>

                    <span class="allocation-status">
                        Allocated
                    </span>

                </div>


                <button
                    class="remove-allocation-btn"
                    data-index="${index}">
                    Remove
                </button>

            `;


            allocationList.appendChild(card);

        });


        // Remove allocation buttons

        const removeButtons =
            document.querySelectorAll(
                ".remove-allocation-btn"
            );


        removeButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        button.getAttribute("data-index");

                    allocations.splice(index, 1);

                    localStorage.setItem(
                        "allocations",
                        JSON.stringify(allocations)
                    );

                    displayAllocations();

                }
            );

        });

    }


    // Allocate task

    allocateTaskBtn.addEventListener(
        "click",
        function() {

            const volunteerIndex =
                volunteerSelect.value;

            const taskName =
                taskSelect.value;


            if (volunteerIndex === "") {

                alert(
                    "Please select a volunteer."
                );

                return;
            }


            if (taskName === "") {

                alert(
                    "Please select a task."
                );

                return;
            }


            const volunteer =
                volunteers[volunteerIndex];


            const alreadyAllocated =
                allocations.some(function(allocation) {

                    return (
                        allocation.volunteerName ===
                            volunteer.name &&
                        allocation.taskName ===
                            taskName
                    );

                });


            if (alreadyAllocated) {

                alert(
                    "This task is already allocated to this volunteer."
                );

                return;
            }


            allocations.push({

                volunteerName:
                    volunteer.name,

                taskName:
                    taskName

            });


            localStorage.setItem(
                "allocations",
                JSON.stringify(allocations)
            );


            alert(
                "Task successfully allocated to " +
                volunteer.name + "."
            );


            volunteerSelect.value = "";

            taskSelect.value = "";


            displayAllocations();

        }
    );


    // Display allocations when page loads

    displayAllocations();

}
 // =====================================
// DISPLAY ASSIGNED TASKS
// =====================================

const assignedTasksList =
    document.getElementById("assignedTasksList");

if (assignedTasksList) {

    const volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    const allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];


    assignedTasksList.innerHTML = "";


    if (volunteers.length === 0) {

        assignedTasksList.innerHTML = `
            <p class="no-assigned-tasks">
                Please register as a volunteer first.
            </p>
        `;

    } else {

        // Get the latest registered volunteer
        const currentVolunteer =
            volunteers[volunteers.length - 1];


        // Find tasks assigned to this volunteer
        const myAllocations =
            allocations.filter(function(allocation) {

                return allocation.volunteerName ===
                    currentVolunteer.name;

            });


        if (myAllocations.length === 0) {

            assignedTasksList.innerHTML = `
                <p class="no-assigned-tasks">
                    No tasks have been assigned to you yet.
                </p>
            `;

        } else {

            myAllocations.forEach(function(allocation) {

                const taskCard =
                    document.createElement("div");

                taskCard.className =
                    "assigned-task-card";


                taskCard.innerHTML = `

                    <div class="assigned-task-icon">
                        📌
                    </div>

                    <div class="assigned-task-info">

                        <h3>
                            ${allocation.taskName}
                        </h3>

                        <p>
                            👤 Assigned to:
                            ${allocation.volunteerName}
                        </p>

                        <span class="assigned-status">
                            Assigned by NGO
                        </span>

                    </div>

                `;


                assignedTasksList.appendChild(
                    taskCard
                );

            });

        }
    }
}
// =====================================
// COMPLETED ACTIVITIES COUNT
// =====================================

const completedActivityCount =
    document.getElementById("completedActivityCount");

if (completedActivityCount) {

    const volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    const joinedTasks =
        JSON.parse(localStorage.getItem("joinedTasks")) || [];

    let completedCount = 0;

    volunteers.forEach(function(volunteer, volunteerIndex) {

        joinedTasks.forEach(function(task, taskIndex) {

            const participation =
                localStorage.getItem(
                    "participation_" +
                    volunteerIndex +
                    "_" +
                    taskIndex
                );

            if (participation === "Present") {
                completedCount++;
            }

        });

    });

    completedActivityCount.textContent = completedCount;
}
// =====================================
// VOLUNTEER COMPLETED ACTIVITIES COUNT
// =====================================

const volunteerCompletedCount =
    document.getElementById("volunteerCompletedCount");

if (volunteerCompletedCount) {

    const volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    const joinedTasks =
        JSON.parse(localStorage.getItem("joinedTasks")) || [];

    const allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    let completedCount = 0;

    // Get the latest registered volunteer
    const currentVolunteer =
        volunteers.length > 0
            ? volunteers[volunteers.length - 1]
            : null;

    if (currentVolunteer) {

        // Check joined tasks
        joinedTasks.forEach(function(task, taskIndex) {

            const volunteerIndex =
                volunteers.length - 1;

            const participation =
                localStorage.getItem(
                    "participation_" +
                    volunteerIndex +
                    "_" +
                    taskIndex
                );

            if (participation === "Present") {
                completedCount++;
            }
        });

        // Check allocated tasks
        const assignedTasks =
            allocations.filter(function(allocation) {
                return allocation.volunteerName ===
                    currentVolunteer.name;
            });

        assignedTasks.forEach(function(allocation) {

            const allocationIndex =
                allocations.indexOf(allocation);

            const participation =
                localStorage.getItem(
                    "allocation_participation_" +
                    allocationIndex
                );

            if (participation === "Present") {
                completedCount++;
            }
        });
    }

    volunteerCompletedCount.textContent =
        completedCount;
}
// =====================================
// DELETE JOINED SCHEDULE TASK
// =====================================

function deleteJoinedTask(taskName) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            taskName +
            " from your schedule?"
        );

    if (!confirmDelete) {
        return;
    }

    let joinedTasks =
        JSON.parse(localStorage.getItem("joinedTasks")) || [];

    joinedTasks =
        joinedTasks.filter(function(task) {
            return task !== taskName;
        });

    localStorage.setItem(
        "joinedTasks",
        JSON.stringify(joinedTasks)
    );

    alert(
        taskName +
        " has been removed from your schedule."
    );

    location.reload();
}
// =====================================
// DELETE REGISTERED VOLUNTEER
// =====================================

function deleteVolunteer(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this volunteer?"
    );

    if (!confirmDelete) {
        return;
    }

    let volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    if (!volunteers[index]) {
        return;
    }

    const deletedVolunteer = volunteers[index];

    volunteers.splice(index, 1);

    localStorage.setItem(
        "volunteers",
        JSON.stringify(volunteers)
    );

    // Remove allocations belonging to deleted volunteer

    let allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    allocations = allocations.filter(function(allocation) {

        return allocation.volunteerName !==
            deletedVolunteer.name;

    });

    localStorage.setItem(
        "allocations",
        JSON.stringify(allocations)
    );

    alert(
        deletedVolunteer.name +
        " has been removed successfully."
    );

    location.reload();
}
// =====================================
// ADMIN TASK MANAGEMENT
// CREATE / EDIT / DELETE TASKS
// =====================================

const saveAdminTaskBtn =
    document.getElementById("saveAdminTaskBtn");

if (saveAdminTaskBtn) {

    displayAdminTasks();

    saveAdminTaskBtn.addEventListener(
        "click",
        function () {

            const taskName =
                document.getElementById("adminTaskName").value.trim();

            const taskDate =
                document.getElementById("adminTaskDate").value;

            const taskTime =
                document.getElementById("adminTaskTime").value.trim();

            const taskLocation =
                document.getElementById("adminTaskLocation").value.trim();

            const taskCapacity =
                document.getElementById("adminTaskCapacity").value;

            const taskDescription =
                document.getElementById("adminTaskDescription").value.trim();

            const editingTaskIndex =
                parseInt(
                    document.getElementById("editingTaskIndex").value
                );


            // CHECK REQUIRED FIELDS

            if (
                taskName === "" ||
                taskDate === "" ||
                taskTime === "" ||
                taskLocation === "" ||
                taskCapacity === ""
            ) {

                alert(
                    "Please fill in all required task details."
                );

                return;
            }


            // GET EXISTING ADMIN TASKS

            let adminTasks =
                JSON.parse(
                    localStorage.getItem("adminTasks")
                ) || [];


            // CREATE TASK OBJECT

            const task = {

                name: taskName,

                date: taskDate,

                time: taskTime,

                location: taskLocation,

                capacity: taskCapacity,

                description: taskDescription

            };


            // EDIT EXISTING TASK

            if (editingTaskIndex >= 0) {

                adminTasks[editingTaskIndex] = task;

                alert(
                    "Task updated successfully."
                );

            }

            // CREATE NEW TASK

            else {

                adminTasks.push(task);

                alert(
                    "Task created successfully."
                );

            }


            // SAVE TASKS

            localStorage.setItem(
                "adminTasks",
                JSON.stringify(adminTasks)
            );


            // CLEAR FORM

            clearAdminTaskForm();


            // DISPLAY TASKS

            displayAdminTasks();

        }
    );
}


// =====================================
// DISPLAY ADMIN TASKS
// =====================================

function displayAdminTasks() {

    const adminTaskList =
        document.getElementById("adminTaskList");

    if (!adminTaskList) {
        return;
    }


    const adminTasks =
        JSON.parse(
            localStorage.getItem("adminTasks")
        ) || [];


    adminTaskList.innerHTML = "";


    if (adminTasks.length === 0) {

        adminTaskList.innerHTML = `

            <div class="no-admin-tasks">

                <p>
                    No tasks have been created yet.
                </p>

            </div>

        `;

        return;
    }


    adminTasks.forEach(
        function (task, index) {

            const taskCard =
                document.createElement("div");

            taskCard.className =
                "admin-task-card";


            taskCard.innerHTML = `

                <div class="admin-task-info">

                    <h3>
                        ${task.name}
                    </h3>

                    <p>
                        📅 <strong>Date:</strong>
                        ${task.date}
                    </p>

                    <p>
                        🕐 <strong>Time:</strong>
                        ${task.time}
                    </p>

                    <p>
                        📍 <strong>Location:</strong>
                        ${task.location}
                    </p>

                    <p>
                        👥 <strong>Required Volunteers:</strong>
                        ${task.capacity}
                    </p>

                    ${
                        task.description
                            ? `
                                <p>
                                    📝 <strong>Description:</strong>
                                    ${task.description}
                                </p>
                              `
                            : ""
                    }

                </div>


                <div class="admin-task-actions">

                    <button
                        class="edit-task-btn"
                        onclick="editAdminTask(${index})">

                        ✏️ Edit

                    </button>


                    <button
                        class="delete-task-btn"
                        onclick="deleteAdminTask(${index})">

                        🗑️ Delete

                    </button>

                </div>

            `;


            adminTaskList.appendChild(
                taskCard
            );

        }
    );
}


// =====================================
// EDIT ADMIN TASK
// =====================================

function editAdminTask(index) {

    const adminTasks =
        JSON.parse(
            localStorage.getItem("adminTasks")
        ) || [];


    const task =
        adminTasks[index];


    if (!task) {
        return;
    }


    document.getElementById(
        "adminTaskName"
    ).value = task.name;


    document.getElementById(
        "adminTaskDate"
    ).value = task.date;


    document.getElementById(
        "adminTaskTime"
    ).value = task.time;


    document.getElementById(
        "adminTaskLocation"
    ).value = task.location;


    document.getElementById(
        "adminTaskCapacity"
    ).value = task.capacity;


    document.getElementById(
        "adminTaskDescription"
    ).value = task.description || "";


    document.getElementById(
        "editingTaskIndex"
    ).value = index;


    document.getElementById(
        "saveAdminTaskBtn"
    ).textContent = "Update Task";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =====================================
// DELETE ADMIN TASK
// =====================================

function deleteAdminTask(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {
        return;
    }


    let adminTasks =
        JSON.parse(
            localStorage.getItem("adminTasks")
        ) || [];


    if (!adminTasks[index]) {
        return;
    }


    const deletedTask =
        adminTasks[index];


    adminTasks.splice(
        index,
        1
    );


    localStorage.setItem(
        "adminTasks",
        JSON.stringify(adminTasks)
    );


    alert(
        deletedTask.name +
        " has been deleted."
    );


    displayAdminTasks();

}


// =====================================
// CLEAR ADMIN TASK FORM
// =====================================

function clearAdminTaskForm() {

    document.getElementById(
        "adminTaskName"
    ).value = "";


    document.getElementById(
        "adminTaskDate"
    ).value = "";


    document.getElementById(
        "adminTaskTime"
    ).value = "";


    document.getElementById(
        "adminTaskLocation"
    ).value = "";


    document.getElementById(
        "adminTaskCapacity"
    ).value = "";


    document.getElementById(
        "adminTaskDescription"
    ).value = "";


    document.getElementById(
        "editingTaskIndex"
    ).value = -1;


    document.getElementById(
        "saveAdminTaskBtn"
    ).textContent = "Create Task";

}
// =====================================
// DISPLAY ADMIN-CREATED TASKS
// =====================================

const tasksContainer =
    document.querySelector(".tasks-container");

if (tasksContainer) {

    const adminTasks =
        JSON.parse(
            localStorage.getItem("adminTasks")
        ) || [];


    if (adminTasks.length > 0) {

        const heading =
            document.createElement("div");

        heading.className =
            "admin-created-tasks-heading";

        heading.innerHTML = `
            <h2>NGO Created Opportunities</h2>

            <p>
                Explore the latest volunteering tasks
                created by the NGO administrator.
            </p>
        `;

        tasksContainer.parentNode.insertBefore(
            heading,
            tasksContainer
        );


        adminTasks.forEach(function(task) {

            const taskCard =
                document.createElement("div");

            taskCard.className =
                "task-card admin-created-task-card";


            taskCard.innerHTML = `

                <div class="task-icon">
                    🤝
                </div>

                <h2>
                    ${task.name}
                </h2>

                ${
                    task.description
                        ? `
                            <p>
                                ${task.description}
                            </p>
                          `
                        : ""
                }

                <div class="task-details">

                    <p>
                        📅 <strong>Date:</strong>
                        ${task.date}
                    </p>

                    <p>
                        🕐 <strong>Time:</strong>
                        ${task.time}
                    </p>

                    <p>
                        📍 <strong>Location:</strong>
                        ${task.location}
                    </p>

                    <p>
                        👥 <strong>Volunteers Needed:</strong>
                        ${task.capacity}
                    </p>

                </div>

                <button
                    class="join-task-btn admin-join-task-btn"
                    data-task="${task.name}"
                >
                    Join Task
                </button>

            `;


            tasksContainer.appendChild(
                taskCard
            );


            // JOIN ADMIN-CREATED TASK

            const joinButton =
                taskCard.querySelector(
                    ".admin-join-task-btn"
                );


            joinButton.addEventListener(
                "click",
                function() {

                    const taskName =
                        task.name;


                    let joinedTasks =
                        JSON.parse(
                            localStorage.getItem(
                                "joinedTasks"
                            )
                        ) || [];


                    if (
                        joinedTasks.includes(
                            taskName
                        )
                    ) {

                        alert(
                            "You have already joined this task."
                        );

                        return;
                    }


                    joinedTasks.push(
                        taskName
                    );


                    localStorage.setItem(
                        "joinedTasks",
                        JSON.stringify(
                            joinedTasks
                        )
                    );


                    alert(
                        "You have successfully joined: " +
                        taskName
                    );

                }
            );

        });

    }

}
// =====================================
// VOLUNTEER HOURS
// =====================================

const volunteerHours =
    document.getElementById("volunteerHours");

if (volunteerHours) {

    const volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    const allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    const adminTasks =
        JSON.parse(localStorage.getItem("adminTasks")) || [];

    let totalHours = 0;

    // Get the latest registered volunteer
    const currentVolunteer =
        volunteers.length > 0
            ? volunteers[volunteers.length - 1]
            : null;


    if (currentVolunteer) {

        allocations.forEach(
            function(allocation, allocationIndex) {

                // Check whether this allocation belongs
                // to the current volunteer

                if (
                    allocation.volunteerName !==
                    currentVolunteer.name
                ) {
                    return;
                }


                // Check attendance

                const participation =
                    localStorage.getItem(
                        "allocation_participation_" +
                        allocationIndex
                    );

                if (participation !== "Present") {
                    return;
                }


                // Find the task

                const task =
                    adminTasks.find(
                        function(task) {
                            return (
                                task.name ===
                                allocation.taskName
                            );
                        }
                    );


                if (!task) {
                    return;
                }


                // Calculate hours from task time

                const timeParts =
                    task.time.split("-");

                if (timeParts.length !== 2) {
                    return;
                }


                const startTime =
                    parseTimeToMinutes(
                        timeParts[0].trim()
                    );

                const endTime =
                    parseTimeToMinutes(
                        timeParts[1].trim()
                    );


                if (
                    startTime !== null &&
                    endTime !== null &&
                    endTime > startTime
                ) {

                    const hours =
                        (endTime - startTime) / 60;

                    totalHours += hours;

                }

            }
        );

    }


    // Display hours

    volunteerHours.textContent =
        Number.isInteger(totalHours)
            ? totalHours
            : totalHours.toFixed(1);

}


// =====================================
// CONVERT TIME TO MINUTES
// =====================================

function parseTimeToMinutes(timeString) {

    const match =
        timeString.match(
            /^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i
        );

    if (!match) {
        return null;
    }


    let hours =
        parseInt(match[1]);

    const minutes =
        parseInt(match[2] || "0");

    const period =
        match[3].toUpperCase();


    if (hours < 1 || hours > 12) {
        return null;
    }


    if (minutes < 0 || minutes > 59) {
        return null;
    }


    if (period === "AM" && hours === 12) {
        hours = 0;
    }

    if (period === "PM" && hours !== 12) {
        hours += 12;
    }


    return (
        hours * 60 +
        minutes
    );

}