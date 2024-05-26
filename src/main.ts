import './style.css';
const { BASE_URL } = import.meta.env;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
  <div class="flex-container">
    <div class="flex-container2">
      <div>
        <h1>Hi! I'm Nicholas Fite</h1>
        <img src = "${BASE_URL}SmileyFace.png" alt ="Image of me" id="PersonalImg">
        <div class="buttons-block">
          <button style="width: 100%;">About Me</button>
          <button style="width: 100%;">Skills</button>
          <button style="width: 100%;">Experience</button>
        </div>
      </div>
      <div>
        <p id="ReadableSize">I'm a programmer and a game designer who's looking for the next step in his career</p>
      </div>
    </div>
  </div>
`