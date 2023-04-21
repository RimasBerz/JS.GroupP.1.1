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
        SetCube(cubes[i], Math.floor(Math.random() * world.blocks.length))
    }
}

function SetCube(cube, block_id)
{
    for (const child of cube.children) 
    {
        switch (child.className)
        {
            case 'top':
                child.style.backgroundImage = GetUrlForStyle("textures/", blocks[block_id].image_name_top);
                break;
            case 'botton':
                child.style.backgroundImage = GetUrlForStyle("textures/", blocks[block_id].image_name_bottom);
                break;
            default:
                child.style.backgroundImage = GetUrlForStyle("textures/", blocks[block_id].image_name_side);
        }
    }
}

