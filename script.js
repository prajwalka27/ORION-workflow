document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Navigation Active State Toggle
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Handle view toggling
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                // Hide all views
                document.querySelectorAll('.view-section').forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('active');
                });

                // Show target view
                const targetView = document.getElementById(targetId);
                if (targetView) {
                    targetView.style.display = 'block';
                    // Optional: Animate content transition
                    targetView.style.opacity = '0.5';
                    setTimeout(() => {
                        targetView.style.opacity = '1';
                        targetView.style.transition = 'opacity 0.3s ease';
                        targetView.classList.add('active');
                    }, 50);
                }
            }
        });
    });

    // Button micro-interaction example
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function () {
            this.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', function () {
            this.style.transform = 'translateY(-2px)'; // Match hover state
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = ''; // Reset
        });
    });

    // Notification Panel Toggle Logic
    const btnNotifications = document.getElementById('btn-notifications');
    const notificationPanel = document.getElementById('notification-panel');
    if (btnNotifications && notificationPanel) {
        btnNotifications.addEventListener('click', (e) => {
            e.preventDefault();
            notificationPanel.classList.add('active');
        });
    }

    // Filter dropdown toggle
    const filterBtn = document.getElementById('btn-filter-attendance');
    const filterDropdown = document.getElementById('filter-dropdown');
    if (filterBtn && filterDropdown) {
        filterBtn.addEventListener('click', () => {
            filterDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
                filterDropdown.classList.remove('show');
            }
        });
    }

    // Attendance Sorting Logic
    const sortItems = document.querySelectorAll('.dropdown-item');
    const tableBody = document.querySelector('#attendance-table tbody');

    if (tableBody) {
        sortItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sortType = item.getAttribute('data-sort');
                const rows = Array.from(tableBody.querySelectorAll('tr'));

                rows.sort((a, b) => {
                    const valA = parseInt(a.getAttribute('data-attendance'));
                    const valB = parseInt(b.getAttribute('data-attendance'));

                    if (sortType === 'lowest') {
                        return valA - valB;
                    } else if (sortType === 'highest') {
                        return valB - valA;
                    }
                });

                // Re-append sorted rows
                rows.forEach(row => tableBody.appendChild(row));

                // Close dropdown
                filterDropdown.classList.remove('show');
            });
        });
    }

    // Create Event Modal Logic
    const modal = document.getElementById('create-event-modal');
    const btnCreateEvent = document.getElementById('btn-create-event');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnSaveEvent = document.getElementById('btn-save-event');
    const successMsg = document.getElementById('attendance-success-msg');
    const checkboxes = document.querySelectorAll('.member-checkbox');
    const selectedCountText = document.getElementById('selected-count-text');

    if (btnCreateEvent && modal) {
        btnCreateEvent.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (btnCloseModal && modal) {
        btnCloseModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    const createdEventsContainer = document.getElementById('created-events-container');
    const eventNameInput = document.getElementById('event-name');

    if (btnSaveEvent && modal && successMsg) {
        btnSaveEvent.addEventListener('click', () => {
            const eventName = eventNameInput ? eventNameInput.value.trim() : '';
            const checkedBoxes = document.querySelectorAll('.member-checkbox:checked');
            const checkedCount = checkedBoxes.length;
            const checkedNames = Array.from(checkedBoxes).map(box => box.value);

            if (eventName && createdEventsContainer) {
                // Create new event card
                const card = document.createElement('div');
                card.className = 'created-event-card';
                card.setAttribute('data-members', JSON.stringify(checkedNames));
                card.innerHTML = `
                    <h3>${eventName}</h3>
                    <span>${checkedCount} Members Selected</span>
                `;

                // Add click listener to open the view modal
                card.addEventListener('click', () => {
                    const viewEventModal = document.getElementById('view-event-modal');
                    const titleEl = document.getElementById('view-event-title');
                    const listEl = document.getElementById('view-event-members-list');
                    if (viewEventModal && titleEl && listEl) {
                        titleEl.textContent = eventName;
                        listEl.innerHTML = '';
                        checkedNames.forEach(name => {
                            const li = document.createElement('li');
                            li.textContent = name;
                            li.style.padding = '8px 12px';
                            li.style.background = 'rgba(255,255,255,0.05)';
                            li.style.borderRadius = 'var(--radius-sm)';
                            listEl.appendChild(li);
                        });
                        viewEventModal.style.display = 'flex';
                    }
                });

                createdEventsContainer.appendChild(card);
            }

            // Reset modal inputs
            if (eventNameInput) eventNameInput.value = '';
            checkboxes.forEach(box => box.checked = false);
            if (selectedCountText) selectedCountText.textContent = '0';

            // Close modal and show success message
            modal.style.display = 'none';
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000); // hide after 3 seconds
        });
    }

    // Live counter logic
    if (selectedCountText) {
        checkboxes.forEach(box => {
            box.addEventListener('change', () => {
                const checkedCount = document.querySelectorAll('.member-checkbox:checked').length;
                selectedCountText.textContent = checkedCount;
            });
        });
    }

    // Modal Search filter
    const searchInput = document.getElementById('member-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const labels = document.querySelectorAll('.member-checkbox-item');
            labels.forEach(label => {
                const name = label.textContent.toLowerCase();
                if (name.includes(term)) {
                    label.style.display = 'flex';
                } else {
                    label.style.display = 'none';
                }
            });
        });
    }
    // Add Member Modal Logic
    const addMemberModal = document.getElementById('add-member-modal');
    const btnAddMember = document.getElementById('btn-add-member');
    const btnCloseMemberModal = document.getElementById('btn-close-member-modal');
    const btnSaveMember = document.getElementById('btn-save-member');

    if (btnAddMember && addMemberModal) {
        btnAddMember.addEventListener('click', () => {
            addMemberModal.style.display = 'flex';
        });
    }
    if (btnCloseMemberModal && addMemberModal) {
        btnCloseMemberModal.addEventListener('click', () => {
            addMemberModal.style.display = 'none';
        });
    }
    if (btnSaveMember) {
        btnSaveMember.addEventListener('click', () => {
            const nameInput = document.getElementById('member-name-input');
            const roleInput = document.getElementById('member-role-input');
            const wingInput = document.getElementById('member-wing-input');
            const deptInput = document.getElementById('member-dept-input');

            const name = nameInput ? nameInput.value.trim() : '';
            const role = roleInput ? roleInput.value.trim() : '';
            const wing = wingInput ? wingInput.value.trim() : '';
            const dept = deptInput ? deptInput.value.trim() : '';

            if (!name) {
                alert('Please enter a Full Name.');
                return;
            }

            // Generate Avatar URL
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2C2C35&color=D4AF37&size=128`;

            const membersGrid = document.querySelector('.members-grid');
            if (membersGrid) {
                const card = document.createElement('div');
                card.className = 'member-card';
                card.innerHTML = `
                    <div class="member-info">
                        <img class="member-avatar" src="${avatarUrl}" alt="Avatar">
                        <div class="member-name">${name}</div>
                        <div class="member-role">${role}</div>
                        <div class="member-wing">${wing}</div>
                        <div class="member-dept">${dept}</div>
                    </div>
                    <div class="member-actions">
                        <button class="btn-icon" title="View Profile"><span class="material-symbols-outlined">visibility</span></button>
                        <button class="btn-icon" title="Update Profile"><span class="material-symbols-outlined">edit</span></button>
                        <button class="btn-icon btn-danger" title="Delete Member"><span class="material-symbols-outlined">delete</span></button>
                    </div>
                `;
                membersGrid.appendChild(card);
            }

            // Reset fields
            if (nameInput) nameInput.value = '';
            if (roleInput) roleInput.value = '';
            if (wingInput) wingInput.value = '';
            if (deptInput) deptInput.value = '';

            // Close modal
            if (addMemberModal) {
                addMemberModal.style.display = 'none';
            }
        });
    }

    // View Event Modal Logic
    const viewEventModal = document.getElementById('view-event-modal');
    const btnCloseViewEvent = document.getElementById('btn-close-view-event');
    const btnDismissViewEvent = document.getElementById('btn-dismiss-view-event');

    if (viewEventModal) {
        if (btnCloseViewEvent) btnCloseViewEvent.addEventListener('click', () => viewEventModal.style.display = 'none');
        if (btnDismissViewEvent) btnDismissViewEvent.addEventListener('click', () => viewEventModal.style.display = 'none');
    }

    // Member Cards Action Logic (View, Edit, Delete)
    const membersGridEl = document.querySelector('.members-grid');

    // View Profile Modal Elements
    const viewProfileModal = document.getElementById('view-profile-modal');
    const viewProfileAvatar = document.getElementById('view-profile-avatar');
    const viewProfileName = document.getElementById('view-profile-name');
    const viewProfileRole = document.getElementById('view-profile-role');
    const viewProfileWing = document.getElementById('view-profile-wing');
    const viewProfileDept = document.getElementById('view-profile-dept');
    const btnCloseViewProfile = document.getElementById('btn-close-view-profile');
    const btnDismissViewProfile = document.getElementById('btn-dismiss-view-profile');

    // Update Profile Modal Elements
    const updateProfileModal = document.getElementById('update-profile-modal');
    const updateNameInput = document.getElementById('update-member-name-input');
    const updateRoleInput = document.getElementById('update-member-role-input');
    const updateWingInput = document.getElementById('update-member-wing-input');
    const updateDeptInput = document.getElementById('update-member-dept-input');
    const btnCloseUpdateProfile = document.getElementById('btn-close-update-profile');
    const btnSaveUpdateMember = document.getElementById('btn-save-update-member');

    let currentEditingCard = null;

    if (membersGridEl) {
        membersGridEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-icon');
            if (!btn) return;

            const card = btn.closest('.member-card');
            if (!card) return;

            const name = card.querySelector('.member-name').textContent;
            const role = card.querySelector('.member-role').textContent;
            const wing = card.querySelector('.member-wing').textContent;
            const dept = card.querySelector('.member-dept').textContent;
            const avatarSrc = card.querySelector('.member-avatar').getAttribute('src');

            // Delete Logic
            if (btn.classList.contains('btn-danger') || btn.title === 'Delete Member') {
                if (confirm('Are you sure you want to remove this member?')) {
                    card.remove();
                }
            }
            // View Logic
            else if (btn.title === 'View Profile') {
                if (viewProfileModal) {
                    viewProfileAvatar.src = avatarSrc;
                    viewProfileName.textContent = name;
                    viewProfileRole.textContent = role;
                    viewProfileWing.textContent = wing;
                    viewProfileDept.textContent = dept;
                    viewProfileModal.style.display = 'flex';
                }
            }
            // Update Logic
            else if (btn.title === 'Update Profile') {
                if (updateProfileModal) {
                    currentEditingCard = card; // store reference
                    updateNameInput.value = name;
                    updateRoleInput.value = role;
                    updateWingInput.value = wing;
                    updateDeptInput.value = dept;
                    updateProfileModal.style.display = 'flex';
                }
            }
        });
    }

    // View Profile Close Logic
    const closeViewModal = () => { if (viewProfileModal) viewProfileModal.style.display = 'none'; };
    if (btnCloseViewProfile) btnCloseViewProfile.addEventListener('click', closeViewModal);
    if (btnDismissViewProfile) btnDismissViewProfile.addEventListener('click', closeViewModal);

    // Update Profile Close and Save Logic
    const closeUpdateModal = () => {
        if (updateProfileModal) updateProfileModal.style.display = 'none';
        currentEditingCard = null;
    };
    if (btnCloseUpdateProfile) btnCloseUpdateProfile.addEventListener('click', closeUpdateModal);

    if (btnSaveUpdateMember) {
        btnSaveUpdateMember.addEventListener('click', () => {
            if (!currentEditingCard) return;

            const newName = updateNameInput.value.trim();
            const newRole = updateRoleInput.value.trim();
            const newWing = updateWingInput.value.trim();
            const newDept = updateDeptInput.value.trim();

            if (!newName) {
                alert('Please enter a Full Name.');
                return;
            }

            // Update DOM
            currentEditingCard.querySelector('.member-name').textContent = newName;
            currentEditingCard.querySelector('.member-role').textContent = newRole;
            currentEditingCard.querySelector('.member-wing').textContent = newWing;
            currentEditingCard.querySelector('.member-dept').textContent = newDept;

            // Update Avatar if name changed
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=2C2C35&color=D4AF37&size=128`;
            currentEditingCard.querySelector('.member-avatar').src = avatarUrl;

            closeUpdateModal();
        });
    }
    // Dummy Notification System
    function pushNotification(message) {
        console.log(`[Notification]: ${message}`);
        // Display an on-screen toast
        const toast = document.createElement('div');
        toast.className = 'alert alert-success';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '9999';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    function checkDueTasks() {
        pushNotification("Task 'Update Members Directory' is due soon!");
    }
    // Simulate a check immediately for demo purposes
    setTimeout(checkDueTasks, 2000);

    // Tasks Logic
    const tasksGrid = document.querySelector('.tasks-grid');
    const taskModal = document.getElementById('task-modal');
    const taskModalTitle = document.getElementById('task-modal-title');
    const btnAssignTask = document.getElementById('btn-assign-task');
    const btnCloseTaskModal = document.getElementById('btn-close-task-modal');
    const btnSaveTask = document.getElementById('btn-save-task');

    const taskNameInput = document.getElementById('task-name-input');
    const taskAssignerInput = document.getElementById('task-assigner-input');
    const taskDescInput = document.getElementById('task-desc-input');
    const taskStartInput = document.getElementById('task-start-input');
    const taskDueInput = document.getElementById('task-due-input');
    const taskCheckboxes = document.querySelectorAll('.task-member-checkbox');
    const taskSelectedCount = document.getElementById('task-selected-count');
    const taskSelectedChips = document.getElementById('task-selected-chips');
    const taskMemberSearch = document.getElementById('task-member-search');

    let currentEditingTask = null;

    if (btnAssignTask && taskModal) {
        btnAssignTask.addEventListener('click', () => {
            currentEditingTask = null;
            if (taskModalTitle) taskModalTitle.textContent = 'Assign New Task';
            if (btnSaveTask) btnSaveTask.textContent = 'Save Task';

            // Clear fields
            if (taskNameInput) taskNameInput.value = '';
            if (taskAssignerInput) taskAssignerInput.value = '';
            if (taskDescInput) taskDescInput.value = '';
            if (taskStartInput) taskStartInput.value = '';
            if (taskDueInput) taskDueInput.value = '';
            taskCheckboxes.forEach(cb => cb.checked = false);
            updateTaskChips();

            taskModal.style.display = 'flex';
        });
    }

    if (btnCloseTaskModal && taskModal) {
        btnCloseTaskModal.addEventListener('click', () => {
            taskModal.style.display = 'none';
        });
    }

    function updateTaskChips() {
        if (!taskSelectedChips || !taskSelectedCount) return;
        const checkedBoxes = Array.from(document.querySelectorAll('.task-member-checkbox:checked'));
        taskSelectedCount.textContent = checkedBoxes.length;
        taskSelectedChips.innerHTML = '';
        checkedBoxes.forEach(cb => {
            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.textContent = cb.value;
            taskSelectedChips.appendChild(chip);
        });
    }

    taskCheckboxes.forEach(cb => {
        cb.addEventListener('change', updateTaskChips);
    });

    if (taskMemberSearch) {
        taskMemberSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.task-member-checkbox').forEach(cb => {
                const label = cb.closest('.member-checkbox-item');
                if (cb.value.toLowerCase().includes(term)) {
                    label.style.display = 'flex';
                } else {
                    label.style.display = 'none';
                }
            });
        });
    }

    if (btnSaveTask && taskModal) {
        btnSaveTask.addEventListener('click', () => {
            const name = taskNameInput ? taskNameInput.value.trim() : '';
            const assigner = taskAssignerInput ? taskAssignerInput.value.trim() : '';
            const desc = taskDescInput ? taskDescInput.value.trim() : '';
            const due = taskDueInput ? taskDueInput.value : '';
            const assignees = Array.from(document.querySelectorAll('.task-member-checkbox:checked')).map(cb => cb.value).join(', ');

            if (!name) {
                alert("Please enter a task name.");
                return;
            }

            if (currentEditingTask) {
                // Update Existing
                currentEditingTask.querySelector('.task-name').textContent = name;
                currentEditingTask.querySelector('.task-desc').textContent = desc;
                currentEditingTask.querySelector('.task-assigner').textContent = assigner;
                currentEditingTask.querySelector('.task-assignees').textContent = assignees;
                currentEditingTask.querySelector('.task-due-date').textContent = due;
                pushNotification(`Task Updated: ${name}`);
            } else if (tasksGrid) {
                // Create New
                const card = document.createElement('div');
                card.className = 'task-card';
                card.innerHTML = `
                    <div class="task-content">
                        <h3 class="task-name">${name}</h3>
                        <p class="task-desc">${desc}</p>
                        <div class="task-meta"><span class="meta-label">Assigned to:</span> <span class="task-assignees">${assignees}</span></div>
                        <div class="task-meta"><span class="meta-label">Assigned by:</span> <span class="task-assigner">${assigner}</span></div>
                        <div class="task-meta"><span class="meta-label">Due Date:</span> <span class="task-due-date">${due}</span></div>
                    </div>
                    <div class="task-actions">
                        <button class="btn-icon" title="Edit Task"><span class="material-symbols-outlined">edit</span></button>
                    </div>
                `;
                tasksGrid.appendChild(card);
                pushNotification(`New Task Assigned: ${name}`);
            }
            taskModal.style.display = 'none';
        });
    }

    // Edit Delegation
    if (tasksGrid) {
        tasksGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-icon');
            if (btn && btn.title === 'Edit Task') {
                const card = btn.closest('.task-card');
                currentEditingTask = card;

                const name = card.querySelector('.task-name').textContent;
                const desc = card.querySelector('.task-desc').textContent;
                const assigner = card.querySelector('.task-assigner').textContent;
                const assigneesStr = card.querySelector('.task-assignees').textContent;
                const assignees = assigneesStr ? assigneesStr.split(', ') : [];
                const due = card.querySelector('.task-due-date').textContent;

                if (taskModalTitle) taskModalTitle.textContent = 'Edit Task';
                if (btnSaveTask) btnSaveTask.textContent = 'Update Task';

                if (taskNameInput) taskNameInput.value = name;
                if (taskDescInput) taskDescInput.value = desc;
                if (taskAssignerInput) taskAssignerInput.value = assigner;
                if (taskDueInput) taskDueInput.value = due;
                if (taskStartInput) taskStartInput.value = '';

                taskCheckboxes.forEach(cb => {
                    cb.checked = assignees.includes(cb.value);
                });
                updateTaskChips();

                if (taskModal) taskModal.style.display = 'flex';
            }
        });
    }

    // Contributions Add Score Logic
    const btnAddScore = document.getElementById('btn-add-score');
    const scoreModal = document.getElementById('score-modal');
    const btnCloseScoreModal = document.getElementById('btn-close-score-modal');
    const btnSaveScore = document.getElementById('btn-save-score');

    if (btnAddScore && scoreModal) {
        btnAddScore.addEventListener('click', () => {
            if (document.getElementById('score-member-name')) document.getElementById('score-member-name').value = '';
            if (document.getElementById('score-events')) document.getElementById('score-events').value = '';
            if (document.getElementById('score-tasks')) document.getElementById('score-tasks').value = '';
            if (document.getElementById('score-leadership')) document.getElementById('score-leadership').value = '';
            if (document.getElementById('score-volunteer')) document.getElementById('score-volunteer').value = '';
            if (document.getElementById('score-wing-name')) document.getElementById('score-wing-name').value = '';
            if (document.getElementById('score-wing-pts')) document.getElementById('score-wing-pts').value = '';
            scoreModal.style.display = 'flex';
        });
    }

    if (btnCloseScoreModal && scoreModal) {
        btnCloseScoreModal.addEventListener('click', () => {
            scoreModal.style.display = 'none';
        });

        // Also close when clicking outside the modal content
        scoreModal.addEventListener('click', (e) => {
            if (e.target === scoreModal) {
                scoreModal.style.display = 'none';
            }
        });
    }

    if (btnSaveScore && scoreModal) {
        btnSaveScore.addEventListener('click', () => {
            const nameEl = document.getElementById('score-member-name');
            const name = nameEl ? nameEl.value.trim() : '';

            if (!name) {
                alert("Please enter a Member Name.");
                return;
            }

            const eventsEl = document.getElementById('score-events');
            const tasksEl = document.getElementById('score-tasks');
            const leadershipEl = document.getElementById('score-leadership');
            const volunteerEl = document.getElementById('score-volunteer');
            const wingNameEl = document.getElementById('score-wing-name');
            const wingPtsEl = document.getElementById('score-wing-pts');

            const events = eventsEl ? (parseInt(eventsEl.value) || 0) : 0;
            const tasks = tasksEl ? (parseInt(tasksEl.value) || 0) : 0;
            const leadership = leadershipEl ? (parseInt(leadershipEl.value) || 0) : 0;
            const volunteer = volunteerEl ? (parseInt(volunteerEl.value) || 0) : 0;
            const wingName = wingNameEl && wingNameEl.value.trim() !== '' ? wingNameEl.value.trim() : 'General';
            const wingPts = wingPtsEl ? (parseInt(wingPtsEl.value) || 0) : 0;

            const totalScore = events + tasks + leadership + volunteer + wingPts;

            // Color logic: >= 80 green, >= 60 yellow, < 60 red
            let scoreColor = '#F44336';
            if (totalScore >= 80) scoreColor = '#4CAF50';
            else if (totalScore >= 60) scoreColor = '#FFC107';

            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2C2C35&color=D4AF37`;

            const contributionsTableBody = document.querySelector('#view-contributions .data-table tbody');
            if (contributionsTableBody) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="${avatarUrl}" alt="" style="width: 32px; height: 32px; border-radius: 50%;">
                            <span style="font-weight: 500; color: var(--text-primary);">${name}</span>
                        </div>
                    </td>
                    <td>${events}/20</td>
                    <td>${tasks}/25</td>
                    <td>${leadership}/20</td>
                    <td>${volunteer}/10</td>
                    <td>${wingName} (${wingPts}/15)</td>
                    <td><span style="color: ${scoreColor}; font-weight: 600;">${totalScore}/100</span></td>
                `;
                contributionsTableBody.appendChild(tr);
            }

            scoreModal.style.display = 'none';
            if (typeof pushNotification === 'function') {
                pushNotification(`Contribution score added for ${name}`);
            }
        });
    }
});
