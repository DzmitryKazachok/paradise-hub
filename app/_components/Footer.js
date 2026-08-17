function Footer() {
  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    currentYear === startYear
      ? String(startYear)
      : `${startYear}-${currentYear}`;

  return (
    <footer className="mt-auto border-t border-primary-900">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-8 py-5 text-center">
        <p className="text-sm text-primary-200">
          © {copyrightYear} The Paradise Hub. Contact us:{" "}
          <a
            href="mailto:the-paradise-hub@kazachok.dev"
            className="text-accent-400 underline transition-colors hover:text-accent-600"
          >
            the-paradise-hub@kazachok.dev
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
