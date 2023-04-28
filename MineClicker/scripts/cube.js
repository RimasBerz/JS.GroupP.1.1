
class Cube
{
    constructor(cube)
    {
        this.cube = cube;
        
        this.block_id;
        
        this.strength;
        this.full_strength;
    }

    SetBlock(block_id, multiplier)
    {
        this.block_id = block_id;
        let block = blocks[block_id]

        this.full_strength = block.strength * multiplier;
        this.strength = this.full_strength;
        
        for (const child of this.cube.children) 
        {
            switch (child.className)
            {
                case 'top':
                    child.style.backgroundImage = GetUrlForStyle("textures/", block.image_name_top);
                    break;
                case 'bottom':
                    child.style.backgroundImage = GetUrlForStyle("textures/", block.image_name_bottom);
                    break;
                default:
                    child.style.backgroundImage = GetUrlForStyle("textures/", block.image_name_side);
            }   
        }

        this.cube.style.display = "block";
    }

    Click()
    {
        let tool = player.currentTool;
        
        if (tool.tool_id == blocks[this.block_id].block_type)
        {
            this.strength -= tool.multiplier;
            let state = Math.round((1 - this.strength / this.full_strength) * (destroy_images.length + 1))-1;


            if (state == -1)
            {
                for (const child of this.cube.children) 
                {
                    child.children[0].style.backgroundImage = "none";
                }
            }
            else
            {
                for (const child of this.cube.children) 
                {
                    child.children[0].style.backgroundImage = destroy_images[state];
                }
            }

            if(this.strength <= 0) 
            {
                this.cube.style.display = "none";
                player.inventory.Add(this.block_id);
            }
        }
    }

}

