// components/Footer.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import LogoText from "../assets/LogoText.png";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white shadow-[0_12px_40px_rgba(2,6,23,0.35)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-2 md:flex-row">
        <div className="flex flex-1 justify-start">
          <Link
            to="/"
            alt="Accueil"
            className="flex items-center gap-2 text-white"
          >
            <img src={LogoText} alt="Accueil" className="h-10 w-auto" />
            <span className="hidden text-sm font-semibold tracking-[0.2em] text-slate-200 sm:inline">
              © {year}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <a
            className="rounded-full p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            href="#"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
          </a>
          <a
            className="rounded-full p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            href="#"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
          </a>
          <a
            className="rounded-full p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            href="#"
            aria-label="X"
          >
            <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" />
          </a>
          <a
            className="rounded-full p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            href="#"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
          </a>
          <a
            className="rounded-full p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            href="#"
            aria-label="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
