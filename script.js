// MIDI Sequence Generator
class MIDISequence {
    constructor() {
        this.audioContext = null;
        // Extended diverse chord progressions and patterns
        this.chordProgressions = [
            // Original Minecraft-like progression
            {
                chords: [
                    [57, 60, 64, 69], // Am
                    [53, 57, 60, 65], // F
                    [48, 52, 55, 60], // C
                    [47, 50, 55, 59]  // G
                ],
                tempo: 60,
                pattern: 'arpeggio',
                style: 'ambient'
            },
            // Upbeat electronic progression
            {
                chords: [
                    [60, 64, 67, 72], // C
                    [64, 67, 71, 76], // E
                    [67, 71, 74, 79], // G
                    [64, 67, 71, 76]  // E
                ],
                tempo: 120,
                pattern: 'staccato',
                style: 'electronic'
            },
            // Mysterious progression
            {
                chords: [
                    [55, 58, 62, 67], // Gm
                    [52, 55, 59, 64], // Em
                    [48, 52, 55, 60], // C
                    [53, 57, 60, 65]  // F
                ],
                tempo: 80,
                pattern: 'legato',
                style: 'mysterious'
            },
            // Jazz-inspired progression
            {
                chords: [
                    [60, 64, 67, 71], // Cmaj7
                    [58, 62, 65, 69], // Bm7
                    [57, 60, 64, 67], // Am7
                    [55, 59, 62, 67]  // Gm7
                ],
                tempo: 100,
                pattern: 'swing',
                style: 'jazz'
            },
            // Rock progression
            {
                chords: [
                    [48, 52, 55, 60], // C
                    [50, 53, 57, 62], // Dm
                    [52, 55, 59, 64], // Em
                    [47, 50, 55, 59]  // G
                ],
                tempo: 140,
                pattern: 'power',
                style: 'rock'
            },
            // Classical progression
            {
                chords: [
                    [48, 52, 55, 60], // C
                    [45, 48, 52, 57], // Am
                    [50, 53, 57, 62], // Dm
                    [47, 50, 55, 59]  // G
                ],
                tempo: 90,
                pattern: 'classical',
                style: 'classical'
            },
            // Electronic dance progression
            {
                chords: [
                    [60, 64, 67, 72], // C
                    [64, 67, 71, 76], // E
                    [67, 71, 74, 79], // G
                    [64, 67, 71, 76]  // E
                ],
                tempo: 128,
                pattern: 'dance',
                style: 'dance'
            },
            // Blues progression
            {
                chords: [
                    [48, 52, 55, 60], // C
                    [45, 48, 52, 57], // Am
                    [48, 52, 55, 60], // C
                    [50, 53, 57, 62], // Dm
                    [48, 52, 55, 60], // C
                    [47, 50, 55, 59]  // G
                ],
                tempo: 100,
                pattern: 'blues',
                style: 'blues'
            }
        ];
        this.sequence = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.currentProgression = 0;
        this.currentChord = 0;
        this.currentSequence = 0;
        this.playButton = document.getElementById('playMusic');
    }

