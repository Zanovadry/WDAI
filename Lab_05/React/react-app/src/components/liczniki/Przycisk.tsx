interface PrzyciskProps {
    incrementFunction: () => void;
}

function Przycisk(prop: PrzyciskProps) {
    return (
        <button type="button" onClick={prop.incrementFunction}>
            Dodaj
        </button>
    );
}

export default Przycisk;
