import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartSuccessAlert() {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false);
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	if (!show) return null;

	return (
		<div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-full max-w-md bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg shadow-lg animate-slide-down">
			<div className="flex items-start">
				<div className="flex-shrink-0">
					<svg
						className="h-6 w-6 text-green-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M10 18.333A8.333 8.333 0 1 0 10 1.667a8.333 8.333 0 0 0 0 16.666ZM8.333 13.333l-3.333-3.333 1.175-1.175L8.333 11l5.492-5.492 1.175 1.175L8.333 13.333Z"
							clipRule="evenodd"
						/>
						<title>Produto adicionado com sucesso</title>
					</svg>
				</div>
				<div className="ml-3 flex-1">
					<p className="font-bold">Produto adicionado ao carrinho!</p>
					<p className="text-sm">
						Você pode continuar comprando ou ir para o carrinho.
					</p>
				</div>
				<button
					onClick={() => setShow(false)}
					className="ml-4 text-green-700 hover:text-green-900"
					aria-label="Fechar alerta"
					title="Fechar alerta"
					type="button"
				>
					✖
				</button>
			</div>
			<Link
				href={"carrinho"}
				className="text-sm underline ml-4 py-8 m-8  text-green-700 hover:text-green-900"
			>
				Ir para o carrinho
			</Link>
		</div>
	);
}
