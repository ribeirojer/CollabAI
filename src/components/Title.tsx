import type React from "react";

interface TitleProps {
	children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
	return (
		<h1 className="mb-2 text-center font-extrabold text-3xl md:text-4xl">
			{children}
		</h1>
	);
};

export default Title;
