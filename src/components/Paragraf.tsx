import type React from "react";

interface ParagrafProps {
	children?: React.ReactNode;
	className?: string;
}

const Paragraf: React.FC<ParagrafProps> = ({ children, className }) => {
	return (
		<p
			className={`mb-2 text-slate-500 text-center font-normal text-lg md:text-xl ${className}`}
		>
			{children}
		</p>
	);
};

export default Paragraf;
