import { useState } from "react"

function Login(props) {
    const [state, setState] = useState({
        password: '',
        email: ''
    })

    function handleChange(e) {
        const { name, value } = e.target
        setState((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.handleLogin(state)
    }

    return (
        <main>
            <section className="auth">
                <h2 className="auth__title">Вход</h2>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <fieldset className="auth__fieldset">
                        <label className="auth__label">
                            <input
                                value={state.email}
                                onChange={handleChange}
                                className="auth__input"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                            />
                        </label>
                        <label className="auth__label">
                            <input
                                value={state.password}
                                onChange={handleChange}
                                className="auth__input"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                            />
                        </label>
                    </fieldset>
                    <button className="auth__submit">Войти</button>
                </form>
            </section>
        </main>
    )
}
export default Login
