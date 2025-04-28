// Variables globales
let currentUser = null

// Verificar estado de autenticación al cargar la página
function checkAuthStatus() {
  // Obtener usuario de localStorage
  const storedUser = localStorage.getItem("currentUser")

  if (storedUser) {
    currentUser = JSON.parse(storedUser)
    updateUIForLoggedInUser()
  } else {
    disableRestrictedFeatures()
  }
}

// Función para actualizar la UI cuando el usuario está logueado
function updateUIForLoggedInUser() {
  // Actualizar botón de login por perfil
  const loginBtn = document.querySelector(".login-btn")
  if (loginBtn) {
    loginBtn.innerHTML = `<i class="fas fa-user"></i>`
    loginBtn.classList.add("profile-btn")
    loginBtn.classList.remove("login-btn")
    loginBtn.href = "javascript:void(0)"
    loginBtn.removeEventListener("click", showProfileSidebar)
    loginBtn.addEventListener("click", showProfileSidebar)
  }

  // Habilitar funcionalidades restringidas
  enableRestrictedFeatures()

  // Crear sidebar de perfil si no existe
  createProfileSidebar()
}

// Función para crear el sidebar de perfil
function createProfileSidebar() {
  // Verificar si ya existe
  if (document.getElementById("profile-sidebar")) return

  // Crear el sidebar
  const sidebar = document.createElement("div")
  sidebar.id = "profile-sidebar"
  sidebar.className = "profile-sidebar"

  sidebar.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="profile-info">
                <h3>${currentUser.name}</h3>
                <p>${currentUser.email}</p>
            </div>
            <button class="close-sidebar"><i class="fas fa-times"></i></button>
        </div>
        <div class="profile-menu">
            <a href="#"><i class="fas fa-user"></i> Mi Perfil</a>
            <a href="#"><i class="fas fa-shopping-bag"></i> Mis Pedidos</a>
            <a href="#"><i class="fas fa-heart"></i> Mis Favoritos</a>
            <a href="#"><i class="fas fa-cog"></i> Configuración</a>
            <a href="javascript:void(0)" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>
        </div>
    `

  document.body.appendChild(sidebar)

  // Agregar eventos
  document.querySelector(".close-sidebar").addEventListener("click", hideProfileSidebar)
  document.getElementById("logout-btn").addEventListener("click", logout)

  // Crear overlay
  const overlay = document.createElement("div")
  overlay.id = "sidebar-overlay"
  overlay.className = "sidebar-overlay"
  overlay.addEventListener("click", hideProfileSidebar)
  document.body.appendChild(overlay)
}

// Función para mostrar el sidebar de perfil
function showProfileSidebar() {
  const sidebar = document.getElementById("profile-sidebar")
  const overlay = document.getElementById("sidebar-overlay")

  if (sidebar && overlay) {
    sidebar.classList.add("active")
    overlay.classList.add("active")
  }
}

// Función para ocultar el sidebar de perfil
function hideProfileSidebar() {
  const sidebar = document.getElementById("profile-sidebar")
  const overlay = document.getElementById("sidebar-overlay")

  if (sidebar && overlay) {
    sidebar.classList.remove("active")
    overlay.classList.remove("active")
  }
}

// Función para cerrar sesión
function logout() {
  localStorage.removeItem("currentUser")
  currentUser = null

  // Restaurar botón de login
  const profileBtn = document.querySelector(".profile-btn")
  if (profileBtn) {
    profileBtn.innerHTML = "Iniciar sesión"
    profileBtn.classList.remove("profile-btn")
    profileBtn.classList.add("login-btn")
    profileBtn.href = "InicioSesion.html"
    profileBtn.removeEventListener("click", showProfileSidebar)
  }

  // Ocultar sidebar
  hideProfileSidebar()

  // Deshabilitar funcionalidades restringidas
  disableRestrictedFeatures()

  // Redirigir a inicio
  window.location.href = window.location.pathname.includes("index.html") ? "index.html" : "../index.html"
}

// Función para deshabilitar funcionalidades restringidas
function disableRestrictedFeatures() {
  // Deshabilitar botón de carrito
  const cartBtn = document.querySelector(".icon .fa-shopping-cart")
  if (cartBtn) {
    const cartLink = cartBtn.closest("a")
    cartLink.classList.add("tooltip")
    cartLink.href = "javascript:void(0)"
    cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i><span class="tooltiptext">/span>`
    cartLink.removeEventListener("click", promptLogin)
    cartLink.addEventListener("click", redirectToLogin)
  }

  // Deshabilitar botón de favoritos
  const wishlistBtn = document.querySelector(".icon .fa-heart")
  if (wishlistBtn) {
    const wishlistLink = wishlistBtn.closest("a")
    wishlistLink.classList.add("tooltip")
    wishlistLink.href = "javascript:void(0)"
    wishlistLink.innerHTML = `<i class="fas fa-heart"></i><span class="tooltiptext"></span>`
    wishlistLink.removeEventListener("click", promptLogin)
    wishlistLink.addEventListener("click", redirectToLogin)
  }

  // Deshabilitar botón de búsqueda
  const searchBtn = document.querySelector(".icon .fa-search")
  if (searchBtn) {
    const searchLink = searchBtn.closest("a")
    searchLink.classList.add("tooltip")
    searchLink.href = "javascript:void(0)"
    searchLink.innerHTML = `<i class="fas fa-search"></i><span class="tooltiptext"></span>`
    searchLink.removeEventListener("click", promptLogin)
    searchLink.addEventListener("click", redirectToLogin)
  }

  // Deshabilitar botones de añadir al carrito en la página de catálogo
  const addToCartBtns = document.querySelectorAll(".add-to-cart")
  addToCartBtns.forEach((btn) => {
    btn.classList.add("tooltip", "disabled-btn")
    btn.innerHTML = `<i class="fas fa-shopping-cart"></i><span class="tooltiptext"></span>`
    btn.removeEventListener("click", promptLogin)
    addToCartBtns.forEach((btn) => btn.removeEventListener("click", promptLogin))
    btn.addEventListener("click", redirectToLogin)
  })

  // Deshabilitar botones de favoritos en la página de catálogo
  const wishlistBtns = document.querySelectorAll(".wishlist-btn")
  wishlistBtns.forEach((btn) => {
    btn.classList.add("tooltip", "disabled-btn")
    btn.innerHTML = `<i class="far fa-heart"></i><span class="tooltiptext"></span>`
    wishlistBtns.forEach((btn) => btn.removeEventListener("click", promptLogin))
    btn.addEventListener("click", redirectToLogin)
  })
}

