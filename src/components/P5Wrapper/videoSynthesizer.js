import p5 from 'p5';
import 'p5/lib/addons/p5.sound';

export const videoSynthesizer = (p) => {
    let props = [];
    let power = false;
    let VOa = Object;
    let VOb = Object;
    let mic = Object;
    let fft = Object;
    let bands = [60, 60, 60, 60];
    //let prevBands = [30, 30, 30, 30];
    let prevBands = [];
    let modulation = [];

    //props => array
    //props.find(prop=> prop.key === belowItems)
    //basicShape
    //screenSplitShape
    //screenSplitNum
    p.pushProps = (_props) => {
        props = _props.selector;
        power = _props.power;
    };

    p.gp = (prm, n) => {
        switch (prm) {
            case 'BS':
                return props.find((prop) => prop.key === `basicShape-${n}`).val;
            case 'BSS':
                return props.find((prop) => prop.key === `basicShapeSize-${n}`).val - modulation[0];
            case 'SSS':
                return props.find((prop) => prop.key === `screenSplitShape-${n}`).val;
            case 'SSN':
                return props.find((prop) => prop.key === `screenSplitNum-${n}`).val - modulation[1];
            case 'SSP':
                return props.find((prop) => prop.key === `screenSplitSpread-${n}`).val;
            case 'SH':
                return props.find((prop) => prop.key === `shapeHue-${n}`).val - modulation[1] * 50;
            case 'OX':
                return props.find((prop) => prop.key === `offsetX-${n}`).val;
            case 'OY':
                return props.find((prop) => prop.key === `offsetY-${n}`).val;
        }
    };

    class VideoOsc {
        constructor(width, height, n) {
            this.width = width;
            this.height = height;
            this.pg = p.createGraphics(width, height);
            this.n = n;
            this.pg.colorMode(p.HSB, 360, 100, 100, 1.0);
        }

        renderShape = (xpos, ypos, BS, BSS, hue) => {
            const pg = this.pg;
            const x = xpos + p.gp('OX', this.n);
            const y = ypos + p.gp('OY', this.n);

            pg.fill(hue, 100, 100);
            switch (BS) {
                case 1: //circle
                    pg.ellipseMode(p.CENTER);
                    pg.ellipse(x, y, BSS * 10, BSS * 10);
                    break;
                case 2: //rectangle
                    pg.rectMode(p.CENTER);
                    pg.rect(x, y, BSS * 10, BSS * 10);
                    break;
                case 3: //triangle
                    pg.triangle(x - BSS * 5, y + BSS * 5, x, y - BSS * 5, x + BSS * 5, y + BSS * 5);
                    break;
                case 4: //X
                    pg.line(x + BSS * 5, y + BSS * 5, x - BSS * 5, y - BSS * 5);
                    pg.line(x - BSS * 5, y + BSS * 5, x + BSS * 5, y - BSS * 5);
                    break;
            }
        };

        renderSplit = (SSS, SSN) => {
            const pg = this.pg;
            const R = p.gp('SSP', this.n);
            const BS = p.gp('BS', this.n);
            const BSS = p.gp('BSS', this.n);
            switch (SSS) {
                case 1: {
                    //circle
                    pg.push();
                    pg.translate(pg.width / 2, pg.height / 2);
                    if (SSN > 1) {
                        for (let i = 0; i < SSN; i++) {
                            let xpos = p.cos(p.radians(i * (360 / SSN))) * (p.width / R);
                            let ypos = p.sin(p.radians(i * (360 / SSN))) * (p.width / R);
                            this.renderShape(xpos, ypos, BS, BSS, p.gp('SH', this.n));
                        }
                    } else {
                        this.renderShape(0, 0, BS, BSS, p.gp('SH', this.n));
                    }
                    pg.pop();
                    break;
                }

                case 2: {
                    //square

                    if (SSN > 1) {
                        pg.push();
                        pg.translate(pg.width / (SSN * 2), pg.width / (SSN * 2));
                        for (let i = 0; i < SSN * 2; i += 2) {
                            for (let j = 0; j < SSN * 2; j += 2) {
                                this.renderShape(
                                    i * (p.width / (SSN * 2)),
                                    j * (p.width / (SSN * 2)),
                                    BS,
                                    BSS,
                                    p.gp('SH', this.n),
                                );
                            }
                        }
                        pg.pop();
                    } else {
                        pg.push();
                        pg.translate(pg.width / 2, pg.height / 2);
                        this.renderShape(0, 0, BS, BSS, p.gp('SH', this.n));
                        pg.pop();
                    }
                    break;
                }
            }
        };

        render() {
            this.pg = p.createGraphics(this.width, this.height);
            this.pg.colorMode(p.HSB, 360, 100, 100, 1.0);
            this.renderSplit(p.gp('SSS', this.n), p.gp('SSN', this.n));
        }
    }

    p.analyze = (fft) => {
        let spectrum = fft.analyze();
        let current = [];
        for (let i = 0; i < 4; i++) {
            let band = spectrum.slice(i * 4, (i + 1) * 4);
            current.push(band);
        }

        let avers = [];
        for (let band of current) {
            let sum = band.reduce((a, b) => a + b);
            let average = sum / 4;
            avers.push(average);
        }

        return avers;
    };

    p.setup = () => {
        p.createCanvas(500, 500);
        p.noCursor();
        VOa = new VideoOsc(p.width, p.height, 1);
        VOb = new VideoOsc(p.width, p.height, 2);

        mic = new p5.AudioIn();
        fft = new p5.FFT(0.7, 16);
        fft.setInput(mic);
    };

    p.draw = () => {
        if (power) {
            p.getAudioContext().resume();
            mic.start();

            modulation = [];
            prevBands = bands;
            bands = p.analyze(fft);

            for (let i = 0; i < 4; i++) {
                let diff = prevBands[i] - bands[i];
                //let diff = bands[i] + prevBands[i];
                modulation.push(diff / 3);
            }
        } else {
            mic.stop();
        }

        p.background(255);
        VOa.render();
        VOb.render();
        p.imageMode(p.CENTER);
        p.image(VOa.pg, p.width / 2, p.height / 2);
        p.image(VOb.pg, p.width / 2, p.height / 2);
    };
};
