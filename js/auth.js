document.addEventListener("DOMContentLoaded", async () => {
  const loginLink = document.querySelector(".login-small, .login");
  
  if (loginLink) {
    try {
      if (apiClient.isAuthenticated()) {
        const userInfo = await apiClient.getCurrentUser();
        loginLink.textContent = `${userInfo.user.firstName} (Logout)`;
        loginLink.href = "#";
        
        loginLink.addEventListener("click", (e) => {
          e.preventDefault();
          apiClient.removeToken();
          localStorage.removeItem('authToken');
          alert('Logged out successfully');
          window.location.href = 'index.html';
        });
      } else {
        loginLink.textContent = loginLink.getAttribute('data-key') || 'Log in';
        loginLink.href = 'login.html';
      }
    } catch (error) {
      console.log('User not authenticated');
      loginLink.textContent = loginLink.getAttribute('data-key') || 'Log in';
      loginLink.href = 'login.html';
    }
  }
});
