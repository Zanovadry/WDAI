interface ProduktProps {
    name: String;
}

function Produkt(props: ProduktProps) {
    return <p>{props.name}</p>;
}

export default Produkt;
