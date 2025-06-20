import { useState } from "react";
import "./App.css";
import { splitGraphemes } from "./lib/splitGraphemes";
import { WordForm } from "./WordForm";
import { popUp, SplitReveal } from "./components/SplitReveal";

function App() {
	const [word, setWord] = useState("");
	const graphemes = splitGraphemes(word);

	return (
		<div>
			<h1>
				<SplitReveal>Sound It</SplitReveal>
			</h1>

			<div className="width-lg container text-center text-xxl height-l2">
				<SplitReveal staggerChildren={0.6} key={word} className="gap-s" variants={popUp}>
					{graphemes.map((g, i) => (
						<span
							key={`${g.grapheme}${i}`}
							className={`grapheme ${g.silent ? "silent" : ""}`}
						>
							{g.grapheme}
						</span>
					))}
				</SplitReveal>
			</div>

			<WordForm onSubmit={setWord} />
		</div>
	);
}

export default App;
