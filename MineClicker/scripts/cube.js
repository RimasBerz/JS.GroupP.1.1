
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
        if (block_id == null)
        {
            this.cube.style.display = "none";
            this.strength = 0;
            return;
        }

        this.block_id = block_id;
        let block = blocks[block_id]
        this.full_strength = block.strength * multiplier;
        this.strength = this.full_strength;

        this.cube.getElementsByClassName("front")[0].getElementsByClassName("break")[0].innerHTML = this.strength;
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
            this.Damage(tool.multiplier.value);
        }
    }

    Damage(damage)
    {
        let h = new Audio("./sounds/hit.mp3");
        h.volume = 0.5;
        h.play();

        this.strength -= damage;
        let state = Math.round((1 - this.strength / this.full_strength) * (destroy_images.length + 1))-1;
        
        this.cube.getElementsByClassName("front")[0].getElementsByClassName("break")[0].innerHTML = this.strength;

        if(this.strength <= 0) 
        {
            this.cube.style.display = "none";
            player.inventory.Add(this.block_id);
            this.block_id = null;

            for (const child of this.cube.children) 
            {
                child.children[0].style.backgroundImage = "none";
            }

            Update();
        }
        
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
    }
}

