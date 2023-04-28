"use strict";


// Slot - ячейка для предметов
// При id = 0, картинки предмета в слоте - нету
// При count = 0, надпись количества прелметов - пустая
class Slot
{
    constructor()
    {
        this.id = -1; // id - блока хранящегося в слоте
        this.count = 0; // count - их количество в соте
    }
}

// Инвентарь - массив из объектов типа Слот -> (id, count)
class Inventory
{
    constructor()
    {
        this.count = 9; // количество слотов
        
        this.slots = []; // Массив слотов
        for (let i = 0; i < this.count; i++) 
        {
            this.slots.push(new Slot());
        }
    }
    
    // Добавить предмет в инвентарь
    Add(block_id)
    {
        for(let i = 0; i < this.slots.length; i++)
        {
            if (this.slots[i].id == block_id && this.slots[i].count < 64)
            {
                this.slots[i].count++;
                this.SetSlotDisplay(i);
                return;
            }
        }

        for(let i = 0; i < this.slots.length; i++)
        {
            if (this.slots[i].id == -1)
            {
                this.slots[i].id = block_id;
                this.slots[i].count = 1;
                this.SetSlotDisplay(i);
                return;
            }
        }
    }

    SetSlotDisplay(slot_id)
    {
        slots[slot_id].style.backgroundImage = GetUrlForStyle("icons/", blocks[this.slots[slot_id].id].icon_name);
        slots[slot_id].innerHTML = this.slots[slot_id].count;
    }

    // Продать все предметы в инвентаре
    SellAll()
    {

        return 0;
    }
}
