import { useLanguage } from '../LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer py-[34px]">
      <div className="container footer-inner w-full max-w-[1180px] mx-auto px-6 flex flex-wrap gap-4 items-center justify-between text-[0.85rem]">
        <p>© <span id="year">{new Date().getFullYear()}</span> Roshan Ashraf Ahmed. {t.footer.copy}</p>
        <div className="footer-socials flex gap-5">
          <a href="https://github.com/roshanashrafahmed" target="_blank" rel="noopener">GitHub</a>
          <a href="https://linkedin.com/in/roshanfullstack" target="_blank" rel="noopener">LinkedIn</a>
          <a href="mailto:roshankurshankmb@gmail.com">Email</a>
          <a href="https://instagram.com/roshanashrafahmed" target="_blank" rel="noopener">Instagram</a>
          <a href="https://facebook.com/roshanashrafahmed" target="_blank" rel="noopener">Facebook</a>
          <a href="https://twitter.com/roshanashrafahmed" target="_blank" rel="noopener">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
