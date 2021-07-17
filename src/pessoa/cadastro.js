import { Component } from "react";

class Cadastro extends Component{
    constructor(props){
        super(props);
        let id = props.match.params.id??0;
        this.state = {
            nome:'',
            idade:0,
            id:id
        }
        if(id !== 0){
            this.laodPerson()
        }
    }
    laodPerson = async () =>{
        let person = await fetch(`/pessoa/${this.state.id}`).then(resp => resp.json());
        this.setState(
            {
                ['nome']:person.nome,
                ['idade']:person.idade
            }
        )
    }    
    render(){
        const handleInputChanged = (e)=>{
            const {name,value} = e.target;
            this.setState({[name]:value}) 
        }
        const savePerson = () =>{
            if(this.state.id !== 0){
                updatePerson()
            }else{
            let pessoa = {
                nome:this.state.nome,
                idade:parseInt(this.state.idade)
            }
            fetch('/pessoa',{
                method:'POST',
                body:JSON.stringify(pessoa),
                headers:{'Content-Type':'application/json'}
            })
            .then(()=>{
                this.setState({
                                ['nome']:'',
                                ['idade']:0
                            })
            })
        }
    }
        const updatePerson = ()=>{
            let person = {
                nome:this.state.nome,
                idade:this.state.idade
            }
            fetch(`/pessoa/${this.state.id}`,{
                method:'PUT',
                body:JSON.stringify(person),
                headers:{'Content-Type':'application/json'}
            }).then(()=>{
                window.location = '/consulta'
            })
        }
        return(
            <div className='col-md-5'>
                <label>Nome</label>
                <input name='nome' className='form-control' value={this.state.nome} onChange={handleInputChanged}/>
                <label>Idade</label>
                <input name='idade' className='form-control' type='number' value={this.state.idade} onChange={handleInputChanged}/>
                <button onClick={()=> savePerson()} className='btn btn-success btn-sm mt-5'>Salvar</button>
            </div>
        )
    }
}
export default Cadastro;