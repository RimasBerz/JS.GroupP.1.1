"use strict";


// Компоненты
const background = document.body;
const cubes = GetCubes(document.getElementsByClassName("cube"));
const slots = document.getElementById("inventory").children;

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
const tools_div = document.getElementById("tools");
const tool_blocks = tools_div.getElementsByClassName("tool");

tools_button.onclick = function() { OpenCloseTools(); };

SetOpenCloseTools(true);

// Типы инструментов / блоков(инструменты которыми они ломаються) :
//      pickaxe - кирка
//      axe - топор
//      shovel - лопата
//      scissors - ножницы
const tools =
{
    //          new TemplateTool(name, tool_id, image_names, gif_name)
    "pickaxe" : new TemplateTool("Pickaxe",
        ["wood_pickaxe.png", "stone_pickaxe.png", "iron_pickaxe.png", "gold_pickaxe.png", "diamond_pickaxe.png"], "pickaxe.gif"),
    
    "axe" : new TemplateTool("Axe",
        ["wood_axe.png", "stone_axe.png", "iron_axe.png", "gold_axe.png", "diamond_axe.png"], "axe.gif"),
    
    "shovel" : new TemplateTool("Shovel",
        ["wood_shovel.png", "stone_shovel.png", "iron_shovel.png", "gold_shovel.png", "diamond_shovel.png"], "shovel.gif"),
    
    "scissors" : new TemplateTool("Scissors",
        ["scissors.png"], "scissors.gif")
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
    5 : new Block("Cobblestone ", 2, "pickaxe", 17, "cobblestone.png", "cobblestone.png", "cobblestone.png", "cobblestone.png")
}


// Список Миров
const world =
{
    //  new World(difficulty, blocks_in_this_world, count_walls, background);
    0 : new World(0, [0, 1, 2, 3, 4, 5], 5, "Defoult_world.jpg")
}


// Начало игры
let strength_multiplier = 1;

let player = new Player();
player.tools = [
    //      (tool_id, multiplier, additionally, cooldown, image_level, htmlElement)
    new Tool("pickaxe", 1, 1, 0, 0, tool_blocks[0]),
    new Tool("axe", 1, 1, 0, 0, tool_blocks[1]),
    new Tool("shovel", 1, 1, 0, 0, tool_blocks[2]),
    new Tool("scissors", 1, 1, 0, 0, tool_blocks[3])
];
UploadToolsImage();
Select(player.tools[0]);

StartWorld(world[0]);

