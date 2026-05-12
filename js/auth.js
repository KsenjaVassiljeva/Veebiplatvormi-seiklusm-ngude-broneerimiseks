document.addEventListener("DOMContentLoaded", async () => {
  const authContainer = document.querySelector(".auth-container");
  
  if (authContainer) {
    const loginBtn = authContainer.querySelector(".login-small");
    const userMenuContainer = authContainer.querySelector(".user-menu-container");
    const userIcon = authContainer.querySelector(".user-icon");
    const userDropdown = authContainer.querySelector(".user-dropdown");
    const profileLink = authContainer.querySelector(".profile-link");
    const logoutLink = authContainer.querySelector(".logout-link");

    try {
      if (apiClient.isAuthenticated()) {
        const userInfo = await apiClient.getCurrentUser();
        
        // Скрываем кнопку входа и показываем иконку пользователя
        loginBtn.style.display = "none";
        userMenuContainer.style.display = "block";

        // Функция для переключения выпадающего меню
        userIcon.addEventListener("click", (e) => {
          e.stopPropagation();
          userDropdown.classList.toggle("active");
        });

        // Закрытие меню при клике вне его
        document.addEventListener("click", (e) => {
          if (!authContainer.contains(e.target)) {
            userDropdown.classList.remove("active");
          }
        });

        // Обработчик для ссылки профиля
        profileLink.addEventListener("click", (e) => {
          e.preventDefault();
          // Можно добавить скоро профиль пользователя
          alert("Профиль: " + userInfo.user.firstName + " " + userInfo.user.lastName);
        });

        // Обработчик для выхода
        logoutLink.addEventListener("click", (e) => {
          e.preventDefault();
          apiClient.removeToken();
          localStorage.removeItem('authToken');
          window.location.href = 'index.html';
        });
      } else {
        loginBtn.style.display = "block";
        userMenuContainer.style.display = "none";
      }
    } catch (error) {
      console.log('User not authenticated');
      loginBtn.style.display = "block";
      userMenuContainer.style.display = "none";
    }
  }
});