    async initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await this.audioContext.resume();
        }
    }

    generateSequence() {
        this.sequence = [];
        const currentProg = this.chordProgressions[this.currentProgression];
        const sequenceLength = 8; // Longer sequences for more variety
        
        switch(currentProg.pattern) {
            case 'arpeggio':
                // Gentle arpeggio pattern
                for (let i = 0; i < sequenceLength; i++) {
                    const chord = currentProg.chords[this.currentChord];
                    const note = chord[i % chord.length];
                    this.sequence.push({ note, duration: 1 });
                }
                break;
                
            case 'staccato':
                // Short, sharp notes
                for (let i = 0; i < sequenceLength; i++) {
                    const chord = currentProg.chords[this.currentChord];
                    const note = chord[i % chord.length];
                    this.sequence.push({ note, duration: 0.5 });
                }
                break;
                
            case 'legato':
                // Smooth, connected notes
                for (let i = 0; i < sequenceLength; i++) {
                    const chord = currentProg.chords[this.currentChord];
                    const note = chord[i % chord.length];
                    this.sequence.push({ note, duration: 2 });
                }
                break;
                
            case 'swing':
                // Jazz swing pattern
                for (let i = 0; i < sequenceLength; i++) {
                    const chord = currentProg.chords[this.currentChord];
                    const note = chord[i % chord.length];
                    this.sequence.push({ note, duration: i % 2 === 0 ? 0.75 : 0.25 });
                }
                break;
                
            case 'power':
                // Rock power chords
                for (let i = 0; i < sequenceLength; i++) {
                    const chord = currentProg.chords[this.currentChord];
                    const note = chord[0]; // Root note only
                    this.sequence.push({ note, duration: 0.5 });
                }
                break;
                
            case 'classical':
                // Classical arpeggio with varying durations
                for (let i = 0; i < sequenceLength; i++) {
                    const chord = currentProg.chords[this.currentChord];
                    const note = chord[i % chord.length];
                    this.sequence.push({ note, duration: 1.5 });
                }
                break;
                
            case 'dance':
                // Electronic dance pattern
                for (let i = 0; i < sequenceLength; i++) {
                    const chord = currentProg.chords[this.currentChord];
                    const note = chord[i % chord.length];
                    this.sequence.push({ note, duration: 0.25 });
                }
                break;
                
            case 'blues':
                // Blues shuffle pattern
                for (let i = 0; i < sequenceLength; i++) {
                    const chord = currentProg.chords[this.currentChord];
                    const note = chord[i % chord.length];
                    this.sequence.push({ note, duration: 0.33 });
                }
                break;
        }

        // Move to next chord
        this.currentChord = (this.currentChord + 1) % currentProg.chords.length;
    }

    playNote(note) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        // Convert MIDI note to frequency
        const frequency = 440 * Math.pow(2, (note - 69) / 12);
        
        // Select waveform based on style
        const currentProg = this.chordProgressions[this.currentProgression];
        switch(currentProg.style) {
            case 'ambient':
                oscillator.type = 'triangle';
                break;
            case 'electronic':
                oscillator.type = 'square';
                break;
            case 'mysterious':
                oscillator.type = 'sine';
                break;
            case 'jazz':
                oscillator.type = 'sine';
                break;
            case 'rock':
                oscillator.type = 'square';
                break;
            case 'classical':
                oscillator.type = 'sine';
                break;
            case 'dance':
                oscillator.type = 'square';
                break;
            case 'blues':
                oscillator.type = 'triangle';
                break;
        }
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        // Adjust envelope based on style
        switch(currentProg.style) {
            case 'ambient':
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
                break;
            case 'electronic':
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
                break;
            case 'mysterious':
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1.5);
                break;
            default:
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
        }
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 1);
    }

    nextSong() {
        this.currentSequence = (this.currentSequence + 1) % 4;
        this.currentProgression = (this.currentProgression + 1) % this.chordProgressions.length;
        this.currentChord = this.currentSequence;
        this.generateSequence();
        if (this.isPlaying) {
            this.currentIndex = 0;
        }
    }

    previousSong() {
        this.currentSequence = (this.currentSequence - 1 + 4) % 4;
        this.currentProgression = (this.currentProgression - 1 + this.chordProgressions.length) % this.chordProgressions.length;
        this.currentChord = this.currentSequence;
        this.generateSequence();
        if (this.isPlaying) {
            this.currentIndex = 0;
        }
    }

    updatePlayButton() {
        if (this.playButton) {
            this.playButton.querySelector('img').src = this.isPlaying
                ? 'https://win98icons.alexmeub.com/icons/png/pause-2.png'
                : 'https://win98icons.alexmeub.com/icons/png/play-2.png';
            this.playButton.querySelector('img').alt = this.isPlaying ? 'Pause' : 'Play';
        }
    }

    async play() {
        if (this.isPlaying) return;
        
        try {
            await this.initAudioContext();
            this.isPlaying = true;
            this.updatePlayButton();
            
            const playNext = () => {
                if (!this.isPlaying) return;

                if (this.currentIndex >= this.sequence.length) {
                    this.generateSequence();
                    this.currentIndex = 0;
                }

                const { note, duration } = this.sequence[this.currentIndex];
                this.playNote(note);
                
                this.currentIndex++;
                if (this.isPlaying) {
                    const currentProg = this.chordProgressions[this.currentProgression];
                    const interval = 60000 / currentProg.tempo;
                    setTimeout(playNext, interval * duration);
                }
            };

            this.generateSequence();
            playNext();
        } catch (error) {
            console.error('Error starting playback:', error);
        }
    }

    stop() {
        this.isPlaying = false;
        this.currentIndex = 0;
        this.updatePlayButton();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    }
}

