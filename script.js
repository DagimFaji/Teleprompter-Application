const samplePrompts = {
    news: `Good evening, and welcome to the 6 PM news. I'm your anchor, reporting live from the studio. [PAUSE, LOOK AT CAMERA] Breaking news tonight: a major tech company has unveiled a revolutionary new device. The gadget promises to transform daily life with its AI-driven features. [PAUSE] In international news, leaders from 20 nations are meeting to discuss climate strategies. Experts say urgent action is needed to meet 2030 goals. [PAUSE] Now, let's turn to sports. The local team secured a thrilling victory last night, advancing to the playoffs. [PAUSE, SMILE] Stay tuned for the weather forecast after this break. [PAUSE]`,
    presentation: `Good morning, everyone. Thank you for joining today's session on digital transformation. [PAUSE] Our company is at a pivotal moment, embracing technology to drive growth. [SLIDE CHANGE] First, let's review our current market position: we hold a 25% share in our sector. [PAUSE] Next, our strategy. We're investing in cloud solutions to enhance efficiency. [SLIDE CHANGE] This chart shows a projected 15% cost reduction over two years. [PAUSE] Finally, our team is ready to execute this vision. Questions? [PAUSE]`,
    keynote: `Ladies and gentlemen, it’s an honor to address you today. [PAUSE, SMILE] We stand on the cusp of a new era, driven by innovation and hope. [PAUSE] Ten years ago, our company started with a simple idea: connect people through technology. [EMPHASIZE] Today, we’ve touched 1 billion lives. [PAUSE] But we’re not stopping here. Our next goal is to empower every individual with accessible tools. [PAUSE, SMILE] Together, we can shape a brighter future. Thank you. [PAUSE]`,
    pitch: `Hello, investors. Imagine a product that redefines convenience: the SmartHome Hub. [PAUSE] This device integrates all your home systems—lighting, security, heating—into one app. [HIGHLIGHT FEATURE] Its AI learns your habits, saving 20% on energy bills. [PAUSE] The market for smart homes is growing 30% annually. [PAUSE] With $2 million, we’ll scale production and capture 10% of this market. [PAUSE] Join us in shaping the future of living. [PAUSE, SMILE]`,
    interview: `Thank you for having me today. I’m excited to share my journey. [PAUSE, NOD] My career began in software development, where I led a team to build award-winning apps. [PAUSE] What drives me? Solving real-world problems with technology. [ANSWER] For example, our latest project reduced processing times by 40%. [PAUSE] As for challenges, I thrive under pressure, turning obstacles into opportunities. [PAUSE, SMILE] I’m eager to bring this mindset to your team. [PAUSE]`
};

function loadSamplePrompt() {
    const selector = document.getElementById('sample-selector');
    const scriptInput = document.getElementById('script-input');
    const selected = selector.value;
    scriptInput.value = samplePrompts[selected] || '';
}

function proceedToPrompter() {
    const script = document.getElementById('script-input').value.trim();
    if (!script) {
        alert('Please enter a script or select a sample prompt.');
        return;
    }
    localStorage.setItem('teleprompterScript', script);
    window.location.href = 'prompter.html';
}
