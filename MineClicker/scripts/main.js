"use strict";


// Компоненты
const background = document.body;
const cubes = GetCubes(document.getElementsByClassName("cube"));

const destroy_images = [
    "destroy_stage_0.png",
    "destroy_stage_1.png",
    "destroy_stage_2.png",
    "destroy_stage_3.png",
    "destroy_stage_4.png",
    "destroy_stage_5.png",
    "destroy_stage_6.png",
    "destroy_stage_7.png",
    "destroy_stage_8.png",
    "destroy_stage_9.png"
].flatMap((element) => (GetUrlForStyle("images/destroy/", element)));

const tools_button = document.getElementById("openclose");
tools_button.onclick = function() { OpenCloseTools(); }; // --------------------------------------------------

const tools_div = document.getElementById("tools");
const tool_blocks = tools_div.getElementsByClassName("tool");

document.getElementById("sellbutton").onclick = SellAll;

const nextlevelbutton = document.getElementById("nextlevel");
nextlevelbutton.onclick = NextLevel;

const autobutton = document.getElementById("autobutton");
autobutton.onclick = Auto;

const emeraldstext = document.getElementById("emeralds");

document.addEventListener('keyup', keyPress, false);

const menu = document.getElementById("maindiv");
document.getElementById("menu").onclick = () => { VisibleMenu(); };

const cursor_tool = document.getElementById("cursor_tool");

const mousePosText = document.getElementById('mouse-pos');
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
});

manual.onclick = function () {
    window.open("./manual.html");
};



// Сокращение количества денег
const prefixes = 
[
    "",   // Единицы
    "K",  // Тысячи
    "M",  // Миллионы
    "B"   // Миллиарды
]



// Типы инструментов / блоков(инструменты которыми они ломаються) :
//      pickaxe - кирка
//      axe - топор
//      shovel - лопата
//      scissors - ножницы
const tools =
{
    //          new TemplateTool(name, tool_id, image_names, gif_name, curcor_icon)
    "pickaxe" : new TemplateTool("Pickaxe",
        ["wood_pickaxe.png", "stone_pickaxe.png", "iron_pickaxe.png", "gold_pickaxe.png", "diamond_pickaxe.png"], "pickaxe.gif", "pickaxe.png"),
    
    "axe" : new TemplateTool("Axe",
        ["wood_axe.png", "stone_axe.png", "iron_axe.png", "gold_axe.png", "diamond_axe.png"], "axe.gif", "axe.png"),
    
    "shovel" : new TemplateTool("Shovel",
        ["wood_shovel.png", "stone_shovel.png", "iron_shovel.png", "gold_shovel.png", "diamond_shovel.png"], "shovel.gif", "shovel.png"),
    
    "scissors" : new TemplateTool("Scissors",
        ["scissors.png"], "scissors.gif", "scissors.png")
};