// Initialize MIDI sequence
const midiSequence = new MIDISequence();

// Music controls
document.getElementById('prevSong').addEventListener('click', () => {
    midiSequence.previousSong();
});

document.getElementById('playMusic').addEventListener('click', () => {
    midiSequence.togglePlay();
});

document.getElementById('stopMusic').addEventListener('click', () => {
    midiSequence.stop();
});

document.getElementById('nextSong').addEventListener('click', () => {
    midiSequence.nextSong();
});

// Start playing when user interacts with the page
document.addEventListener('click', () => {
    if (!midiSequence.isPlaying) {
        midiSequence.play();
    }
}, { once: true });

// Price Ticker
const mongPrice = document.getElementById('mongPrice');
let lastPrice = 0;

async function updatePrice() {
    try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/bsc/0x4edd9d3d47d19d54e9817fd6c7f6bf19e0c631e0');
        const data = await response.json();
        
        if (data.pairs && data.pairs[0]) {
            const pair = data.pairs[0];
            const price = parseFloat(pair.priceUsd);
            const priceFormatted = price.toFixed(8);
            
            // Update price with color indication
            mongPrice.textContent = `$${priceFormatted}`;
            
            // Add color class based on price change
            mongPrice.classList.remove('up', 'down');
            if (lastPrice > 0) {
                if (price > lastPrice) {
                    mongPrice.classList.add('up');
                } else if (price < lastPrice) {
                    mongPrice.classList.add('down');
                }
            }
            
            lastPrice = price;
        }
    } catch (error) {
        console.error('Error fetching price:', error);
        mongPrice.textContent = 'Error loading price';
    }
}

// Update price every 10 seconds
updatePrice();
setInterval(updatePrice, 10000);

// Floating Pet
const floatingPet = document.getElementById('floatingPet');
const barkSound = document.getElementById('barkSound');
let petX = Math.random() * (window.innerWidth - 150);
let petY = Math.random() * (window.innerHeight - 150);
let petVX = (Math.random() - 0.5) * 4; // Increased base speed
let petVY = (Math.random() - 0.5) * 4; // Increased base speed

function updatePetPosition() {
    // Update position
    petX += petVX;
    petY += petVY;

    // Bounce off walls
    if (petX <= 0 || petX >= window.innerWidth - 150) {
        petVX *= -1;
        floatingPet.style.transform = `scaleX(${petVX > 0 ? 1 : -1})`;
    }
    if (petY <= 0 || petY >= window.innerHeight - 150) {
        petVY *= -1;
    }

    // Apply position
    floatingPet.style.left = petX + 'px';
    floatingPet.style.top = petY + 'px';

    // Add some random movement with increased variation
    if (Math.random() < 0.02) {
        petVX += (Math.random() - 0.5) * 1;
        petVY += (Math.random() - 0.5) * 1;
        
        // Limit speed but allow for faster movement
        const speed = Math.sqrt(petVX * petVX + petVY * petVY);
        if (speed > 6) { // Increased max speed
            petVX = (petVX / speed) * 6;
            petVY = (petVY / speed) * 6;
        }
    }

    requestAnimationFrame(updatePetPosition);
}

// Start pet animation
updatePetPosition();

// Handle pet click
floatingPet.addEventListener('click', () => {
    const barkSound = document.getElementById('barkSound');
    if (barkSound) {
        barkSound.volume = 0.5; // Set volume to 50%
        barkSound.currentTime = 0;
        barkSound.play().catch(error => {
            console.error('Error playing bark sound:', error);
        });
        floatingPet.classList.add('bark');
        setTimeout(() => floatingPet.classList.remove('bark'), 300);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    petX = Math.min(petX, window.innerWidth - 150);
    petY = Math.min(petY, window.innerHeight - 150);
});

// Wallet Connection
const connectButton = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const walletBalance = document.getElementById('walletBalance');

let connected = false;

async function connectWallet() {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            if (accounts.length > 0) {
                connected = true;
                const address = accounts[0];
                
                // Update button state
                connectButton.innerHTML = `
                    <img src="https://win98icons.alexmeub.com/icons/png/key_ok-4.png" alt="Connected">
                    <span>Connected</span>
                `;
                
                // Show wallet info
                walletAddress.textContent = `Address: ${address.slice(0, 6)}...${address.slice(-4)}`;
                
                // Get balance
                const balance = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [address, 'latest']
                });
                
                const ethBalance = parseInt(balance, 16) / 1e18;
                walletBalance.textContent = `Balance: ${ethBalance.toFixed(4)} ETH`;
                
                walletInfo.style.display = 'flex';

                // Listen for account changes
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', () => window.location.reload());
            }
        } else {
            alert('MetaMask not found! Please install MetaMask extension.');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please try again.');
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // Disconnected
        connected = false;
        connectButton.innerHTML = `
            <img src="https://win98icons.alexmeub.com/icons/png/key-4.png" alt="Connect">
            <span>Connect MetaMask</span>
        `;
        walletInfo.style.display = 'none';
    } else {
        // Account changed
        connectWallet();
    }
}

