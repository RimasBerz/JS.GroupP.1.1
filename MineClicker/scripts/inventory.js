"use strict";


// Slot - ячейка для предметов
// При id = 0, картинки предмета в слоте - нету
// При count = 0, надпись количества прелметов - пустая
function Slot() 
{
    this.id = 0; // id - блока хранящегося в слоте
    this.count = 0; // count - их количество в соте
}

// Инвентарь - массив из объектов типа Слот -> (id, count)
function Inventory()
{
    this.count = 9; // количество слотов
    
    this.slots = []; // Массив слотов
    for (let i = 0; i < this.count; i++) 
    {
        this.slots.push(new Slot());
    }

    // Добавить предмет в инвентарь
    this.Add = (block_id, count) =>
    {
        
    }

    // Продать все предметы в инвентаре
    function SellAll()
    {
        return 0;
    }
}
