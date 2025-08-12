import './style.css';
import { AboutMeClick, EducationClick, ExperienceClick, SkillsClick} from './func.ts';
const { BASE_URL } = import.meta.env;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
  <div class="flex-container">
    <div class="flex-container2">
      <div>
        <h1> Nicholas Fite</h1>
        <img src = "${BASE_URL}highResNew_headshot.jpg" alt ="Image of me" id="ResizeableImage" style = "border-radius: 100px; border: 3px solid white;">
        <div class="buttons-block" style="  padding-bottom: 5%;">
          <input type="button" value="About Me" style="width: 100%;" id="AboutMeButton"></input>
          <input type="button" value="Skills" style="width: 100%;" id="SkillsButton"></input>
          <input type="button" value="Experience" style="width: 100%;" id="ExperienceButton"></input>
          <input type="button" value="Education" style="width: 100%;" id="EducationButton"></input>
        </div>
      </div>
      <div id="Information" style="width: 100%; height: 100%; padding-left:5%;"> 
        <p id="ReadableSize" >I'm a programmer, game designer, and student based out of San Antonio, TX. I'm looking
        for the next step in my career.
        <div class='LanguageIcons' style="align-items: center; padding-top: 5%;">
          <a  href="https://www.linkedin.com/in/nicholas-fite5" style='display:block;'>
            <img src="${BASE_URL}linkedin.png" alt="UIW Logo" id="ResizeableImage" />
          </a>
          <a href="https://github.com/nick-fite">
            <img src="${BASE_URL}github.png" alt="UIW Logo" id="ResizeableImage"/>
          </a>
          <a href="mailto:nicholasfite10@gmail.com">nicholasfite10@gmail.com</a>
        </div>
      </div>
    </div>
  </div>
  <div class="PersonalProjects">
    <h1>Personal Projects</h1>
    
    <h2>Unreal Engine Marching Cubes</h2>  
    <div id="PersonalProject">
      <div>
        <p>Recreating objects with the marching cube style. Uses size distance fields to recreate object in blocky style, gives ability
        to increase resolution of objects. Uses sined distance fields to create the objets. Objects can be destroyed by making holes in it.
        </p>
          <button class="ButtonIcon" id="BrokenBronzeBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>  
      </div>
      <div style="
  margin-left:5%;
  width:70%;
  display:flex;
  justify-content:center;
">
  <div style="
    position:relative;               /* needed for ::before */
    display:inline-grid;             /* tighter box than flex */
    grid-template-columns: repeat(2, 120px);
    gap:24px;
    padding:24px;
    border-radius:16px;
    background:#1a1a1a;              /* contrast with border */
    isolation:isolate;               /* keep stacking sane */
  ">
    <!-- the border -->
    <span style="
      content:'';
      position:absolute; inset:0;
      border:3px solid #fff; border-radius:16px;
      pointer-events:none;
      z-index:1;
      display:block;
    "></span>

    <!-- top row -->
    <img src="${BASE_URL}MarchingCube/MarchingCubeLowRes.PNG"
         alt="Low Res"  style="width:480px;height:auto;border-radius:8px;" />
    <img src="${BASE_URL}MarchingCube/MarchingCubeHighRes.PNG"
         alt="High Res" style="width:480px;height:auto;border-radius:8px;" />

    <!-- bottom, centered under both -->
    <img src="${BASE_URL}MarchingCube/MarchingCubeOriginal.PNG"
         alt="Original" style="
           width:140px;height:auto;border-radius:8px;
           grid-column:1 / -1; justify-self:center;
         " />
  </div>
