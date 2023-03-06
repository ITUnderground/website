<script>
	import CLI from '$lib/shell/cli';
	const cli = new CLI();

	let input = '';
	$: log = [...cli.log];
    $: cwd = cli.dir.cwd.replace('/home/itunderground', '~');

	function submit() {
		cli.run(input);
		input = '';
		log = [...cli.log];
        cwd = cli.dir.cwd.replace('/home/itunderground', '~');
	}

	/**
	 * @param e {KeyboardEvent & { currentTarget: EventTarget & Window; }}
	 */
	function onKeyDown(e) {
		// Add key to input
		if (e.key.length === 1 && !(e.ctrlKey || e.altKey || e.metaKey)) {
			input += e.key;
		}
		if (e.key === 'Backspace') {
			input = input.slice(0, -1);
		}
		// Submit on enter
		if (e.key === 'Enter') {
			submit();
		}

        // Modifiers
        // CTRL+V
        if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
            navigator.clipboard.readText().then(text => {
                input += text;
            });
        }
        // CTRL+backspace delete word
        if (e.ctrlKey && e.key === 'Backspace') {
            e.preventDefault();
            input = input.replace(/\s*\S+$/, '');
        }
	}
</script>

<div class="text-lg leading-5">
	{#each log as line}
		<span class="text-green-500">{line.user}@{line.server}</span>:<span class="text-purple-500"
			>{line.cwd}</span
		>$ <span>{line.command}</span>
		{#if line.output.length}
			<br />
			<span class="whitespace-pre-wrap">
				{@html line.output}
			</span>
		{/if}
		<br />
	{/each}
	<span class="text-green-500">{CLI.commands.whoami()}@{CLI.commands.hostname()}</span>:<span
		class="text-purple-500">{cwd}</span
	>$ <span>{input}</span><span class="cursor" />
</div>
<svelte:window on:keydown={onKeyDown} />

<style>
	/* monospace */
	* {
		font-family: monospace;
	}

	:global(body) {
		--purple: #dba9ff66;
	}
	.cursor {
		@apply inline-block h-[1.2rem] w-[0.6rem];
		@apply align-text-bottom;
        @apply bg-purple-500;
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
