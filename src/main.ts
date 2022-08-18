import p5 from 'p5';

function randBoolean() {
  return Math.random() < 0.05;
}

type Ripple = {
  center: { x: number; y: number };
  diameterList: number[];
};

const rippleList: Ripple[] = [];

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(p.color('#add1ff'));
    if (p.mouseClicked) {
      p.noFill();
      p.strokeWeight(1);
      p.stroke(44, 115, 255, 100);
      rippleList.forEach((item, rippleIndex) => {
        if (item.diameterList.length === 0) {
          rippleList.splice(rippleIndex, 1);
          return;
        }

        item.diameterList.forEach((diameter, diameterIndex) => {
          if (Math.max(...item.diameterList) > 600) {
            rippleList[rippleIndex].diameterList.splice(diameterIndex, 1);
            return;
          }
          p.ellipse(item.center.x, item.center.y, diameter);
          rippleList[rippleIndex].diameterList[diameterIndex] = diameter + 5;
          if (0 === diameterIndex && randBoolean()) {
            rippleList[rippleIndex].diameterList.unshift(diameter - 30);
          }
        });
      });
    }
  };

  p.mouseClicked = () => {
    rippleList.push({
      center: { x: p.mouseX, y: p.mouseY },
      diameterList: [20],
    });
  };
};

new p5(sketch);
