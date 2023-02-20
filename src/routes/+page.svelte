<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { fly, fade } from 'svelte/transition';
	import { interpolateRound } from 'd3-interpolate';
	import { quadIn } from 'svelte/easing';

	const spaces = 10;
	const intro = `ITUnderground v0.2 Mon Feb 20 22:00:06 CST 2023 SvelteKit

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the individual files
in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: ${Date().slice(0, 24)}Wed Oct 11 18:54:03 2017 from 73.84.85.110 `;
	const commands = [
		{
			command: 'whoami' + ' '.repeat(spaces),
			output: 'itunderground'
		},
		{
			command: 'ls /home/itunderground' + ' '.repeat(spaces),
			output: `/home/itunderground
├── who-are-we
├── next-events
├── im-a-beginner-help-me
└── im-ready-to-pwn`
		},
		{
			command: 'cat /home/itunderground/who-are-we' + ' '.repeat(spaces),
			output: `We are a group of people who are passionate about cybersecurity and want to share our knowledge with others.`
		}
		// {
		// 	command: 'cat /home/itunderground/next-events' + ' '.repeat(spaces),
		// 	output: `We are currently working on our next event.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-a-beginner-help-me' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// },
		// {
		// 	command: 'cat /home/itunderground/im-ready-to-pwn' + ' '.repeat(spaces),
		// 	output: `We have a discord server where you can ask questions and get help from our members.`
		// }
	];

	// Animate position of the console
	const duration = commands.reduce((acc, curr) => acc + curr.command.length * 70, 0);
	// const duration = 0;
	const index = tweened(0, { interpolate: interpolateRound, duration });
	const position = tweened(0, { interpolate: interpolateRound, easing: quadIn });

	$: current = $index >= 0 ? commands[$index] : null;
	$: animationDone = false;
    $: alreadyTyped = $index;

	$: if (current) {
		position.set(0, { duration: 0 });
		position.set(current.command.length, { delay: 1000, duration: current.command.length * 50 });
	}

	$: if (
		$position === commands[commands.length - 1].command.length &&
		$index === commands.length - 1
	) {
		animationDone = true;
        current = null;
        alreadyTyped += 1;
	}

	onMount(() => {
		$index = commands.length - 1;
	});

	// Command input field
	let commandInputEl: HTMLTextAreaElement;
	let commandInputValue = ' '.repeat('it@underground:~/$ '.length);
	$: if (commandInputEl) {
		commandInputEl.focus();
	}
	// Handle commands
    let userCommands: {
        command: string;
        output: string;
    }[] = [];
	function handleCommand(input: string) {
		const args = input.split(' ');
		const command = args.shift();

		switch (command) {
			case 'help': {
                addCommand('help',
                `Available commands:
help - Show this help message
whoami - Show information about the current user
ls - List files and directories
cat - Show the content of a file`)
				break;
			}
			default: {
                command ? 
                    addCommand(command, `Command not found.`) :
                    addCommand('', ``)
				break;
			}
		}
	}
    function addCommand(command: string, output: string) {
        userCommands = [...userCommands, { command, output }];
        index.set($index + 1);
    }

    $: console.log($index)
</script>

<div
	class="scrollbar-hide top-0 flex h-screen max-h-[66vh] w-full flex-col-reverse overflow-y-scroll"
>
	<div class="mx-auto w-9/12 self-start">
		<div class="console">
            <!-- Welcome message in the style of ssh -->
            <div class="command">
                <span class="output whitespace-pre-wrap">
                    {@html intro}
                    <br /> <br />
                </span>
            </div>
            <!-- Display all already typed commands -->
            {#each Array(alreadyTyped) as _, n}
                <div class="command">
                    <span class="user">it@underground</span>:<span class="directory">~/</span>$ {@html commands[
                        n
                    ].command}
                    <br />
                    <span class="output whitespace-pre-wrap">
                        {@html commands[n].output}
                    </span>
                </div>
            {/each}
			{#if current}
                {#each userCommands as command}
                    <div class="command">
                        <span class="user">it@underground</span>:<span class="directory">~/</span>$ {@html command.command}
                        <br />
                        <span class="output whitespace-pre-wrap">
                            {@html command.output}
                        </span>
                    </div>
                {/each}

				<!-- Currently typing command -->
				<div class="command relative">
					<span class="user">it@underground</span>:<span class="directory">~/</span>$
					{@html current.command.slice(0, $position)}

					{#if $position !== current.command.length}
						<span class="cursor" />
					{/if}

					{#if $position === current.command.length}
						<br />
						<span class="output whitespace-pre-wrap">
							{@html current.output}
						</span>
					{/if}
				</div>
			{/if}
			{#if animationDone}
				<div class="command relative">
					<span class="absolute top-0">
						<span class="user">it@underground</span>:<span class="directory">~/</span>$
					</span>
					<span class="cursor ml-2" />
					<!-- text box -->

					<div class="grow-wrap">
						<textarea
							wrap="hard"
							bind:this={commandInputEl}
							bind:value={commandInputValue}
							on:blur={(event) => event.currentTarget.focus()}
							on:input={(event) => {
								commandInputValue = event.currentTarget.value.padStart(
									'it@underground:~/$ '.length,
									' '
								);
								//@ts-ignore
								event.target.parentNode.dataset.replicatedValue = event.target.value;
							}}
							on:keypress={(event) => {
								const key = event.key;

								// If the user has pressed enter
								if (key == 'Enter') {
									// Prevent the default behavior of inserting a new line
									event.preventDefault();

									// Get the command
									const command = commandInputValue.trim();
									handleCommand(command);

                                    // Clear the input field
                                    commandInputValue = ' '.repeat('it@underground:~/$ '.length);
								}
							}}
						/>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
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
