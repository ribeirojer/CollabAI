import type React from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error: string;
	success?: boolean;
	inputRef?: React.Ref<HTMLInputElement>;
}

const Input = ({
	label,
	placeholder,
	className,
	disabled,
	error,
	id,
	inputRef,
	maxLength,
	name,
	onChange,
	required,
	size,
	type,
	value,
	success,
	...rest
}: InputProps) => {
	const inputClassName = `w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[--action-blue]" ${
		error ? "border-red-500" : ""
	} ${success ? "border-green-500" : ""} ${className}
		${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`;

	return (
		<div className="flex flex-col items-start">
			{label && (
				<label
					htmlFor={id}
					className="ml-1 mb-1 block text-sm md:text-base font-medium text-gray-800"
				>
					{label}
				</label>
			)}
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder || ""}
				className={inputClassName}
				disabled={disabled}
				maxLength={maxLength}
				size={size}
				required={required}
				ref={inputRef}
				{...rest}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Input;
