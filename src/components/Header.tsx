import { useUsername } from "@/hooks/useUsername";
import {
	ExclamationMarkIcon,
	PlusIcon,
	RobotIcon,
	UserIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
	const { username } = useUsername();
	const pathname = usePathname();

	const links = [
		{ href: "/criar", icon: PlusIcon, label: "Criar" },
		{ href: "/perfil", icon: UserIcon, label: username || "Perfil" },
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
						<Link
							href={"/criar"}
							className={`flex items-center font-bold gap-2 pointer ${pathname === "/criar" ? "text-purple-600" : "text-gray-700"} transition-colors hover:text-purple-600`}
							aria-label="Criar novo projeto"
							title="Criar novo projeto"
						>
							<PlusIcon className="size-8" weight="duotone" size={32} />
							<span className="hidden md:block">Criar</span>
						</Link>
						<Link
							href={"/perfil"}
							className={`flex items-center font-bold gap-2 pointer ${pathname === "/perfil" ? "text-purple-600" : "text-gray-700"} transition-colors hover:text-purple-600`}
							aria-label="Perfil"
							title="Ir para o perfil"
						>
							<div className="relative">
								{!username && (
									<ExclamationMarkIcon
										className="absolute -top-1 -right-1 text-red-500 size-4"
										weight="duotone"
										size={16}
									/>
								)}
								<UserIcon className="size-8" weight="duotone" size={32} />
							</div>
							<span className="hidden md:block">{username || "Perfil"}</span>
						</Link>
					</nav>
				</div>
			</header>
			<div className="h-16 md:h-20" />
		</>
	);
};

export default Header;
