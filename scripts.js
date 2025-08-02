const firebaseConfig = {
  apiKey: "AIzaSyDM0136Z0CpQd0984sCPSISjCeHJgt4-yo",
  authDomain: "internfund.firebaseapp.com",
  projectId: "internfund",
  storageBucket: "internfund.firebasestorage.app",
  messagingSenderId: "649902893025",
  appId: "1:649902893025:web:35273cae44258bc1c054a0",
  measurementId: "G-CM8714HR50",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let editingDonationIndex = -1;

function showPage(pageName) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById(pageName + "Page").classList.add("active");

  if (pageName === "login" || pageName === "signup") {
    document.getElementById("dashboardBtn").style.display = "none";
    document.getElementById("leaderboardBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
  } else {
    document.getElementById("dashboardBtn").style.display = "inline-block";
    document.getElementById("leaderboardBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "inline-block";
  }

  if (pageName === "leaderboard") {
    loadLeaderboard();
  }
}

function generateReferralCode(username) {
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return username.toLowerCase().replace(/\s+/g, "") + randomNum;
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      loadDashboard();
      showPage("dashboard");
    } else {
      alert("Invalid credentials. Please try signing up first.");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      alert("User already exists. Please login instead.");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
      referralCode: generateReferralCode(name),
      totalRaised: 0,
      donations: [],
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    currentUser = newUser;
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    loadDashboard();
    showPage("dashboard");

    alert("Account created successfully!");
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
});

function loadDashboard() {
  if (!currentUser) return;

  document.getElementById(
    "welcomeText"
  ).textContent = `Welcome back, ${currentUser.name}!`;
  document.getElementById("userName").textContent = currentUser.name;
  document.getElementById("userEmail").textContent = currentUser.email;
  document.getElementById("referralCode").textContent =
    currentUser.referralCode;

  updateTotalRaised();
  loadDonationTable();
  updateRewards();
}

function updateTotalRaised() {
  if (!currentUser.donations) currentUser.donations = [];
  const total = currentUser.donations.reduce(
    (sum, donation) => sum + parseFloat(donation.amount || 0),
    0
  );
  currentUser.totalRaised = total;

  document.getElementById(
    "totalRaised"
  ).textContent = `₹${total.toLocaleString()}`;
  document.getElementById("donationTotal").textContent = `₹${total.toFixed(2)}`;

  // Update user data in localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((u) => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
}

function addDonation() {
  const amount = document.getElementById("donationAmount").value;
  const details = document.getElementById("donationDetails").value;
  const date = document.getElementById("donationDate").value;
  const imageFile = document.getElementById("donationImage").files[0];

  if (!amount || !details || !date) {
    alert("Please fill in all required fields (Amount, Details, Date)");
    return;
  }

  const donation = {
    id: Date.now().toString(),
    amount: parseFloat(amount),
    details: details,
    date: date,
    image: null,
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      donation.image = e.target.result;
      saveDonation(donation);
    };
    reader.readAsDataURL(imageFile);
  } else {
    saveDonation(donation);
  }
}

function saveDonation(donation) {
  if (!currentUser.donations) currentUser.donations = [];

  if (editingDonationIndex >= 0) {
    currentUser.donations[editingDonationIndex] = donation;
    editingDonationIndex = -1;
  } else {
    currentUser.donations.push(donation);
  }

  clearDonationForm();
  loadDonationTable();
  updateTotalRaised();
  updateRewards();
}

function clearDonationForm() {
  document.getElementById("donationAmount").value = "";
  document.getElementById("donationDetails").value = "";
  document.getElementById("donationDate").value = "";
  document.getElementById("donationImage").value = "";
}