// Add click handler
connectButton.addEventListener('click', () => {
    if (!connected) {
        connectWallet();
    }
});

// Particle System
const particleCanvas = document.getElementById('particleCanvas');
const pctx = particleCanvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Audio setup
let audioContext;
let analyser;
let audioData;
try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    audioData = new Uint8Array(analyser.frequencyBinCount);

    // Get audio input
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
        })
        .catch(err => console.log('Audio input not available'));
} catch (e) {
    console.log('Web Audio API not supported');
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.baseSpeed = Math.random() * 2 + 1;
        this.speed = this.baseSpeed;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.forcex = 0;
        this.forcey = 0;
    }

    update(mouseX, mouseY, audioLevel) {
        // Audio reactivity
        if (audioLevel) {
            this.speed = this.baseSpeed + (audioLevel / 128) * 2;
        }

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            this.forcex = (dx / distance) * 5;
            this.forcey = (dy / distance) * 5;
        } else {
            this.forcex *= 0.95;
            this.forcey *= 0.95;
        }

        // Update position
        this.x += (this.vx * this.speed) + this.forcex;
        this.y += (this.vy * this.speed) + this.forcey;

        // Bounce off walls
        if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
    }

    draw() {
        pctx.beginPath();
        const gradient = pctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        pctx.fillStyle = gradient;
        pctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pctx.fill();
    }
}

// Create particles
const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(
        new Particle(
            Math.random() * particleCanvas.width,
            Math.random() * particleCanvas.height
        )
    );
}

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animation loop
function animate() {
    pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    // Get audio data if available
    let audioLevel = 0;
    if (analyser) {
        analyser.getByteFrequencyData(audioData);
        audioLevel = audioData.reduce((a, b) => a + b) / audioData.length;
    }

    // Update and draw particles
    particles.forEach(particle => {
        particle.update(mouseX, mouseY, audioLevel);
        particle.draw();
    });

    requestAnimationFrame(animate);
}
animate();

// Paint Application
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#000000';
let lastX = 0;
let lastY = 0;

// Set up canvas
ctx.strokeStyle = currentColor;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 2;

// Tool selection
document.querySelectorAll('.paint-tool').forEach(tool => {
    tool.addEventListener('click', () => {
        document.querySelectorAll('.paint-tool').forEach(t => t.style.borderColor = 'var(--win98-border-light)');
        tool.style.borderColor = 'var(--win98-border-dark)';
        currentTool = tool.title.toLowerCase();
    });
});

// Color selection
document.querySelectorAll('.color-box').forEach(color => {
    color.addEventListener('click', () => {
        currentColor = color.style.background;
        ctx.strokeStyle = currentColor;
    });
});

// Drawing events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

// Start Menu functionality
const startButton = document.querySelector('.start-button');
const startMenu = document.querySelector('.start-menu');

function toggleStartMenu() {
    const isVisible = startMenu.style.display === 'block';
    startMenu.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        // Add click outside listener
        document.addEventListener('click', closeStartMenu);
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
    }
}

function closeStartMenu(e) {
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
        startMenu.style.display = 'none';
        document.removeEventListener('click', closeStartMenu);
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        startMenu.style.display = 'none';
        document.removeEventListener('click', closeStartMenu);
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

startButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleStartMenu();
});

// Start menu item click handlers
document.querySelectorAll('.start-menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const action = item.querySelector('span').textContent;
        switch(action) {
            case 'Programs':
                // Open Programs menu (could be implemented as a submenu)
                break;
            case 'Documents':
                // Open Documents window
                break;
            case 'Settings':
                // Open Settings window
                break;
            case 'Help':
                // Open Help window
                break;
            case 'Run...':
                // Open Run dialog
                break;
            case 'Shut Down...':
                // Show shutdown dialog
                alert('It is now safe to turn off your computer.');
                break;
        }
        startMenu.style.display = 'none';
    });
});

