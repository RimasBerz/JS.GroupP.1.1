"use strict";

// Компоненты
const background = document.body;
const cubes = document.getElementsByClassName("cube");
const slots = document.getElementById("inventory").children;


// Типы инструментов / блоков(инструменты которыми они ломаються) :
//      pickaxe - кирка
//      axe - топор
//      shovel - кирка
//      scissors - ножницы

// Список всех Блоков в игре
const blocks = 
{
    0 : new Block("Dirt", 1, "shovel", "dirt.png", "dirt.png", "dirt.png"),
    1 : new Block("Grass", 1, "shovel", "grass_block_side.png", "grass_block_top.png", "dirt.png"),
    2 : new Block("Oak log", 1, "axe", "oak_log.png", "oak_log_top.png", "oak_log_top.png")
}

// Список Миров
const world =
{
    0 : new World(0, [0, 1, 2], 5, "Defoult_world.jpg")
}


// Начало игры
let player = new Player();
StartWorld(world[0]);

