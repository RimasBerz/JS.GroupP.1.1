"use strict";


class Player
{
    constructor(inventory)
    {
        // Inventory
        this.inventory = inventory;

        this.tools = [];
        this.currentTool;
        this.multiplier = 1;

        this.current_world;
        this.count_walls = 0;

        this.emeralds = 200;

        this.auto = false;
    }
}

function ParsePlayer(player)
{
    let p = new Player(ParseInventory(player.inventory));
    p.multiplier = player.multiplier;
    p.current_world = player.current_world;
    p.count_walls = player.count_walls;
    p.emeralds = player.emeralds;
    p.auto = player.auto;

    for (let i = 0; i < player.tools.length; i++)
    {
        p.tools.push(ParseTool(player.tools[i], tool_blocks[i]));
    }

    return p;
}