import { type FormEvent, useCallback, useId, useRef } from "react";
import { SquishyButton } from "./components/SquishyButton";
import { SquishyInput } from "./components/SquishyInput";

export const WordForm = ({
	onSubmit,
}: {
	onSubmit: (word: string) => void;
}) => {
	const fieldId = useId();
	const fieldRef = useRef<HTMLInputElement>(null);

	const handleSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (fieldRef.current) {
			const word = fieldRef.current.value;
			onSubmit(word);
		}
	}, [onSubmit]);

	return (
		<form className="text-xl container width-s" onSubmit={handleSubmit}>
			<label htmlFor={fieldId}>Choose a word</label>
			<div className="field ">
				<SquishyInput
					id={fieldId}
					ref={fieldRef}
					type="text"
					name="word"
					placeholder="Apple"
					autoComplete="off"
				/>
			</div>
			<SquishyButton type="button">Sound it out</SquishyButton>
		</form>
	);
};
