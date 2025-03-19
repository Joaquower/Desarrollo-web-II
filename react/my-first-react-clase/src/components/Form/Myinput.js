export default function MyInput(params) {
    const { type, placeholder, valor, onChange, name } = params;
    return (
        <input
            className="myinput"
            name= {name}
            type={type}
            placeholder={placeholder}
            valor={valor}
            onChange={onChange}

        />
    );
}