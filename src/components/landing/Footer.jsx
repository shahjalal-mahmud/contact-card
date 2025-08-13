export default function Footer(){
    return(
        <footer className="footer p-10 bg-neutral text-neutral-content" id="footer">
        <aside>
          <p>
            © {new Date().getFullYear()} MyBrand — Digital Portfolio Service
          </p>
        </aside>
        <nav>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
        </nav>
      </footer>
    )
}