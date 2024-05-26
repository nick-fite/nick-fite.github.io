import './style.css';
import { AboutMeClick, ExperienceClick, SkillsClick} from './func';
const { BASE_URL } = import.meta.env;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
  <div class="flex-container">
    <div class="flex-container2">
      <div>
        <h1> Nicholas Fite</h1>
        <img src = "${BASE_URL}SmileyFace.png" alt ="Image of me" id="ResizeableImage">
        <div class="buttons-block" style="  padding-bottom: 5%;">
          <input type="button" value="About Me" style="width: 100%;" id="AboutMeButton"></input>
          <input type="button" value="Skills" style="width: 100%;" id="SkillsButton"></input>
          <input type="button" value="Experience" style="width: 100%;" id="ExperienceButton"></input>
        </div>
      </div>
      <div id="Information" style="width: 100%; height: 100%; padding-left:5%;"> 
        <p id="ReadableSize" >I'm a programmer and a game designer who's looking for the next step in his career</p>
      </div>
    </div>
  </div>
  <h1>Personal Projects</h1>
`
// I could (and probably should) move the css in the html to the .css, but this is for simple things. feels unnecessary.

let infoDiv = document.getElementById("Information"); 

let AboutMeBtn = document.getElementById("AboutMeButton");
AboutMeBtn?.addEventListener("click", () => AboutMeClick(infoDiv));

let SkillsBtn = document.getElementById("SkillsButton");
SkillsBtn?.addEventListener("click", () => SkillsClick(infoDiv));

let ExperienceBtn = document.getElementById("ExperienceButton");
ExperienceBtn?.addEventListener("click", () => ExperienceClick(infoDiv));