"use strict";


class TemplateTool
{
    constructor(name, image_names, gif_name)
    {
        this.name = name;

        this.image_names = image_names.flatMap(element => GetUrlForStyle("textures/tools/", element));

        this.gif_name = gif_name;
    }
}

class Parameter
{
    constructor(start_value, start_cost, k_value, k_cost)
    {
        this.value = start_value;
        this.cost = start_cost;
        this.k_value = k_value;
        this.k_cost = k_cost;

        this.upgrade;
    }

    Upgrade()
    {
        player.emeralds -= this.cost;

        this.value *= this.k_value;
        this.cost *= this.k_cost;
        
        if (this.upgrade != undefined)
        {
            this.upgrade(); 
        }
    }
}

function ParseParameter(parameter)
{
    let p = new Parameter(parameter.start_value, parameter.start_cost, parameter.k_value, parameter.k_cost);
    p.value = parameter.value;
    p.cost = parameter.cost;
    return p;
}





class Tool
{
    constructor(tool_id, multiplier, additionally, cooldown, image_level, htmlElement)
    {
        this.tool_id = tool_id;
        this.multiplier = multiplier;
        this.additionally = additionally;
        this.cooldown = cooldown;
        this.image_level = image_level;
        this.htmlElement = htmlElement;

        this.update_timer();

        this.htmlElement.getElementsByClassName("toolimage")[0].onclick = () => { Select(this); };

        let upgrades = this.htmlElement.getElementsByTagName("span");
        for (let i = 0; i < upgrades.length; i++)
        {
            upgrades[i].onclick = ()=>{ this.Upgrade(upgrades[i].className); };
        }
        this.multiplier.upgrade = () => { this.image_level++; };
    }

    Upgrade(param)
    {
        let parameter;
        switch (param)
        {
            case "multiplier":
                parameter = this.multiplier;
                break;
            case "additionally":
                parameter = this.additionally;
                break;
            case "cooldown":
                parameter = this.cooldown;
                clearTimeout(this.timerId);
                this.update_timer();
                break;
        }

        if (player.emeralds < parameter.cost) return;
        parameter.Upgrade();
        Update();
    }

    update_timer()
    {
        this.timer_id = setInterval(this.auto, this.cooldown.value * 1000, this);
    }

    auto(tool)
    {
        if (!player.auto) return;

        let cube;
        for(let i = 0; i < cubes.length; i++)
        {
            cube = cubes[i];
            if (cube.strength > 0)
            {
                if (blocks[cube.block_id].block_type == tool.tool_id)
                {
                    cube.Damage(tool.additionally.value);
                    return;
                }
            }   
        }
    }
}

function ParseTool(tool, tool_block)
{
    let t = new Tool(tool.tool_id, 
        ParseParameter(tool.multiplier), 
        ParseParameter(tool.additionally), 
        ParseParameter(tool.cooldown), 
        tool.image_level, 
        tool_block);
    return t;
}


