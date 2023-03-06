<script>
	import '../app.css';
</script>

<slot />

<style>
	:global(body) {
		@apply bg-black text-[#c8c1b4];
	}
	.scrollbar-hide {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	/* https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ */
	.grow-wrap {
		/* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
		display: grid;
	}
	.grow-wrap::after {
		/* Note the weird space! Needed to preventy jumpy behavior */
		content: attr(data-replicated-value) ' ';

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	.grow-wrap > textarea {
		/* You could leave this, but after a user resizes, then it ruins the auto sizing */
		resize: none;

		/* Firefox shows scrollbar on growth, you can hide like this. */
		overflow: hidden;
	}
	.grow-wrap > textarea,
	.grow-wrap::after {
		@apply bg-transparent text-[#c8c1b4] outline-none;
		@apply max-w-full;
		font: inherit;

		overflow-wrap: break-word;
		word-wrap: break-word;

		-ms-word-break: break-all;
		/* This is the dangerous one in WebKit, as it breaks things wherever */
		word-break: break-all;
		/* Instead use this non-standard one: */
		word-break: break-word;

		/* Adds a hyphen where the word breaks, if supported (No Blink) */
		-ms-hyphens: auto;
		-moz-hyphens: auto;
		-webkit-hyphens: auto;
		hyphens: auto;

		grid-area: 1 / 1 / 2 / 2;
	}
	/* End of borrowed code */

	body {
		margin: 2rem;
		font: 1rem/1.4 system-ui, sans-serif;
	}

	label {
		display: block;
	}

	.command .output {
		@apply text-[#8a857c];
	}
	.directory {
		@apply text-[#d65ba6];
	}
	.user {
		@apply text-green-500;
	}
	.console {
		@apply font-mono;
		@apply leading-6;
	}

	:global(body) {
		--purple: #dba9ff66;
	}
	.cursor {
		@apply absolute inline-block h-[1.2rem] w-[0.6rem];
		@apply top-0.5;
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0% {
			background: transparent;
		}
		29% {
			background: transparent;
		}
		30% {
			background: var(--purple);
		}
		80% {
			background: var(--purple);
		}
		81% {
			background: transparent;
		}
		100% {
			background: transparent;
		}
	}
</style>
