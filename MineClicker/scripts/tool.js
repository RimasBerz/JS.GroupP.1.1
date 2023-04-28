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

        this.htmlElement.getElementsByClassName("toolimage")[0].onclick = () => { Select(this); };

        let upgrades = this.htmlElement.getElementsByTagName("span");
        for (let i = 0; i < upgrades.length; i++)
        {
            upgrades[i].onclick = ()=>{ this.Upgrade(upgrades[i].className); };
        }
    }

    Upgrade(param)
    {
        console.log(this.tool_id + " " + param);
        
    }
}

