"use strict";

// World - мир 
class World
{
    constructor(difficulty, blocks_in_this_world, count_walls, background)
    {
        this.difficulty = difficulty; // сложность - очерёдность мира
        this.blocks = blocks_in_this_world; // массив блоков в этом мире
        this.count_walls = count_walls; // Количкство стен которые нужно сломать
        this.background = background; // имя изображения
    }
}
