<script lang="ts">
	let input = $state('');

	const morseKeyCode: Record<string, string> = {
		a: '.-',
		b: '-...',
		c: '-.-.',
		d: '-..',
		e: '.',
		f: '..-.',
		g: '--.',
		h: '....',
		i: '..',
		j: '.---',
		k: '-.-',
		l: '.-..',
		m: '--',
		n: '-.',
		o: '---',
		p: '.--.',
		q: '--.-',
		r: '.-.',
		s: '...',
		t: '-',
		u: '..-',
		v: '...-',
		w: '.--',
		x: '-..-',
		y: '-.--',
		z: '--..',
		1: '.----',
		2: '..---',
		3: '...--',
		4: '....-',
		5: '.....',
		6: '-....',
		7: '--...',
		8: '---..',
		9: '----.',
		0: '-----',
		' ': '/'
	};

	const translateToMorse = (input: string) => {
		return input
			.split('')
			.map((char) => morseKeyCode[char.toLowerCase()])
			.join(' ');
	};

	const morseCode = $derived(translateToMorse(input));

	let isPlaying = false;
	let intervalId: ReturnType<typeof setInterval>;

	function playMorseCode() {
		if (isPlaying) return;
		play();
	}

	let oscillator: OscillatorNode;
	let gainNode: GainNode;

	function play() {
		if (isPlaying) stop();
		const audioContext = new AudioContext();
		oscillator = audioContext.createOscillator();
		oscillator.frequency.value = 550;
		gainNode = audioContext.createGain();
		gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		const timeUnit = 80;
		const dot = timeUnit;
		const dash = timeUnit * 3;
		const intraCharSpace = timeUnit;
		const letterSpace = timeUnit * 3;
		const wordSpace = timeUnit * 7;

		let time = audioContext.currentTime;
		for (const char of morseCode) {
			switch (char) {
				case '.':
					gainNode.gain.setValueAtTime(0.5, time);
					time += dot / 1000;
					gainNode.gain.setValueAtTime(0, time);
					break;
				case '-':
					gainNode.gain.setValueAtTime(0.5, time);
					time += dash / 1000;
					gainNode.gain.setValueAtTime(0, time);
					break;
				case ' ':
					time += wordSpace / 1000;
					break;
				default:
					time += letterSpace / 1000;
			}
			time += intraCharSpace / 1000;
		}

		isPlaying = true;
		oscillator.start(audioContext.currentTime);
		oscillator.stop(time);
		oscillator.onended = stop;
	}

	function stop() {
		if (!oscillator || !gainNode || !isPlaying) return;
		isPlaying = false;
		clearInterval(intervalId);
		oscillator.stop();
		oscillator.disconnect();
		gainNode.disconnect();
	}
</script>

<h1 class="mb-8">Morse code translator</h1>

<p class="mb-4">Write your message to be translated to morse code.</p>

<input bind:value={input} class="p-2 w-96 mb-4" type="text" />

{#if morseCode}
	<p>{morseCode}</p>
	<button onclick={playMorseCode}>Play</button>
{/if}
