import { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css'

function App() {

  const [tarefas, setTarefas] = useState([]);

  const [input, setInput] = useState('');

  useEffect(() => {
  
    const tarefasStorange = localStorage.getItem('to-do');

    if(tarefasStorange){
      setTarefas(JSON.parse(tarefasStorange));
    }

  }, []);

  useEffect(() => {
  
    localStorage.setItem('to-do', JSON.stringify(tarefas));

  }, [tarefas]);


  const handleAdd = useCallback(() => {

    const newItem = input;

    tarefas.push(newItem);

    setTarefas([...tarefas]);
    
    setInput('');

  }, [tarefas, input]);

  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

  return (
    <div>
      <h1>Hooks</h1>
      <ul>
        {tarefas.map( tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      <br/>
      <strong>Você tem {totalTarefas} tarefas!</strong><br/>
      <input type='text' value={input} onChange={e => setInput(e.target.value)}/>
      <button type='button' onClick={handleAdd}>Adicionar</button>
    </div>
  )
}

export default App
