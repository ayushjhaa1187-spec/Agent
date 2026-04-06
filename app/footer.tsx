export function Footer() {
  return (
    <footer className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground border-t border-border bg-card/50">
      <span>&copy; 2026 Ayush Kumar Jha</span>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/ayushjhaa1187-spec/stocksense-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Powered by Vercel
        </a>
      </div>
    </footer>
  )
}
