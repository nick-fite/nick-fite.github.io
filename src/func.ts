const { BASE_URL } = import.meta.env;

export function AboutMeClick(infoDiv : any)
{
    infoDiv!.innerHTML = `
    <p id="ReadableSize">I'm a programmer, game designer, and student based out of San Antonio, TX. I'm looking
    for the next step in my career.</p>
        <div class='LanguageIcons' style="align-items: center; padding-top: 5%;">
          <a  href="https://www.linkedin.com/in/nicholas-fite5" style='display:block;'>
            <img src="${BASE_URL}linkedin.png" alt="UIW Logo" id="ResizeableImage" />
          </a>
          <a href="https://github.com/nick-fite">
            <img src="${BASE_URL}github.png" alt="UIW Logo" id="ResizeableImage"/>
          </a>
          <a href="mailto:nicholasfite10@gmail.com">nicholasfite10@gmail.com</a>
        </div>
    `
    return "test";
}

export function SkillsClick(infoDiv : any)
{
    infoDiv!.innerHTML = `
    <div class="LanguageIcons">
        <img src="${BASE_URL}JavaScript_logo.png" alt="Javascript Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}Typescript_logo.png" alt="Typescript Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}html5_logo.png" alt="HTML5 Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}CSS_logo.png" alt="CSS Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}next-js.svg" alt="NextJS Logo" class="InvertColor" id="ResizeableImage"/>
        <img src="${BASE_URL}React-icon.png" alt="React Logo" id="ResizeableImage"/>
        </div>
    <div class="LongIcons">
        <img src="${BASE_URL}C_logo.png" alt="C Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}C++_logo.png" alt="C++ Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}C-Sharp_logo.png" alt="C# Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}Java_Logo.png" alt="Java Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}Python_logo.png" alt="Python Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}Opengl.png" alt="Python Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}unreal.svg" alt="unreal Logo" class="InvertColor" id="ResizeableImage"/>
        <img src="${BASE_URL}unityLogo.svg" alt="unreal Logo" class="InvertColor" id="ResizeableImage"/>
        <img src="${BASE_URL}godotLogo.png" alt="unreal Logo" id="ResizeableImage"/>
        <img src="${BASE_URL}maya.png" alt="unreal Logo" id="ResizeableImage"/>
    </div>
    <p id="SkillsParagraphs">I have always enjoyed learning as much as I can about computers, and gaining 
    all the new skills that I can. Currently I am learning as much as I can about the process of making video 
    games, from the inner workings of game engines to using popular game engines. </p>
    <h2>Tools/Plugins</h2>
    <p id="ToolsParagraphs">I have used a number of API's and tools, and am confident I can learn anything 
    new that I need to.</p>
    <ul>
        <li>Git</li>
        <li>Perforce</li>
        <li>Slack</li>
        <li>Trello</li>
    </ul>
    <ul>
        <li>GameMaker Studio 2</li>
        <li>Unity</li>
        <li>Unreal Engine 5</li>
        <li>Godot</li>
        <li>Monogame</li>
        <li>Maya</li>
        <li>OpenGL</li>
    </ul>
    <ul>
        <li>Angular</li>
        <li>PixiJS</li>
        <li>Three.js</li>
        <li>npm</li>
        <li>Postresql</li>
        <li>Figma</li>
        <li>Jira</li>
        <li>Axure</li>
        <li>Linux</li>
        <li>RedHat</li>
        <li>Vim</li>
    </ul>
    `
    return "test";
}

export function ExperienceClick(infoDiv : any)
{
    infoDiv!.innerHTML = `
    
    <div id="TitleLogo">
    <h2>Theatre Nohgaku</h2>
    <img src="${BASE_URL}TN_logo_roundel_25_no_white_clean.png" alt="Best Buy Logo" id="ResizeableImage"/>
    </div>
    <small> August 2022 - current </small>
    <p id="ExperienceParagraph">Developing a React Native app with a firebase backend for an art Installation, taking in 
    and organizing photos, videos, and audio clips by tags.Helping guide the project to a more 
    feasible direction, providing technical insight.
    </p>
    
    <div id="TitleLogo">
    <h2>Valens Games</h2>
    <img src="${BASE_URL}Valens_logo.png" alt="Code Ninjas Logo" class="InvertColor" id="ResizeableImage"/>
    </div>
    <small>November 2024 - May 2025</small>
    <p id="ExperienceParagraph">
    Frontend Engineer creating user-focused features and integrating APIs with PostgreSQL through React, Next.js, Chakra UI, and TypeScript.
    </p>

    <div id="TitleLogo">
        <h2>LightForce Orthodontics</h2>
        <img src="${BASE_URL}LightForce_logo.png" alt="LightForce Orthodontics Logo" id="ResizeableImage"/>
    </div>
    <small>December 2022 - May 2023</small>
    <p id="ExperienceParagraph">Developed web-based 3D modeling software for 
    orthodontists using JavaScript, TypeScript, Angular, Three.js, Postgresql, and Git. 
    It enables precise placement of braces through teeth scans and 3D-printed guides.
    Worked with and learned from a team of experienced professionals.
    </p>
    `
    return "test";
}

export function EducationClick(infoDiv : any)
{
    infoDiv!.innerHTML = `
    <div id="TitleLogo">
        <h2>University of the Incarnate Word</h2>
        <img src="${BASE_URL}UIW_logo.png" alt="UIW Logo" id="ResizeableImage"/>
    </div>
    <small>2023 - 2026</small>
    <p id="ExperienceParagraph">Majoring in 3D Animation and Game Design, taking classes that teach
    C/C++, C#, Python, along with major game engines (Unity and Unreal Engine), graphics APIs such as OpenGL, and Maya.
    </p>

    <div id="TitleLogo">
        <h2>Rochester Institute of Technology</h2>
        <img src="${BASE_URL}RIT_logo.png" alt="RIT Logo" id="ResizeableImage"/>
    </div>
    <small>2020 - 2023</small>
    <p id="ExperienceParagraph">Majored in Game Design and Development and completed 2 years of coursework.
    Learned C/C++, C#, Javascript, HTML, CSS, and other programming languages. While I enjoyed my time at 
    RIT, it was unfortunately cut short due to unforeseen circumstances.
    </p>
    `
    return "test";
}