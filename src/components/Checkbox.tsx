import type React from "react";

type Props = {
	label: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	id?: string;
	dataTestid?: string;
};

const Checkbox = ({
	label,
	checked,
	onChange,
	className,
	id,
	dataTestid,
}: Props) => {
	return (
		<label
			htmlFor={id}
			className="flex items-center cursor-pointer select-none text-slate-800 text-sm"
		>
			<div className="relative">
				<input
					type="checkbox"
					id={id}
					data-testid={dataTestid}
					checked={checked}
					className="sr-only"
					onChange={onChange}
				/>
				<div className="flex items-center justify-center w-5 h-5 mr-2 md:mr-4 border border-stroke border-slate-300 shadow-sm rounded box bg-white">
					<span
						className={`${checked ? "bg-[--action-blue]" : ""} dot h-[10px] w-[10px] rounded-sm`}
					/>
				</div>
			</div>
			{label}
		</label>
	);
};

export default Checkbox;
