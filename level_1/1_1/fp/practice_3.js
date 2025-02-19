"use strict";

function getReplaceFunction(CSV) {
    let ratingCities = CSV.split("\n")
        .map(row => {
            row = row.split(",");
            return {x: +row[0], y: +row[1], name: row[2], population: +row[3]};
        })
        .filter(city =>
            !isNaN(city.x) && !isNaN(city.y) &&
            !isNaN(city.population) && /^[a-zа-я][\sa-zа-я]*/i.test(city.name))
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .reduce((a, b) => {
            a[b.name] = {
                population: b.population,
                rating: Object.keys(a).length + 1
            };
            return a;
        }, {});

    return (text) => {
        Object.keys(ratingCities).forEach(city => {
            let pattern = `${city}(${ratingCities[city].rating}th place in the TOP-10 ` +
                `largest cities in Ukraine, population ${ratingCities[city].population} people)`;

            text = text.replace(RegExp(city, "gi"), pattern);
        });

        return text;
    };
}


let f1 = getReplaceFunction("44.38,34.33,Алушта,31440,\n" +
    "49.46,30.17,Біла Церква,200131,\n" +
    "49.54,28.49,Бердичів,87575,#некомент\n" +
    "\n" +
    "#\n" +
    "46.49,36.58,#Бердянськ,121692,\n" +
    "49.15,28.41,Вінниця,356665,\n" +
    "#45.40,34.29,Джанкой,43343,\n" +
    "\n" +
    "# в цьому файлі три рядки-коментарі :)");

console.log(f1("Біла Церква їм сподобалась, але Вінниця - це найулюбленіше їх місто\n\n"));


let f2 = getReplaceFunction("44.38,34.33,Київ,2884000000,\n49.46,30.17,Кропивницький,226491," +
    "\n54.13,43.90,Миколаїв,486267,\n49.54,28.49,Херсон,289697,\n21.34,54.86,Черкаси,279074," +
    "\n12.54,31.53,Запоріжжя,746749,\n54.12,75.32,Вінниця,370834,\n79.14,62.23,Кривий Ріг,646748," +
    "\n75.12,56.87,Житомир,261624,\n65.12,57.23,Ужгород,115542,\n54.76,56.23,Мукачево,85903");

let text = "Київ, безсумнівно, є найбільшим і найвідомішим містом України. " +
    "У ньому зібрана вся історія країни — від стародавніх часів до сучасності. " +
    "Водночас Кропивницький має свою унікальну атмосферу та багатий культурний спадок. " +
    "Миколаїв є важливою частиною є кораблебудування, а Херсон має тепле море і курорти. " +
    "Черкаси відомі своєю зеленою природою та історичними пам'ятками, " +
    "а Запоріжжя — це місто, де відчувається дух козацької слави.\n" +
    "Вінниця приваблює не тільки своїми фонтанами, а й чудовими парками, " +
    "а Кривий Ріг вражає своєю індустріальною величчю. " +
    "Житомир — це місто, де поєднуються стародавні традиції та сучасні технології. " +
    "Ужгород з його мальовничими вуличками та атмосферою Закарпаття дарує незабутні враження. " +
    "І, звичайно ж, Мукачево з його замками і природними красотами завжди залишається в пам'яті.";

console.log(f2(text));