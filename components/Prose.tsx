export function Prose({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`space-y-4 leading-8 text-ink/90 ${className}`}>
      {text
        .trim()
        .split(/\n\n+/)
        .map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
    </div>
  );
}
