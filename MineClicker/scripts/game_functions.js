"use strict";


function GetUrlForStyle(path, image_name)
{
    return "url('" + path + image_name + "')";
}

function StartWorld(world, current_wall = [])
{
    player.current_world = world;

    background.style.backgroundImage = GetUrlForStyle("backgrounds/", world.background);
    if (current_wall.length == 0)
    {
        GenerateBlocks(world);
    }
    else
    {
        for (let i = 0; i < cubes.length; i++)
        {
            cubes[i].SetBlock(current_wall[i], player.multiplier);
        }
    }
}

function GenerateBlocks(world)
{
    for(let i = 0; i < cubes.length; i++)
    {
        cubes[i].SetBlock(world.blocks[Math.floor(Math.random() * world.blocks.length)], player.multiplier);
    }
}

function GetCubes(arrayHtmlElements)
{
    let array = [];
    for (let i = 0; i < arrayHtmlElements.length; i++)
    {
        array.push(new Cube(arrayHtmlElements[i]));
        array[i].cube.onclick = function() { array[i].Click() };
    }
    return array;
}

function OpenCloseTools()
{
    if(tools_div.style.right == "0%")
    { 
        tools_div.style.right = "-42.5vh";
        tools_button.innerHTML = "<";
    }
    else
    {
        tools_div.style.right = "0%";
        tools_button.innerHTML = ">";
    }
}   
function SetOpenCloseTools(flag)
{
    if(flag)
    { 
        tools_div.style.right = "0%";
        tools_button.innerHTML = ">";
    }
    else
    {
        tools_div.style.right = "-42.5vh";
        tools_button.innerHTML = "<";
    }
}


function SetImage(tool)
{
    let level = tool.image_level;
    let template_tool = tools[tool.tool_id];

    if (level >= tool.image_names.length)
    {
        level = tool.image_names.length - 1;
    }
    tool.htmlElement.GetElementsByClassName("toolimage").style.backgroundImage = GetUrlForStyle("textures/tools", template_tool.image_names[level]);
}


function Select(tool)
{
    let SelectedTool = document.getElementById("selectedtool");

    if (SelectedTool !=  null)
    {
        SelectedTool.style.borderStyle = "none";
        SelectedTool.id = "";
    }
    
    SelectedTool = tool.htmlElement.getElementsByClassName("toolimage")[0];

    SelectedTool.style.borderStyle = "solid";
    SelectedTool.id = "selectedtool";

    document.body.style.cursor = GetUrlForStyle("images/", tools[tool.tool_id].curcor_icon) + ", auto"

    player.currentTool = tool;
}

function Update()
{
    player.tools.forEach(tool =>
    {
        let level = tool.image_level;
        
        if (level > tools[tool.tool_id].image_names.length - 1)
        {
            level = tools[tool.tool_id].image_names.length - 1;
        }
        tool.htmlElement.getElementsByClassName("toolimage")[0].style.backgroundImage = 
            tools[tool.tool_id].image_names[level];
        
        let spans = tool.htmlElement.getElementsByTagName("span");
        for(let i = 0; i < spans.length; i++)
        {
            let cost = spans[i].getElementsByClassName("cost")[0];
            let value = spans[i].getElementsByClassName("value")[0];
            switch (spans[i].className)
            {
                case "multiplier":
                    if (tool.multiplier.cost > player.emeralds) cost.style.color = "#622";
                    else cost.style.color = "#262";
                    cost.innerHTML = tool.multiplier.cost;
                    value.innerHTML = tool.multiplier.value;
                    break;
                case "additionally":
                    if (tool.additionally.cost > player.emeralds) cost.style.color = "#622";
                    else cost.style.color = "#262";
                    cost.innerHTML = tool.additionally.cost;
                    value.innerHTML = tool.additionally.value;
                    break;
                case "cooldown":
                    if (tool.cooldown.cost > player.emeralds) cost.style.color = "#622";
                    else cost.style.color = "#262";
                    cost.innerHTML = tool.cooldown.cost;
                    value.innerHTML = tool.cooldown.value;
                    break;
                default:
                    cost.innerHTML = "unknown";
            }
        }
    });

    let prefix = Math.floor(Math.log10(player.emeralds))
    let prefix_id = Math.floor(prefix / 3);
    if (prefix_id + 1 > prefixes.length) prefix_id = prefixes.length - 1;
    emeraldstext.innerHTML = (player.emeralds / Math.pow(10, prefix)).toFixed(1) + " " + prefixes[prefix_id];


    let flag = true;
    cubes.forEach(cube => {
        if (cube.strength > 0) flag = false;
    });

    if (flag)
    {
        GenerateBlocks(player.current_world);
        player.count_walls++;

        if (player.count_walls >= player.current_world.count_walls)
        {
            nextlevelbutton.style.display = "block";
        }
    }
    
    player.inventory.SetSlotDisplay();
}

