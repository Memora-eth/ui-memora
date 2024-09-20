const toggleMobileMenu = (isActive: boolean) => {
  const header = document.querySelector(".js-page-header");
  const body = document.body;
  const mobileMenu = document.querySelector(".js-mobile-menu");

  if (header && mobileMenu) {
    if (isActive) {
      body.classList.add("nav-open-noscroll");
      header.classList.add("h-full");
      mobileMenu.classList.add("nav-menu--is-open");
    } else {
      body.classList.remove("nav-open-noscroll");
      header.classList.remove("h-full");
      mobileMenu.classList.remove("nav-menu--is-open");
    }
  }
};

const setupMobileMenuListeners = () => {
  const mobileMenuActiveButton = document.querySelector(".js-mobile-toggle");
  const mobileMenuInActiveButton = document.querySelector(".js-mobile-close");

  mobileMenuActiveButton?.addEventListener("click", () => toggleMobileMenu(true));
  mobileMenuInActiveButton?.addEventListener("click", () => toggleMobileMenu(false));

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const mobileMenu = document.querySelector(".js-mobile-menu");
    const mobileMenuActiveButton = document.querySelector(".js-mobile-toggle");
    const target = event.target as Node;

    if (mobileMenu && !mobileMenu.contains(target) && !mobileMenuActiveButton?.contains(target)) {
      toggleMobileMenu(false);
    }
  });
};

export const removeMenuActive = () => {
  toggleMobileMenu(false);
};

export const addMobileMenuToggle = () => {
  if (typeof window !== 'undefined') {
    removeMenuActive();
    setupMobileMenuListeners();
  }
};