// Window dragging functionality
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = element.querySelector('.title-bar');
    
    titleBar.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Window controls
function setupWindowControls(window) {
    const closeBtn = window.querySelector('.title-bar-controls button[aria-label="Close"]');
    const minimizeBtn = window.querySelector('.title-bar-controls button[aria-label="Minimize"]');
    const maximizeBtn = window.querySelector('.title-bar-controls button[aria-label="Maximize"]');

    closeBtn.addEventListener('click', () => {
        window.style.display = 'none';
        const taskbarItem = document.querySelector(`.taskbar-item[data-window="${window.id}"]`);
        if (taskbarItem) {
            taskbarItem.classList.remove('active');
        }
    });

    minimizeBtn.addEventListener('click', () => {
        window.style.display = 'none';
        const taskbarItem = document.querySelector(`.taskbar-item[data-window="${window.id}"]`);
        if (taskbarItem) {
            taskbarItem.classList.remove('active');
        }
    });

    maximizeBtn.addEventListener('click', () => {
        if (window.style.width === '100vw') {
            window.style.width = '';
            window.style.height = '';
            window.style.top = '';
            window.style.left = '';
        } else {
            window.style.width = '100vw';
            window.style.height = 'calc(100vh - 28px)';
            window.style.top = '0';
            window.style.left = '0';
        }
    });
}

// Desktop icon click handlers
document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const windowId = icon.querySelector('img').alt.toLowerCase().replace(/\s+/g, '-');
        const window = document.getElementById(windowId);
        
        if (window) {
            window.style.display = 'block';
            window.classList.add('active');
            
            // Add to taskbar if not already there
            if (!document.querySelector(`.taskbar-item[data-window="${windowId}"]`)) {
                const taskbarItem = document.createElement('div');
                taskbarItem.className = 'taskbar-item';
                taskbarItem.setAttribute('data-window', windowId);
                taskbarItem.innerHTML = `
                    <img src="${icon.querySelector('img').src}" alt="${icon.querySelector('img').alt}">
                    ${icon.querySelector('span').textContent}
                `;
                document.querySelector('.taskbar-items').appendChild(taskbarItem);
                
                taskbarItem.addEventListener('click', () => {
                    document.querySelectorAll('.taskbar-item').forEach(item => item.classList.remove('active'));
                    taskbarItem.classList.add('active');
                    window.style.display = 'block';
                    window.classList.add('active');
                });
            }
        }
    });
});

// Initialize windows
document.querySelectorAll('.window').forEach(window => {
    makeDraggable(window);
    setupWindowControls(window);
});

// Update clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    document.querySelector('.time').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

// Image Viewer functionality
document.querySelectorAll('.folder[data-file]').forEach(folder => {
    folder.addEventListener('dblclick', () => {
        const fileName = folder.getAttribute('data-file');
        if (fileName === 'dog.png') {
            const imageViewer = document.getElementById('image-viewer');
            imageViewer.style.display = 'block';
            
            // Add to taskbar
            const taskbarItem = document.createElement('div');
            taskbarItem.className = 'taskbar-item active';
            taskbarItem.setAttribute('data-window', 'image-viewer');
            taskbarItem.innerHTML = `
                <img src="https://win98icons.alexmeub.com/icons/png/file_image-4.png" alt="Image Viewer">
                dog.png
            `;
            document.querySelector('.taskbar-items').appendChild(taskbarItem);
            
            // Make window draggable
            makeDraggable(imageViewer);
        }
    });
});

// Save functionality
document.getElementById('save-image').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'dog.png';
    link.href = document.getElementById('viewer-image').src;
    link.click();
});

// Close image viewer
document.querySelector('#image-viewer .title-bar-controls button[aria-label="Close"]').addEventListener('click', () => {
    document.getElementById('image-viewer').style.display = 'none';
    const taskbarItem = document.querySelector('.taskbar-item[data-window="image-viewer"]');
    if (taskbarItem) {
        taskbarItem.remove();
    }
});

// Initialize wallet connection
const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressSpan = document.getElementById('walletAddress');
const walletBalanceSpan = document.getElementById('walletBalance');