function SellAll()
{
    player.inventory.slots.forEach(slot => {
        if (slot.id > -1) 
        {
            player.emeralds += slot.count * blocks[slot.id].base_cost * player.multiplier;
            slot.Clear();
        }
        player.inventory.SetSlotDisplay(slot);
    });
    Update();
}

function NextLevel()
{
    if (player.count_walls < player.current_world.count_walls) return;

    player.count_walls = 0;
    player.multiplier *= 2;

    let world_level = player.current_world.level;
    world_level++;
    
    let next_worlds = []
    worlds.forEach(world => {
        if (world.level == world_level)
        {
            next_worlds.push(world);
        }
    });
    
    if (next_worlds.length == 0)
    {
        world_level = 0;
        next_worlds = [];
        worlds.forEach(world => {
            if (world.level == world_level)
            {
                next_worlds.push(world);
            }
        });
    }
    
    StartWorld(next_worlds[Math.floor(Math.random() * next_worlds.length)]);
    nextlevelbutton.style.display = "none";
}

function Auto()
{
    player.auto = !player.auto;
    
    if (player.auto)
    {
        autobutton.style.backgroundColor = "greenyellow";
    }
    else
    {
        autobutton.style.backgroundColor = "#d55";
    }
}

function keyPress(event)
{
    let code = event.code;
    
    switch (code)
    {
        case "Digit1":
            Select(player.tools[0]);
            break;
        case "Digit2":
            Select(player.tools[1]);
            break;
        case "Digit3":
            Select(player.tools[2]);
            break;
        case "Digit4":
            Select(player.tools[3]);
            break;
        case "Escape":
            VisibleMenu();
            break;
    }
}

function VisibleMenuSet(flag)
{
    if (flag)
    {
        menu.style.display = "flex";
    }
    else
    {
        menu.style.display = "none";
    }
}
function VisibleMenu()
{
    if (player == undefined) return;
    
    if (menu.style.display == "flex")
    {
        menu.style.display = "none";
    }
    else
    {
        menu.style.display = "flex";
    }
}


function NewGame()
{
    let player = new Player(new Inventory(document.getElementById("inventory").children));
    player.tools = [
        //      (tool_id, multiplier, additionally, cooldown, image_level, htmlElement)
        new Tool("pickaxe", new Parameter(1, 75, 2, 2), new Parameter(1, 75, 2, 2), new Parameter(4, 75, 0.5, 2), 0, tool_blocks[0]),
        new Tool("axe", new Parameter(1, 75, 2, 2), new Parameter(1, 75, 2, 2), new Parameter(4, 75, 0.5, 2), 0, tool_blocks[1]),
        new Tool("shovel", new Parameter(1, 75, 2, 2), new Parameter(1, 75, 2, 2), new Parameter(4, 75, 0.5, 2), 0, tool_blocks[2]),
        new Tool("scissors", new Parameter(1, 75, 2, 2), new Parameter(1, 75, 2, 2), new Parameter(4, 75, 0.5, 2), 0, tool_blocks[3])
    ];
    player.current_world = worlds[0];
    
    return player;
}
function ContinueGame()
{
    let player = ParsePlayer(JSON.parse(localStorage.getItem("player")));

    let wall = JSON.parse(localStorage.getItem("wall"));

    return [player, wall];
}
function SaveGame()
{
    if (player == null) return;

    localStorage.setItem("player", JSON.stringify(player));

    let wall = [];
    cubes.forEach(cube => {
        wall.push(cube.block_id);
    });
    localStorage.setItem("wall", JSON.stringify(wall));
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}