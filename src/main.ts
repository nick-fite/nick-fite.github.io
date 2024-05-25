import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
  <div class="flex-container">
    <div class="flex-container2">
      <div>
        <h1>Hi! I'm Nicholas Fite</h1>
        <img src = "assets\\SmileyFace.png" alt ="Image of me">
        <div class="buttons-block">
          <button>About Me</button>
          <button>Skills</button>
          <button>Experience</button>
        </div>
      </div>
      <div>
        <h2>Feel free to call me Nick</h2>
        <p id="ReadableSize">I'm a programmer and a game designer who's looking for the next step in his career</p>
      </div>
    </div>
  </div>
`