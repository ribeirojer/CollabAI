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
					<Link href="/" className="flex items-center gap-2 font-bold text-xl">
						<RobotIcon weight="duotone" size={32} />
						CollabAI
					</Link>

					<nav className="flex gap-4 md:gap-6">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`flex items-center font-bold gap-2 pointer ${pathname === link.href ? "default" : "ghost"}`}
							>
								<link.icon className="size-8" weight="duotone" size={32} />
								<span className="hidden md:block">{link.label}</span>
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
