
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("#navbarNav");
  const sidebar = document.querySelector(".wrapper .sidebar");

  if (!navbar || !sidebar) return;

  // When the Bootstrap navbar opens
  navbar.addEventListener("show.bs.collapse", () => {
    sidebar.classList.add("active"); // instantly slide in
  });

  // When the Bootstrap navbar closes
  navbar.addEventListener("hide.bs.collapse", () => {
    // Delay before removing 'active' so it slides out smoothly
    setTimeout(() => {
      sidebar.classList.remove("active");
    }, 50); // small delay to let navbar start collapsing
  });
});
