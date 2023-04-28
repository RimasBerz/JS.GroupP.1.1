"use strict";


function GetUrlForStyle(path, image_name)
{
    return "url('" + path + image_name + "')";
}

function StartWorld(world, current_wall = [])
{
    background.style.backgroundImage = GetUrlForStyle("backgrounds/", world.background);
    if (current_wall.length === 0)
    {
        GenerateBlocks(world);
    }
    else
    {
        current_wall.forEach(element =>
        {
            SetCube(cubes[i], blocks[element]);
        });
    }
}

function GenerateBlocks(world)
{
    for(let i = 0; i < cubes.length; i++)
    {
        cubes[i].SetBlock(Math.floor(Math.random() * world.blocks.length), strength_multiplier);
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
        tools_div.style.right = "-32.4%";
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
        tools_div.style.right = "-32.4%";
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
    player.currentTool = tool;
}

function UploadToolsImage()
{
    player.tools.forEach(tool =>
    {
        tool.htmlElement.getElementsByClassName("toolimage")[0].style.backgroundImage = 
            tools[tool.tool_id].image_names[tool.image_level]
    });
}
