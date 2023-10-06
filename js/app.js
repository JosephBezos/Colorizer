const columns = document.querySelectorAll(".column");

document.addEventListener("keydown", (e) => {
  console.log(e.code);
  e.preventDefault();
  if (e.code === "Space") {
    setRandomColor();
  }
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;

  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];

    node.classList.toggle("fa-lock");
    node.classList.toggle("fa-lock-open");
  } else if (type === "copy") {
    copyToClipboard(e.target.textContent);
  }
});

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColor(isInit) {
  const colors = isInit ? getColorsFromHash() : [];

  columns.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector(".column__color");
    const button = col.querySelector(".column__btn");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const color = isInit
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInit) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, button, color);
  });

  colorsHash(colors);
}

function setTextColor(text, button, color) {
  const luminance = chroma(color).luminance();

  text.style.color = luminance > 0.5 ? "#000" : "#fff";
  button.style.color = luminance > 0.5 ? "#000" : "#fff";
}

function colorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColor(true);



//cursor



let mouseX, mouseY, posX, posY;

document.addEventListener('DOMContentLoaded', () => {


  const body = document.querySelector('body')


  body.addEventListener('mousemove', e => {
    mouseCoords(e);
    cursor.classList.remove('hidden');
    follower.classList.remove('hidden');
  })


  const cursor   = document.getElementById('cursor'),
      follower = document.getElementById('aura'),
      titles    = document.getElementsByTagName('h2'),
      buttons   = document.getElementsByTagName('button')

  mouseX = 0, mouseY = 0, posX = 0, posY = 0

  function mouseCoords(e) {

    mouseX = e.pageX
    mouseY = e.pageY

  }

  gsap.to({}, .01, {

    repeat: -1,

    onRepeat: () => {

      posX += (mouseX - posX) / 5
      posY += (mouseY - posY) / 5

      gsap.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY
        }
      })

      gsap.set(follower, {
        css: {
          left: posX - 21,
          top: posY - 21
        }
      })

    }

  })

  for(let i = 0; i < titles.length; i++) {

    titles[i].addEventListener('mouseover', () => {
      cursor.classList.add('active')
      follower.classList.add('active')
    })

    titles[i].addEventListener('mouseout', () => {
      cursor.classList.remove('active')
      follower.classList.remove('active')
    })

    buttons[i].addEventListener('mouseover', () => {
      cursor.classList.add('active')
      follower.classList.add('active')
    })

    buttons[i].addEventListener('mouseout', () => {
      cursor.classList.remove('active')
      follower.classList.remove('active')
    })

  }

  body.addEventListener('mouseout', () => {
    cursor.classList.add('hidden')
    follower.classList.add('hidden')
  })

})
