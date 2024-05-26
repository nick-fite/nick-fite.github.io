import './style.css';
import { AboutMeClick, ExperienceClick, SkillsClick} from './func';
const { BASE_URL } = import.meta.env;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
  <div class="flex-container">
    <div class="flex-container2">
      <div>
        <h1>Hi! I'm Nicholas Fite</h1>
        <img src = "${BASE_URL}SmileyFace.png" alt ="Image of me" id="PersonalImg">
        <div class="buttons-block" style="  padding-bottom: 5%;">
          <input type="button" value="About Me" style="width: 100%;" id="AboutMeButton"></input>
          <input type="button" value="Skills" style="width: 100%;" id="SkillsButton"></input>
          <input type="button" value="Experience" style="width: 100%; " id="ExperienceButton"></input>
        </div>
      </div>
      <div id="Information">
        <p id="ReadableSize">I'm a programmer and a game designer who's looking for the next step in his career</p>
      </div>
    </div>
  </div>
`

let infoDiv = document.getElementById("Information"); 

let AboutMeBtn = document.getElementById("AboutMeButton");
AboutMeBtn?.addEventListener("click", () => AboutMeClick(infoDiv));

let SkillsBtn = document.getElementById("SkillsButton");
SkillsBtn?.addEventListener("click", () => SkillsClick(infoDiv));

let ExperienceBtn = document.getElementById("ExperienceButton");
ExperienceBtn?.addEventListener("click", () => ExperienceClick(infoDiv));