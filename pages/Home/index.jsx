import './style.css'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'



function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers(){
    await api.post('/usuarios',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }

  async function deleteUsers(id){
     await api.delete(`/usuarios/${id}`)

     getUsers()
    }


  useEffect( () => {
    getUsers()

  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
        <input placeholder='idade' name='idade' type='number' ref={inputAge}/>
        <input placeholder='E-mail' name='E-mail' type='email' ref={inputEmail}/>
        <button type='button' onClick={createUsers} >Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img className='lixeira' src='https://i.pinimg.com/564x/0b/80/db/0b80db6fc1d262c8007cb089068dcc4e.jpg' />
          </button>
        </div>
      ))}


    </div>


  )
}

export default Home
