document.addEventListener("DOMContentLoaded", async () => {
  const loginBtn = document.querySelector(".login-small");
  const userIcon = document.querySelector(".user-icon");
  
  if (loginBtn || userIcon) {
    try {
      if (apiClient.isAuthenticated()) {
        const userInfo = await apiClient.getCurrentUser();
        
        if (loginBtn) loginBtn.style.display = "none";
        if (userIcon) userIcon.style.display = "inline-flex";
        
        // Обработчик для выхода при клике на иконку
        if (userIcon) {
          userIcon.addEventListener("click", (e) => {
            e.preventDefault();
            apiClient.removeToken();
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
          });
        }
      } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (userIcon) userIcon.style.display = "none";
      }
    } catch (error) {
      console.log('User not authenticated');
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (userIcon) userIcon.style.display = "none";
    }
  }
});
