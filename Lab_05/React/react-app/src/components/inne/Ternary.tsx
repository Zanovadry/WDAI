function Ternary() {
    let a = true;
    let b = false;
    return (
        <>
            {a ? <div>a jest prawdziwe</div> : <div>a jest fałszywe</div>}
            {b ? <div>b jest prawdziwe</div> : <div>b jest fałszywe</div>}
        </>
    );
}
export default Ternary;
