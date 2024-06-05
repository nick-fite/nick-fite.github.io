import './style.css';
import { AboutMeClick, EducationClick, ExperienceClick, SkillsClick} from './func';
const { BASE_URL } = import.meta.env;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
  <div class="flex-container">
    <div class="flex-container2">
      <div>
        <h1> Nicholas Fite</h1>
        <img src = "${BASE_URL}higherResolution_headshot.jpg" alt ="Image of me" id="ResizeableImage" style = "border-radius: 100px; border: 3px solid #AAAAAA;">
        <div class="buttons-block" style="  padding-bottom: 5%;">
          <input type="button" value="About Me" style="width: 100%;" id="AboutMeButton"></input>
          <input type="button" value="Skills" style="width: 100%;" id="SkillsButton"></input>
          <input type="button" value="Experience" style="width: 100%;" id="ExperienceButton"></input>
          <input type="button" value="Education" style="width: 100%;" id="EducationButton"></input>
        </div>
      </div>
      <div id="Information" style="width: 100%; height: 100%; padding-left:5%;"> 
        <p id="ReadableSize" >I'm a programmer, game designer, and student based out of San Antonio, TX. I'm looking
        for the next step in my career.</p>
      </div>
    </div>
  </div>
  <div class="PersonalProjects">
    <h1>Personal Projects</h1>
    
    <h2>Multiplayer Shooter</h2>  
    <div id="PersonalProject">
      <p>A simple third person shooter made in Unreal Engine 5 using unreal engines built in multiplayer system. Players 
      can make games and connect on LAN, change names that are visible in game, walk, run, lung into the air, and aim 
      down sights. Red death orbs block the players path, which is controlled from the server side.</p>
      <img src="${BASE_URL}multiplayerShooter_screenshot.png" alt="Multiplayer Shooter Image" id="ResizeableImage"/>
    </div>
    
    <h2>Group Fighting</h2>
    <div id="PersonalProject">
      <p>A simple game mechanic that has a group of people fighting the player made in Unreal engine 5. Each enemy has to 
      take turns hitting the player, and doesn't let them all attack at the same time. It additionally makes them fan out,
      so they don't clump up in the same area. When enemy is hit enough they become stunned, and can be finished off by the
      player.</p>
      <img src="${BASE_URL}groupFighting_screenshot.png" alt="Group Fighting Image" id="ResizeableImage"/>
    </div>
    
    <h2>Mobile Endless Runner</h2>
    <div id="PersonalProject">
      <p>A Simple Endless runner made in unity. Player has the ability to jump, run on walls and slide under obstacles.
      The goal is to run as long as possible. The game can be played both on android and on computer.</p>
      <img src="${BASE_URL}endlessRunner_screenshot.png" alt="Endless Runner Image" id="ResizeableImage"/>

    </div>

    <h2>Stealth Game</h2>
    <div id="PersonalProject">
      <p>A third person stealth game made in unity. AI will notice sounds, investiate areas they belive the player may be,
      alert others if they run into the player and then bring all the enemies to the area they saw the player last. The player
      is given the ability to change their color, if their color matches the color of the wall behind them the enemy has to
      be closer to notice them.</p>
      <img src="${BASE_URL}stealthGame_screenshot.png" alt="Stealth Game Image" id="ResizeableImage"/>
    </div>

    <h2>Gun Wizard</h2>
    <div id="PersonalProject">
      <p>A top down shooter made in collaberation with others in MonoGame. Additionally made a level editor in 
      visual studio forms.</p>
      <img src="${BASE_URL}gunWizard_screenshot.png" alt="Gun Wizard Image" id="ResizeableImage"/>
    </div>
  </div>
`
// I could (and probably should) move the css in the html to the .css, but this is for simple things. feels unnecessary.

let infoDiv = document.getElementById("Information"); 

let AboutMeBtn = document.getElementById("AboutMeButton");
AboutMeBtn?.addEventListener("click", () => AboutMeClick(infoDiv));

let SkillsBtn = document.getElementById("SkillsButton");
SkillsBtn?.addEventListener("click", () => SkillsClick(infoDiv));

let ExperienceBtn = document.getElementById("ExperienceButton");
ExperienceBtn?.addEventListener("click", () => ExperienceClick(infoDiv));

let EducationBtn = document.getElementById("EducationButton");
EducationBtn?.addEventListener("click", () => EducationClick(infoDiv));