function loadDonationTable() {
  const tbody = document.getElementById("donationTableBody");
  tbody.innerHTML = "";

  if (!currentUser.donations || currentUser.donations.length === 0) {
    tbody.innerHTML = `
            <tr>
              <td colspan="5" style="text-align: center; padding: 20px; color: var(--text-secondary);">
                No donations recorded yet. Add your first donation above!
              </td>
            </tr>
          `;
    return;
  }

  currentUser.donations.forEach((donation, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${new Date(donation.date).toLocaleDateString()}</td>
            <td>₹${parseFloat(donation.amount).toFixed(2)}</td>
            <td>${donation.details}</td>
            <td>${
              donation.image
                ? `<img src="${donation.image}" alt="Proof">`
                : "No image"
            }</td>
            <td>
              <button class="edit-btn" onclick="editDonation(${index})">Edit</button>
              <button class="delete-btn" onclick="deleteDonation(${index})">Delete</button>
            </td>
          `;
    tbody.appendChild(row);
  });
}

function editDonation(index) {
  const donation = currentUser.donations[index];
  document.getElementById("donationAmount").value = donation.amount;
  document.getElementById("donationDetails").value = donation.details;
  document.getElementById("donationDate").value = donation.date;
  editingDonationIndex = index;
}

function deleteDonation(index) {
  if (confirm("Are you sure you want to delete this donation entry?")) {
    currentUser.donations.splice(index, 1);
    loadDonationTable();
    updateTotalRaised();
    updateRewards();
  }
}

function updateRewards() {
  const amount = currentUser.totalRaised;
  const rewards = document.querySelectorAll(".reward-item");

  // Reset all rewards to locked state first
  rewards.forEach((reward, index) => {
    reward.classList.remove("reward-unlocked");
    reward.classList.add("reward-locked");
    const statusSpan = reward.querySelector("span:last-child");
    if (statusSpan) {
      statusSpan.innerHTML = '<span style="color: #666;">Locked</span>';
    }
  });

  // Welcome Badge - Always unlocked for registered users
  if (rewards[0]) {
    rewards[0].classList.remove("reward-locked");
    rewards[0].classList.add("reward-unlocked");
    const statusSpan = rewards[0].querySelector("span:last-child");
    if (statusSpan) {
      statusSpan.innerHTML = '<span style="color: var(--secondary-color);">✓ Unlocked</span>';
    }
  }

  // ₹500 Milestone Badge
  if (amount >= 500 && rewards[1]) {
    rewards[1].classList.remove("reward-locked");
    rewards[1].classList.add("reward-unlocked");
    const statusSpan = rewards[1].querySelector("span:last-child");
    if (statusSpan) {
      statusSpan.innerHTML = '<span style="color: var(--secondary-color);">✓ Unlocked</span>';
    }
  }

  // Top 10 Fundraiser Badge - Check leaderboard position
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.sort((a, b) => (b.totalRaised || 0) - (a.totalRaised || 0));
  const currentUserIndex = users.findIndex((u) => u.id === currentUser?.id);
  
  if (currentUserIndex !== -1 && currentUserIndex < 10 && rewards[2]) {
    rewards[2].classList.remove("reward-locked");
    rewards[2].classList.add("reward-unlocked");
    const statusSpan = rewards[2].querySelector("span:last-child");
    if (statusSpan) {
      statusSpan.innerHTML = '<span style="color: var(--secondary-color);">✓ Unlocked</span>';
    }
  }

  // ₹1000 Champion Badge
  if (amount >= 1000 && rewards[3]) {
    rewards[3].classList.remove("reward-locked");
    rewards[3].classList.add("reward-unlocked");
    const statusSpan = rewards[3].querySelector("span:last-child");
    if (statusSpan) {
      statusSpan.innerHTML = '<span style="color: var(--secondary-color);">✓ Unlocked</span>';
    }
  }
}

function loadLeaderboard() {
  // Ensure current user data is up to date in localStorage before loading leaderboard
  if (currentUser) {
    updateTotalRaised();
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const leaderboardBody = document.getElementById("leaderboardBody");

  if (users.length === 0) {
    leaderboardBody.innerHTML = `
            <tr>
              <td colspan="4" style="text-align: center; padding: 20px;">
                No users found. Be the first to sign up!
              </td>
            </tr>
          `;
    return;
  }

  // Sort users by total raised amount in descending order
  users.sort((a, b) => (b.totalRaised || 0) - (a.totalRaised || 0));

  // Update rewards after loading leaderboard (for Top 10 badge)
  if (currentUser) {
    updateRewards();
  }

  leaderboardBody.innerHTML = users
    .map((user, index) => {
      const rankClass =
        index === 0
          ? "rank-1"
          : index === 1
          ? "rank-2"
          : index === 2
          ? "rank-3"
          : "rank-other";
      
      const totalRaised = user.totalRaised || 0;
      
      return `
              <tr ${
                user.id === currentUser?.id
                  ? 'style="background: #fef3c7;"'
                  : ""
              }>
                <td>
                  <span class="rank-badge ${rankClass}">${index + 1}</span>
                </td>
                <td>
                  ${user.name}
                  ${user.id === currentUser?.id ? "<strong>(You)</strong>" : ""}
                </td>
                <td>₹${totalRaised.toLocaleString()}</td>
                <td style="font-family: monospace;">${user.referralCode}</td>
              </tr>
            `;
    })
    .join("");
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  showPage("login");

  document.getElementById("loginForm").reset();
  document.getElementById("signupForm").reset();
}

document.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    loadDashboard();
    showPage("dashboard");
  }
});

function seedDemoData() {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  if (existingUsers.length === 0) {
    const demoUsers = [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice@demo.com",
        password: "demo123",
        referralCode: "alice3847",
        totalRaised: 1250,
        donations: [
          {
            id: "d1",
            amount: 750,
            details: "Organized charity bake sale at local community center",
            date: "2024-07-15",
            image: null,
          },
          {
            id: "d2",
            amount: 500,
            details: "Online crowdfunding campaign for education support",
            date: "2024-07-22",
            image: null,
          },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob@demo.com",
        password: "demo123",
        referralCode: "bob9283",
        totalRaised: 950,
        donations: [
          {
            id: "d3",
            amount: 950,
            details: "Car wash fundraiser in neighborhood",
            date: "2024-07-10",
            image: null,
          },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Carol Davis",
        email: "carol@demo.com",
        password: "demo123",
        referralCode: "carol5746",
        totalRaised: 1800,
        donations: [
          {
            id: "d4",
            amount: 1200,
            details: "Corporate sponsorship from local business",
            date: "2024-07-05",
            image: null,
          },
          {
            id: "d5",
            amount: 600,
            details: "Silent auction at school event",
            date: "2024-07-18",
            image: null,
          },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        name: "David Wilson",
        email: "david@demo.com",
        password: "demo123",
        referralCode: "david2947",
        totalRaised: 750,
        donations: [
          {
            id: "d6",
            amount: 750,
            details: "Social media fundraising campaign",
            date: "2024-07-12",
            image: null,
          },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: "5",
        name: "Emma Brown",
        email: "emma@demo.com",
        password: "demo123",
        referralCode: "emma8372",
        totalRaised: 1100,
        donations: [
          {
            id: "d7",
            amount: 650,
            details: "Garage sale proceeds donated to cause",
            date: "2024-07-08",
            image: null,
          },
          {
            id: "d8",
            amount: 450,
            details: "Birthday party donations instead of gifts",
            date: "2024-07-20",
            image: null,
          },
        ],
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("users", JSON.stringify(demoUsers));
  }
}

seedDemoData();