</div>
    </div>

    <h2>Raycasting Night Drive</h2>  
    <div id="PersonalProject">
      <div>
        <p>A remake of the classic arcade game <a href="https://en.wikipedia.org/wiki/Night_Driver_(video_game)">Night Drive</a>
        using raycasting in OpenGL and C. A pseudo-3D game.</p>
          <button class="ButtonIcon" id="NightDriveBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>  
      </div>
      <img src="${BASE_URL}NightDrive_screenshot.png" alt="Multiplayer Shooter Image" id="ResizeableImage"/>
    </div>

    <h2>Greedy Terrain Generation</h2>  
    <div id="PersonalProject">
      <div>
        <p>Custom greedy terrain generation built in UE5. Generates a world based on a seed that you can fly around and break blocks in.</p>
          <button class="ButtonIcon" id="TerrainGenerationBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>  
      </div>
      <img src="${BASE_URL}TerrainGeneration_screenshot.png" alt="Multiplayer Shooter Image" id="ResizeableImage"/>
    </div>

    <h2>FPS Controller</h2>  
    <div id="PersonalProject">
      <div>
        <p>A Unreal Engine 5 FPS controller. Allows you to slide, shoot, and break targets.</p>
          <button class="ButtonIcon" id="FPSControllerBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>  
      </div>
      <img src="${BASE_URL}FPSController_screenshot.png" alt="Multiplayer Shooter Image" id="ResizeableImage"/>
    </div>

    <h2>Knightly Shove</h2>  
    <div id="PersonalProject">
      <div>
        <p>A Unity LAN multiplayer game that allows you to pick up items, throw them at people and shove people into a pit. Made in a group with 2 other people with custom models and using P4V for version control.</p>
          <button class="ButtonIcon" id="KnightlyShoveBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>  
      </div>
      <img src="${BASE_URL}KnightlyShove_screenshot.png" alt="Multiplayer Shooter Image" id="ResizeableImage"/>
    </div>

    <h2>Power Up System</h2>  
    <div id="PersonalProject">
      <div>
        <p>A simple power up system built in Unity. Open ended, allowing for power ups to come in all shapes and sizes by editing base stats and allowing custom functions to be called.</p>
          <button class="ButtonIcon" id="PowerUpSystemBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>  
      </div>
      <img src="${BASE_URL}PowerUpSystem_screenshot.png" alt="Multiplayer Shooter Image" id="ResizeableImage"/>
    </div>

    <h2>Tentacle IK</h2>  
    <div id="PersonalProject">
      <div>
        <p>Custom IK solution that allows you to manipulate tentacles on an object. Simply click on the circle to drag it to where you want it. You can also use the scroll wheel to move it up.</p>
          <button class="ButtonIcon" id="IKBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>  
      </div>
      <img src="${BASE_URL}IKTentacle_screenshot.png" alt="Multiplayer Shooter Image" id="ResizeableImage"/>
    </div>

    <h2>Multiplayer Shooter</h2>  
    <div id="PersonalProject">
      <div>
        <p>A simple third person shooter made in Unreal Engine 5 using unreal engines built in multiplayer system. Players 
        can make games and connect on LAN, change names that are visible in game, walk, run, lung into the air, and aim 
        down sights. Red death orbs block the players path, which is controlled from the server side.</p>
          <button class="ButtonIcon" id="MultiplayerShooterBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>  
      </div>
      <img src="${BASE_URL}multiplayerShooter_screenshot.png" alt="Multiplayer Shooter Image" id="ResizeableImage"/>
    </div>
    
    <h2>Group Fighting</h2>
    <div id="PersonalProject">
    <div> 
      <p>A simple game mechanic that has a group of people fighting the player made in Unreal Engine 5. Each enemy has to take 
      turns hitting the player, and doesn't let them all attack at the same time. It additionally makes them fan out, so they 
      don't clump up in the same area. When the enemy is hit enough they become stunned, and can be finished off by the player.</p>
          <button class="ButtonIcon" id="GroupFighterBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>
    
    </div>
      <img src="${BASE_URL}groupFighting_screenshot.png" alt="Group Fighting Image" id="ResizeableImage"/>
    </div>
    
    <h2>Mobile Endless Runner</h2>
    <div id="PersonalProject">
      <div>
        <p>A Simple Endless runner made in unity. Player has the ability to jump, run on walls and slide under obstacles.
        The goal is to run as long as possible. The game can be played both on android and on computer.</p>
          <button class="ButtonIcon" id="EndlessRunnerBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}github.png" id=""/>
            </div>
            <p>GitHub</p>
          </button>
      </div>
        <img src="${BASE_URL}endlessRunner_screenshot.png" alt="Endless Runner Image" id="ResizeableImage"/>
    </div>

    <h2>Stealth Game</h2>
    <div id="PersonalProject">
    <div>
      <p>A third person stealth game made in unity. AI will notice sounds, investigate areas they believe the player may be,
      alert others if they run into the player and then bring all the enemies to the area they saw the player last. The player
      is given the ability to change their color, if their color matches the color of the wall behind them the enemy has to
      be closer to notice them.</p>
          <button class="ButtonIcon" id="StealthGameBtn">
            <div style="width:10%; height:5%; align-items: center; margin-right: 1%;">
              <img src="${BASE_URL}github.png"/>
            </div>
            <p>GitHub</p>
          </button>
    </div>
      <img src="${BASE_URL}stealthGame_screenshot.png" alt="Stealth Game Image" id="ResizeableImage"/>
    </div>

    <h2>Gun Wizard</h2>
    <div id="PersonalProject">
      <div> 
        <p>A top down shooter made in collaberation with others in MonoGame. Additionally made a level editor in visual studio forms.</p>
          <button class="ButtonIcon" id="GunWizardBtn">
            <div style="width: 12%; height:12%; align-items: center;">
              <img src="${BASE_URL}google_Drive.png" id=""/>
            </div>
            <p>Source Code, game, and level editor</p>
          </button>
      </div>
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

