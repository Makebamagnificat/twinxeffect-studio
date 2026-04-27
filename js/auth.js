let isClientMode = true;
let isLoginMode = true;

// Mock database (saved in browser)
let users = JSON.parse(localStorage.getItem('twinxUsers')) || [
  { email: "admin@twinx.com", password: "admin123", role: "admin", name: "Admin" }
];

function switchRole(n) {
  isClientMode = n === 0;
  document.getElementById('clientBtn').classList.toggle('active', isClientMode);
  document.getElementById('adminBtn').classList.toggle('active', !isClientMode);
  updateButtonText();
}

function toggleMode() {
  isLoginMode = !isLoginMode;
  const nameField = document.getElementById('nameField');
  nameField.classList.toggle('hidden', isLoginMode || !isClientMode);
  updateButtonText();
}

function updateButtonText() {
  let text = '';
  if (isLoginMode) {
    text = isClientMode ? 'Sign In as Client' : 'Sign In as Admin';
  } else {
    text = isClientMode ? 'Create Client Account' : 'Create Admin Account';
  }
  document.getElementById('btnText').textContent = text;
  document.getElementById('modeText').textContent = isLoginMode ? "Don't have an account?" : "Already have an account?";
  document.getElementById('modeLink').textContent = isLoginMode ? 'Create one' : 'Sign In';
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const fullName = document.getElementById('fullName').value.trim();

  if (!email || !password) {
    alert("Please fill email and password");
    return;
  }

  if (isLoginMode) {
    // LOGIN
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
    } else {
      alert("Wrong email or password. Try again!");
    }
  } else {
    // SIGN UP
    if (!isClientMode) {
      alert("Only clients can create accounts. Admin is default.");
      return;
    }
    if (users.find(u => u.email === email)) {
      alert("This email already exists. Please sign in.");
      return;
    }
    const newUser = { email, password, role: 'user', name: fullName || email.split('@')[0] };
    users.push(newUser);
    localStorage.setItem('twinxUsers', JSON.stringify(users));

    alert("✅ Account created successfully! You can now log in.");
    isLoginMode = true;
    toggleMode();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('clientBtn').classList.add('active');
});