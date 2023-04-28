"use strict";

// Block - объект слока
// name - название
// cost - стоимость
// block_type - тип блока

class Block
{
    constructor(name, base_cost, block_type, strength, image_name_side, image_name_top, image_name_bottom, icon_name)
    {
        this.name = name;
        this.base_cost = base_cost;

        this.block_type = block_type;
        this.strength = strength;

        this.image_name_side = image_name_side;
        this.image_name_top = image_name_top;
        this.image_name_bottom = image_name_bottom;

        this.icon_name = icon_name;
    }
}