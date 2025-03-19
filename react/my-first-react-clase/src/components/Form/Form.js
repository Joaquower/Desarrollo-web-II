import MyInput from "./Myinput"
import "../../style/form.css"
import { useContext } from "react"
import { UserContext, UserContextProvider } from "../../context/user-context"


export default function Form() {
    return (
        <UserContextProvider>
            <FormContent />
        </UserContextProvider>
    )
}

function FormContent() {
    const { user, setUser } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }))
    }

    const inputName = {
        type: 'text',
        placeholder: 'Name',
        value: user.name,
        onChange: handleChange,
        name: 'name'
    }
    const inputEmail = {
        type: 'email',
        placeholder: 'Email',
        value: user.email,
        onChange: handleChange,
        name: 'email'
    }
    const inputAge = {
        type: 'number',
        placeholder: 'Age',
        value: user.age,
        onChange: handleChange,
        name: 'age'
    }

    return (
        <form class="myForm">
            <div>
                <MyInput {...inputName} />
            </div>
            <div>
                <MyInput {...inputEmail} />
            </div>
            <div>
                <MyInput {...inputAge} />
            </div>
        </form>
    )
}