// Список всех Блоков в игре
const blocks = 
{
    //  new Block(name, base_cost, block_type, image_name_side, image_name_top, image_name_bottom);
    0 : new Block("Dirt", 1, "shovel", 10, "dirt.png", "dirt.png", "dirt.png", "dirt.png"),
    1 : new Block("Grass", 1, "shovel", 10, "grass_block_side.png", "grass_block_top.png", "dirt.png", "grass.png"),
    2 : new Block("Oak log", 2, "axe", 13, "oak_log.png", "oak_log_top.png", "oak_log_top.png", "oak_log.png"),
    3 : new Block("Oak leaves", 1, "scissors", 8, "oak_leaves.png", "oak_leaves.png", "oak_leaves.png", "oak_leaves.png"),
    4 : new Block("Stone", 2, "pickaxe", 18, "stone.png", "stone.png", "stone.png", "stone.png"),
    5 : new Block("Cobblestone ", 2, "pickaxe", 17, "cobblestone.png", "cobblestone.png", "cobblestone.png", "cobblestone.png"),
    6 : new Block("Coal ore", 3, "pickaxe", 22, "coal_ore.png", "coal_ore.png", "coal_ore.png", "coal_ore.png"),
    7 : new Block("Iron ore", 4, "pickaxe", 24, "iron_ore.png", "iron_ore.png", "iron_ore.png", "iron_ore.png"),
    8 : new Block("Gold Ore", 5, "pickaxe", 26, "gold_ore.png", "gold_ore.png", "gold_ore.png", "gold_ore.png"),
    9 : new Block("Redstone Ore", 3, "pickaxe", 20, "redstone_ore.png", "redstone_ore.png", "redstone_ore.png", "redstone_ore.png"),
    10: new Block("Lapis Lazuli Ore", 3, "pickaxe", 20, "lapis_ore.png", "lapis_ore.png", "lapis_ore.png", "lapis_ore.png"),
    11: new Block("Diamond Ore", 6, "pickaxe", 25, "diamond_ore.png", "diamond_ore.png", "diamond_ore.png", "diamond_ore.png"),
    12: new Block("Obsidian", 7, "pickaxe", 32, "obsidian.png", "obsidian.png", "obsidian.png", "obsidian.png"),
    13: new Block("Netherrack", 3, "pickaxe", 17, "netherrack.png", "netherrack.png", "netherrack.png", "netherrack.png"),
    14: new Block("Soul Sand", 4, "shovel", 16, "soul_sand.png", "soul_sand.png", "soul_sand.png", "soul_sand.png"),
    15: new Block("Magma Block", 6, "pickaxe", 20, "magma.png", "magma.png", "magma.png", "magma.png"),
    16: new Block("Nether quartz ore", 8, "pickaxe", 18, "nether_quartz_ore.png", "nether_quartz_ore.png", "nether_quartz_ore.png", "nether_quartz_ore.png"),
    17: new Block("Nether bricks", 4, "pickaxe", 20, "nether_bricks.png", "nether_bricks.png", "nether_bricks.png", "nether_bricks.png")

};


// Список Миров
const worlds =
[
    //  new World(difficulty, blocks_in_this_world, count_walls, background);
    new World(0, [0, 1, 2, 3, 4, 5], 0, "Defoult_world.jpg"),
    new World(1, [0, 4, 5, 6, 7, 8, 9, 10, 11, 12], 1 , "Cave_world.jpeg"),
    new World(2, [13, 14, 15, 16, 17], 1, "nether_background.webp")
];


// Начало игры
let player;
newGameButton.onclick = () => { 
    if (localStorage.getItem("player") != null)
    {
        let sure = confirm("Вы уверены что хотите ПОТЕРЯТЬ весь прогресс?");
        
        if (sure) localStorage.clear();
        else return;
    }
    player = NewGame(); 
    Start(); 
};
continueButton.onclick = () => {  
    if (localStorage.getItem("player") != null) 
    { 
        let cont = ContinueGame(); 

        player = cont[0];
        Auto(); Auto();
        
        if (cont.length > 1) Start(cont[1]);
        else Start();
    } 
};
SaveProgressButton.onclick = () => { 
    SaveGame(); 
};
close.onclick = () => {
    VisibleMenu();
}
exportButton.onclick = () => {
    if (player == null) return;

    let wall = [];
    cubes.forEach(cube => {
        wall.push(cube.block_id);
    });
    let data = {
        "player" : player,
        "wall" : wall
    };

    download("data.json", JSON.stringify(data));
}
importButton.addEventListener('change', (event) => 
{
    const file = event.target.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        let data = JSON.parse(reader.result);
        console.log(data);

        player = ParsePlayer(data["player"]);
        Auto(); Auto();
        
        if (data["wall"].length > 1) Start(data["wall"]);
        else Start();
    };
});



function Start(wall = [])
{  
    if (wall.length > 0) StartWorld(player.current_world, wall);
    else StartWorld(player.current_world);
    
    

    Update();
    Select(player.tools[0]);  


    setInterval(SaveGame, 10000, this);


    // Save Progress Button
    SaveProgressButton.removeAttribute("disabled");
    SaveProgressButton.style.display = "block";
    exportButton.style.display = "block";

    // Continue Game Button
    continueButton.disabled = true;
    continueButton.style.display = "none";

    // Close Menu Button
    close.disabled = false;
    close.style.display = "block";

    audio.play();
    
    VisibleMenu(); 
}



