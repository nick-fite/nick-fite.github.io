const { BASE_URL } = import.meta.env;

export function AboutMeClick(infoDiv : any)
{
    infoDiv!.innerHTML = `
    <p id="ReadableSize">I'm a programmer and a game designer who's looking for the next step in his career</p>
    `
    return "test";
}

export function SkillsClick(infoDiv : any)
{
    infoDiv!.innerHTML = `
    <h2>Languges</h2>
    <div class="LanguageIcons">
        
        
        <img src = "${BASE_URL}C_logo.png" alt ="C Logo" id="ResizeableImage">
        <img src = "${BASE_URL}C++_logo.png" alt ="C++ Logo" id="ResizeableImage">
        
        <img src = "${BASE_URL}C-Sharp_logo.png" alt ="C# Logo" id="ResizeableImage">
        <img src = "${BASE_URL}Java_Logo.png" alt ="Java Logo" id="ResizeableImage">
        <img src = "${BASE_URL}Python_logo.png" alt ="Python Logo" id="ResizeableImage">

        <img src = "${BASE_URL}JavaScript_logo.png" alt ="Javascript Logo" id="ResizeableImage">
        <img src = "${BASE_URL}Typescript_logo.png" alt ="Typescript Logo" id="ResizeableImage">
        <img src = "${BASE_URL}html5_logo.png" alt ="HTML5 Logo" id="ResizeableImage">
        <img src = "${BASE_URL}CSS_logo.png" alt ="CSS Logo" id="ResizeableImage">
    </div>
    <p id="ReadableSize">i can use these languages</p>
    <h2>Skills</h2>
    <p id="ReadableSize">i have these skills</p>
    <h2>Tools/Plugins</h2>
    <p id="ReadableSize">i can use these tools</p>
    `
    return "test";
}

export function ExperienceClick(infoDiv : any)
{
    infoDiv!.innerHTML = `
    <p id="ReadableSize">Experience Test</p>
    `
    return "test";
}