import type React from "react";

interface ParagrafProps {
	children?: React.ReactNode;
}

const Paragraf: React.FC<ParagrafProps> = ({ children }) => {
	return (
		<p className="mb-2 text-slate-500 text-center font-normal text-lg md:text-xl">
			{children}
		</p>
	);
};

export default Paragraf;
