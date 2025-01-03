import Produkt from "./Produkt";

function NowyKoszyk() {
    const productsList: string[] = [
        "Jabłko",
        "Pomarańcza",
        "Cytryna",
        "Banan",
        "Czosnek",
    ];

    return (
        <div>
            {productsList.map((item) => (
                <Produkt key={item} name={item}></Produkt>
            ))}
        </div>
    );
}

export default NowyKoszyk;
