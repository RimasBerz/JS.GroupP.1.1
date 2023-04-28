"use strict";


class Player
{
    constructor()
    {
        // Inventory
        this.inventory = new Inventory();

        this.tools = [];
        this.currentTool = "pickaxe";
    }
}