let GunWizardBtn = document.getElementById("GunWizardBtn");
GunWizardBtn?.addEventListener("click", () => {
  window.open("https://drive.google.com/drive/folders/1npCTJFmen9BoFwFO7y8eu_vaW1dVX30K?usp=sharing","_blank");
});

let StealthGameBtn = document.getElementById("StealthGameBtn");
StealthGameBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/Stealth_System_Unity","_blank");
});

let EndlessRunnerBtn = document.getElementById("EndlessRunnerBtn");
EndlessRunnerBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/Unity_Endless_Runner","_blank");
});

let GroupFighterBtn = document.getElementById("GroupFighterBtn");
GroupFighterBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/Group_Fighting_UE5","_blank");
});

let MultiplayerShooterBtn = document.getElementById("MultiplayerShooterBtn");
MultiplayerShooterBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/Multiplayer_Shooter_UE5","_blank");
});

let IKBtn = document.getElementById("IKBtn")
IKBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/Tentacle_IK_Unity","_blank");
});

let PowerUpSystemBtn = document.getElementById("PowerUpSystemBtn")
PowerUpSystemBtn?.addEventListener("click", () => { 
  window.open("https://github.com/nick-fite/PowerUpSystem_Unity","_blank");
});

let KnightlyShoveBtn = document.getElementById("KnightlyShoveBtn")
KnightlyShoveBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/KnightlyShove_Unity","_blank");
 });
let FPSControllerBtn = document.getElementById("FPSControllerBtn")
FPSControllerBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/UE5_FPSController","_blank");

});
let TerrainGenerationBtn = document.getElementById("TerrainGenerationBtn");
TerrainGenerationBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/UE5_ProceduralGeneration","_blank");

});
let NightDriveBtn = document.getElementById("NightDriveBtn");
NightDriveBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/NightDriveOpenGL","_blank");

});

let BrokenBronzeBtn = document.getElementById("BrokenBronzeBtn");
BrokenBronzeBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/BrokenBronze","_blank");

});

let ShopliftingBoyBtn = document.getElementById("ShopliftingBoyBtn");
ShopliftingBoyBtn?.addEventListener("click", () => {
  window.open("https://github.com/nick-fite/ShopLiftOpenGL","_blank");
});