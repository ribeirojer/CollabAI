import type React from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error: string;
	success?: boolean;
	textareaRef?: React.Ref<HTMLTextAreaElement>;
}

const Textarea = ({
	label,
	placeholder,
	className,
	disabled,
	error,
	id,
	textareaRef,
	maxLength,
	name,
	onChange,
	required,
	rows,
	value,
	success,
	...rest
}: TextareaProps) => {
	const textareaClassName = `w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[--action-blue]" ${
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
			<textarea
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder || ""}
				className={textareaClassName}
				disabled={disabled}
				maxLength={maxLength}
				rows={rows}
				required={required}
				ref={textareaRef}
				{...rest}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Textarea;
