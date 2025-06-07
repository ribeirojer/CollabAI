import type React from "react";

interface TitleProps {
	children?: React.ReactNode;
	className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
	return (
		<h1
			className={`mb-2 text-center font-extrabold text-3xl md:text-4xl ${className}`}
		>
			{children}
		</h1>
	);
};

export default Title;
