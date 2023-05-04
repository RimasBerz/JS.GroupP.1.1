"use strict";


// Slot - ячейка для предметов
// При id = 0, картинки предмета в слоте - нету
// При count = 0, надпись количества прелметов - пустая
class Slot
{
    constructor(html)
    {
        this.id = -1; // id - блока хранящегося в слоте
        this.count = 0; // count - их количество в соте
        this.html = html;
    }

    Clear()
    {
        this.id = -1;
        this.count = 0;
    }
}

// Инвентарь - массив из объектов типа Слот -> (id, count)
class Inventory
{
    constructor(slots)
    {
        this.count = slots.length; // количество слотов
        
        this.slots = []; // Массив слотов
        for (let i = 0; i < this.count; i++)
        {
            this.slots.push(new Slot(slots[i]));
        }
    }
    
    // Добавить предмет в инвентарь
    Add(block_id)
    {

        for (let i = 0; i < this.slots.length; i++)
        {
            let slot = this.slots[i];
            if (slot.id == block_id && slot.count < 64)
            {
                slot.count++;
                this.SetSlotDisplay();
                return;
            }
        }
        
        
        for (let i = 0; i < this.slots.length; i++)
        {
            let slot = this.slots[i];
            if (slot.id == -1)
            {
                slot.id = block_id;
                slot.count = 1;
                this.SetSlotDisplay();
                return;
            }
        }
    }

    SetSlotDisplay()
    {
        this.slots.forEach(slot => {
            if (slot.id == -1)
            {
                slot.html.style.backgroundImage = "none";
                slot.html.innerHTML = "";
            }
            else
            {
                slot.html.style.backgroundImage = GetUrlForStyle("icons/", blocks[slot.id].icon_name);
                slot.html.innerHTML = slot.count;
            }
        });
    }
}

function ParseInventory(inventory)
{
    let i = new Inventory(document.getElementById("inventory").children);
    
    for (let j = 0; j < i.count; j++)
    {
        i.slots[j].id = inventory.slots[j].id;
        i.slots[j].count = inventory.slots[j].count;
    }
    return i;
}

