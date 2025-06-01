interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: "outline" | "solid";
	size?: "icon" | "normal";
	className?: string;
	disabled?: boolean;
	type: "submit" | "reset" | "button";
}

const Button = ({
	children,
	onClick,
	variant = "solid",
	size = "normal",
	className = "",
	disabled,
	type,
}: ButtonProps) => {
	const baseStyles =
		"rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out";
	const variantStyles =
		variant === "outline"
			? "border border-gray-300 text-gray-700"
			: "bg-[--action-blue] hover:bg-[--action-blue-hover] text-white";
	const sizeStyles = size === "icon" ? "p-2" : "px-4 py-2";

	return (
		<button
			type={type}
			onClick={onClick}
			className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
