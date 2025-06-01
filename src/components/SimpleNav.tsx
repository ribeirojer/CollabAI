import Link from "next/link"
import { usePathname } from "next/navigation"
import { HouseIcon, FileSearchIcon, PlusIcon, UserIcon } from "@phosphor-icons/react"

export function SimpleNav() {
  const pathname = usePathname()

  const links = [
    { href: "/", icon: HouseIcon, label: "Início" },
    { href: "/explorar", icon: FileSearchIcon, label: "Explorar" },
    { href: "/criar", icon: PlusIcon, label: "Criar" },
    { href: "/perfil", icon: UserIcon, label: "Perfil" },
  ]

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl">CollabAI</div>

          <div className="flex gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <button className={`gap-2 ${pathname === link.href ? "default" : "ghost"}`} aria-label={link.label}>
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
