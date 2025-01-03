import { useEffect, useState } from "react";

function Logowanie() {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("");
    const [loginValue, setLoginValue] = useState<string>("");

    useEffect(() => {
        if (
            passwordValue.length == 0 ||
            repeatPasswordValue.length == 0 ||
            loginValue.length == 0
        ) {
            setIsDisabled(true);
            return;
        }
        setIsDisabled(false);
    }, [passwordValue, repeatPasswordValue, loginValue]);

    function Login() {
        if (passwordValue != repeatPasswordValue) {
            alert("Hasła nie są zgodne");
            return;
        }
        alert("Zalogowano pomyślnie");
    }

    return (
        <div>
            <label htmlFor="login">Nazwa użytkownika</label>
            <input
                type="text"
                id="login"
                value={loginValue}
                onChange={(event) => {
                    setLoginValue(event.target.value);
                }}
            />
            <label htmlFor="password">Hasło</label>
            <input
                type="text"
                id="password"
                value={passwordValue}
                onChange={(event) => {
                    setPasswordValue(event.target.value);
                }}
            />
            <label htmlFor="repeatPassword">Powtórz hasło</label>
            <input
                type="text"
                id="repeatPassword"
                value={repeatPasswordValue}
                onChange={(event) => {
                    setRepeatPasswordValue(event.target.value);
                }}
            />
            <button onClick={Login} disabled={isDisabled}>
                Logowanie
            </button>
        </div>
    );
}

export default Logowanie;
