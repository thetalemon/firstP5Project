import p5 from 'p5';

const itemList = [];

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
      itemList.forEach((item, index) => {
        p.ellipse(item.x, item.y, item.diameter);
        itemList[index] = {
          x: item.x,
          y: item.y,
          diameter: item.diameter + 2,
        };
      });
    }
  };

  p.mouseClicked = () => {
    itemList.push({ x: p.mouseX, y: p.mouseY, diameter: 20 });
  };
};

new p5(sketch);
