import './navbar.css'

function Navbar() {
  
    return (
      <>
        <nav class="logo">
        <div className="left">
            <img src="url_de_votre_image" alt="Logo" />
        </div>
        <div className="links">
            <a href="/">Accueil</a>
            <a href="/services">Services</a>
            <a href="/about">À propos</a>           
      </div>
        <button>Se connecter</button>
        </nav>

      </>
    )
  }
  
  export default Navbar