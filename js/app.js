// ===== NAV & FOOTER INJECTION =====
const navHTML = `
<nav>
  <div class="logo">
    <img src="https://flagcdn.com/gh.svg" alt="Akuapeman Logo">
    <span>Akuapeman</span>
  </div>
  <ul class="nav-links" id="navLinks">
    <li><a href="index.html">Home</a></li>
    <li><a href="history.html">History</a></li>
    <li><a href="towns.html">Towns</a></li>
    <li><a href="connect.html">Connect</a></li>
    <li><a href="news.html">News</a></li>
    <li><a href="about.html">About Us</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <div class="nav-auth" id="navAuth"></div>
  <div class="hamburger" onclick="toggleNav()">
    <span></span><span></span><span></span>
  </div>
</nav>`;

const footerHTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-col">
      <h4>Akuapeman.com</h4>
      <p>Your gateway to the Akuapem community — culture, history, business, and connection.</p>
    </div>
    <div class="footer-col">
      <h4>Quick Links</h4>
      <a href="index.html">Home</a>
      <a href="history.html">History</a>
      <a href="towns.html">Towns</a>
      <a href="news.html">News</a>
    </div>
    <div class="footer-col">
      <h4>Connect</h4>
      <a href="connect.html#chat">Chat</a>
      <a href="connect.html#restaurants">Restaurants</a>
      <a href="connect.html#stores">Stores</a>
      <a href="connect.html#music">Music</a>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <a href="mailto:info@akuapeman.com">info@akuapeman.com</a>
      <a href="contact.html">Send a Message</a>
      <a href="about.html">About Us</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Akuapeman.com — Built with pride for the Akuapem community 🇬🇭</p>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';

  // Don't inject nav/footer on pages with their own app-style navigation
  if (page !== 'chat.html' && page !== 'town-detail.html') {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Mark active nav link
    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });

    // Render auth area
    renderNavAuth();
  }
});

function renderNavAuth() {
  const authEl = document.getElementById('navAuth');
  if (!authEl) return;
  const session = JSON.parse(localStorage.getItem('akm_session') || 'null');
  if (session) {
    const initials = session.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    authEl.innerHTML = `
      <div class="nav-user-btn" onclick="toggleNavDropdown()">
        <div class="nav-avatar">${initials}</div>
        <span class="nav-username">${session.name.split(' ')[0]}</span>
        <span style="font-size:0.65rem;opacity:0.7">▼</span>
        <div class="nav-dropdown" id="navDropdown">
          <a href="index.html">🏠 Home</a>
          <a href="store-dashboard.html">🛒 My Store</a>
          <hr>
          <a href="#" onclick="navLogout()">↩ Sign Out</a>
        </div>
      </div>`;
  } else {
    authEl.innerHTML = `<a href="login.html" class="nav-login-btn">Sign In</a>`;
  }
}

function toggleNavDropdown() {
  document.getElementById('navDropdown').classList.toggle('open');
}

function navLogout() {
  localStorage.removeItem('akm_session');
  localStorage.removeItem('akm_community_user');
  window.location.href = 'login.html';
}

document.addEventListener('click', e => {
  const dd = document.getElementById('navDropdown');
  if (dd && !e.target.closest('.nav-user-btn')) dd.classList.remove('open');
});

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== TABS =====
function initTabs(tabBtnClass, tabContentClass) {
  const btns = document.querySelectorAll('.' + tabBtnClass);
  const contents = document.querySelectorAll('.' + tabContentClass);
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
  if (btns.length) btns[0].click();
}
