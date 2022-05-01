
class ParticleSystem {

    constructor() {
        this.particlePool = [];
    }

    update() {
        for (const p of this.particlePool) {
            if (!p.active)
                continue;

            if (p.life <= 0) {
                p.active = false;
                continue;
            }

            p.life -= deltaTime;
            p.pos.add(p.vel);
            const sizeScale = map(p.lifeRatio(), 0, 1, p.endScale, 1);
            p.size.set(p5.Vector.mult(p.startSize, sizeScale))
        }
    }

    draw() {
        for (const p of this.particlePool) {
            if (!p.active)
                continue;

            const alpha = p.lifeRatio() * 255;
            fill(255, alpha);
            noStroke();
            rectMode(CENTER);
            rect(p.pos.x, p.pos.y, p.size.x, p.size.y);
        }
    }

    emit(particleProps) {
        let p = this.particlePool.find(p => !p.active);

        if (p === undefined) {
            p = {};
            this.particlePool.push(p);
        }

        p.pos = particleProps.pos.copy();
        p.size = particleProps.size.copy();
        p.startSize = p.size.copy();
        p.vel = particleProps.vel.copy();
        p.vel.x += particleProps.velVariation.x * (Math.random() - 0.5);
        p.vel.y += particleProps.velVariation.y * (Math.random() - 0.5);
        p.endScale = particleProps.endScale;
        p.lifetime = particleProps.lifetime;
        p.life = p.lifetime;
        p.active = true;
        p.lifeRatio = function () {
            return this.life / this.lifetime;
        };
    }
}

class ParticleProps {
    constructor(x, y, w, h, vx, vy, vxVariation, vyVariation, endScale = 0, lifetime = 1000) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
        this.vel = createVector(vx, vy);
        this.velVariation = createVector(vxVariation, vyVariation);
        this.endScale = endScale;
        this.lifetime = lifetime;
    }
}