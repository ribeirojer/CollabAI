import {
	MagnifyingGlassIcon,
	PlusIcon,
	RobotIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
	const pathname = usePathname();

	const links = [
		{ href: "/explorar", icon: MagnifyingGlassIcon, label: "Explorar" },
		{ href: "/criar", icon: PlusIcon, label: "Criar" },
	];

	return (
		<>
			<header className="fixed top-0 w-full bg-slate-50 shadow-sm z-50 flex flex-col px-4">
				<div className="container mx-auto py-4 flex items-center justify-between">
					<Link href="/">
						<div className="font-bold text-xl">
							<RobotIcon />
							CollabAI
						</div>
					</Link>

					<nav className="flex gap-1">
						{links.map((link) => (
							<Link key={link.href} href={link.href}>
								<button
									className={`gap-2 ${pathname === link.href ? "default" : "ghost"}`}
									aria-label={link.label}
								>
									<link.icon className="h-4 w-4" />
									{link.label}
								</button>
							</Link>
						))}
					</nav>
				</div>
			</header>
			<div className="h-16 md:h-20" />
		</>
	);
};

export default Header;