// Función para habilitar funcionalidades restringidas
function enableRestrictedFeatures() {
  // Habilitar botón de carrito
  const cartBtn = document.querySelector(".icon .fa-shopping-cart")
  if (cartBtn) {
    const cartLink = cartBtn.closest("a")
    cartLink.classList.remove("tooltip", "disabled-btn")
    cartLink.href = "#" // En un caso real, aquí iría la URL del carrito
    cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i>`
    // Eliminar el evento que redirige al login
    cartLink.removeEventListener("click", redirectToLogin)
  }

  // Habilitar botón de favoritos
  const wishlistBtn = document.querySelector(".icon .fa-heart")
  if (wishlistBtn) {
    const wishlistLink = wishlistBtn.closest("a")
    wishlistLink.classList.remove("tooltip", "disabled-btn")
    wishlistLink.href = "#" // En un caso real, aquí iría la URL de favoritos
    wishlistLink.innerHTML = `<i class="fas fa-heart"></i>`
    // Eliminar el evento que redirige al login
    wishlistLink.removeEventListener("click", redirectToLogin)
  }

  // Habilitar botón de búsqueda
  const searchBtn = document.querySelector(".icon .fa-search")
  if (searchBtn) {
    const searchLink = searchBtn.closest("a")
    searchLink.classList.remove("tooltip", "disabled-btn")
    searchLink.href = "#" // En un caso real, aquí iría la URL de búsqueda
    searchLink.innerHTML = `<i class="fas fa-search"></i>`
    // Eliminar el evento que redirige al login
    searchLink.removeEventListener("click", redirectToLogin)
  }

  // Habilitar botones de añadir al carrito en la página de catálogo
  const addToCartBtns = document.querySelectorAll(".add-to-cart")
  addToCartBtns.forEach((btn) => {
    btn.classList.remove("tooltip", "disabled-btn")
    btn.innerHTML = `<i class="fas fa-shopping-cart"></i>`
    btn.removeEventListener("click", redirectToLogin)
  })

  // Habilitar botones de favoritos en la página de catálogo
  const wishlistBtns = document.querySelectorAll(".wishlist-btn")
  wishlistBtns.forEach((btn) => {
    btn.classList.remove("tooltip", "disabled-btn")
    wishlistBtns.forEach((btn) => btn.removeEventListener("click", redirectToLogin))
    btn.innerHTML = `<i class="far fa-heart"></i>`
    btn.removeEventListener("click", redirectToLogin)
  })
}

// Función para redirigir directamente al login sin confirmación
function redirectToLogin(e) {
  e.preventDefault()

  // Determinar la ruta correcta según la ubicación actual
  const isInSubfolder = window.location.pathname.includes("/Html/")
  const loginPath = isInSubfolder ? "InicioSesion.html" : "Html/InicioSesion.html"

  window.location.href = loginPath
}

// Función para mostrar mensajes
function showMessage(container, message, type) {
  container.textContent = message
  container.className = `message-container message-${type}`
  container.style.display = "block"
}

// Función para guardar un usuario
function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) || []
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))
}

// Función para generar un ID único
function generateUserId() {
  return "user_" + Math.random().toString(36).substr(2, 9)
}

function promptLogin(e) {
  e.preventDefault()
  alert(".")
}

// Inicializar la verificación de autenticación cuando se carga el script
checkAuthStatus()