// Cannon functionality
const cannon = document.getElementById('cannon');
const bullet = document.getElementById('bullet');
const pet = document.getElementById('floatingPet');
let lastShotTime = 0; // Track the last shot time
const SHOT_COOLDOWN = 1000; // One second cooldown in milliseconds
let currentMouseX = 0;
let currentMouseY = 0;
let currentAngle = 0; // Store the current angle

// Track mouse position for aiming
document.addEventListener('mousemove', (e) => {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;
    
    const cannonRect = cannon.getBoundingClientRect();
    const cannonCenterX = cannonRect.left + cannonRect.width / 2;
    const cannonCenterY = cannonRect.top + cannonRect.height / 2;
    
    // Calculate angle between cannon and mouse
    currentAngle = Math.atan2(currentMouseY - cannonCenterY, currentMouseX - cannonCenterX);
    cannon.style.transform = `rotate(${currentAngle}rad)`;
});

// Shooting functionality
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && pet.style.display !== 'none') {
        e.preventDefault(); // Prevent page scrolling
        
        // Check if enough time has passed since last shot
        const currentTime = Date.now();
        if (currentTime - lastShotTime < SHOT_COOLDOWN) {
            return; // If not enough time has passed, ignore the shot
        }
        
        // Update last shot time
        lastShotTime = currentTime;
        
        const cannonRect = cannon.getBoundingClientRect();
        const bulletSpeed = 10;
        const cannonCenterX = cannonRect.left + cannonRect.width / 2;
        const cannonCenterY = cannonRect.top + cannonRect.height / 2;
        
        // Set bullet color to gold
        bullet.style.backgroundColor = '#FFD700';
        
        // Position bullet at cannon's position
        bullet.style.left = cannonCenterX + 'px';
        bullet.style.top = cannonCenterY + 'px';
        bullet.style.display = 'block';
        
        // Calculate bullet velocity using the stored currentAngle
        const velocityX = Math.cos(currentAngle) * bulletSpeed;
        const velocityY = Math.sin(currentAngle) * bulletSpeed;
        
        // Animate bullet
        const bulletInterval = setInterval(() => {
            const bulletRect = bullet.getBoundingClientRect();
            const petRect = pet.getBoundingClientRect();
            
            // Update bullet position using the velocity
            const currentLeft = parseFloat(bullet.style.left);
            const currentTop = parseFloat(bullet.style.top);
            bullet.style.left = (currentLeft + velocityX) + 'px';
            bullet.style.top = (currentTop + velocityY) + 'px';
            
            // Check for collision with pet
            if (isColliding(bulletRect, petRect)) {
                // Play explosion sound at half volume
                const explosionSound = document.getElementById('explosionSound');
                explosionSound.volume = 0.5; // Set volume to 50%
                explosionSound.currentTime = 0;
                explosionSound.play();
                
                // Stop the music
                if (window.audioContext) {
                    window.audioContext.close();
                }
                // Also stop the MIDI sequence
                if (midiSequence) {
                    midiSequence.stop();
                }
                
                // Create explosion effect
                createExplosion(petRect.left + petRect.width / 2, petRect.top + petRect.height / 2);
                
                // Remove pet and bullet
                pet.style.display = 'none';
                bullet.style.display = 'none';
                clearInterval(bulletInterval);
            }
            
            // Remove bullet if it goes off screen
            if (bulletRect.left < 0 || bulletRect.left > window.innerWidth ||
                bulletRect.top < 0 || bulletRect.top > window.innerHeight) {
                bullet.style.display = 'none';
                clearInterval(bulletInterval);
            }
        }, 16);
    }
});

// Collision detection
function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Create explosion effect
function createExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.style.position = 'fixed';
    explosion.style.left = (x - 25) + 'px';
    explosion.style.top = (y - 25) + 'px';
    explosion.style.width = '50px';
    explosion.style.height = '50px';
    explosion.style.backgroundColor = 'orange';
    explosion.style.borderRadius = '50%';
    explosion.style.animation = 'explode 0.5s forwards';
    document.body.appendChild(explosion);
    
    // Remove explosion element after animation
    setTimeout(() => {
        document.body.removeChild(explosion);
    }, 500);
}

// Add explosion animation to CSS
const style = document.createElement('style');
style.textContent = `
@keyframes explode {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}`;
document.head.appendChild(style); 