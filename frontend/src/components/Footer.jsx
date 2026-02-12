// components/Footer.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
        <p className="text-sm tracking-wide">
          © {year} Your Company, Inc. All rights reserved.
        </p>
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
