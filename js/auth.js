document.addEventListener("DOMContentLoaded", async () => {
  const loginBtn = document.querySelector(".login-small");
  const userMenu = document.querySelector(".user-menu");
  const userIcon = document.querySelector(".user-icon");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const profileLink = document.querySelector(".profile-link");
  const logoutLink = document.querySelector(".logout-link");
  
  if (loginBtn || userMenu) {
    try {
      if (apiClient.isAuthenticated()) {
        const userInfo = await apiClient.getCurrentUser();
        
        if (loginBtn) loginBtn.style.display = "none";
        if (userMenu) userMenu.style.display = "block";

        // Переключение меню при клике на иконку
        if (userIcon) {
          userIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            if (dropdownMenu) {
              dropdownMenu.classList.toggle("active");
            }
          });
        }

        // Закрытие меню при клике вне его
        document.addEventListener("click", (e) => {
          if (userMenu && !userMenu.contains(e.target) && dropdownMenu) {
            dropdownMenu.classList.remove("active");
          }
        });

        // Обработчик для профиля
        if (profileLink) {
          profileLink.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Профиль: " + userInfo.user.firstName + " " + userInfo.user.lastName);
            if (dropdownMenu) dropdownMenu.classList.remove("active");
          });
        }

        // Обработчик для выхода
        if (logoutLink) {
          logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            apiClient.removeToken();
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
          });
        }
      } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (userMenu) userMenu.style.display = "none";
      }
    } catch (error) {
      console.log('User not authenticated');
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (userMenu) userMenu.style.display = "none";
    }
  }
});
