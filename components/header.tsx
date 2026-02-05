import { Paintbrush } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Paintbrush className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight text-foreground">
            Paint Estimate Master
          </h1>
          <p className="text-xs text-muted-foreground">
            Professional painting estimates made simple
          </p>
        </div>
      </div>
    </header>
  )
}
